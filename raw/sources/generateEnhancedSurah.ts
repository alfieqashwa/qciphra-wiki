import { writeFileSync, readFileSync, existsSync, readdirSync } from "fs";
import { analyzeKalimahsEnhanced } from "./analyzeKalimahsEnhanced";
import { BISMILLAH_NORMALIZED, BISMILLAH_TEXT, stripDiacritics } from "./bismillah";
import { countHarfs } from "./countHarfs";
import type { EnhancedAyah, EnhancedSurah } from "./types";
import { WAQF_MARKS } from "./waqfMarks";

interface QuranApiAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface QuranApiSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: QuranApiAyah[];
}

interface QuranApiResponse {
  data: QuranApiSurah;
}

/**
 * 🚀 Main function to generate enhanced surah data (Fetch from API)
 */
export async function generateEnhancedSurah(
  surahNumber: number,
  globalKalimahOffset: number,
  globalHarfOffset: number
) {
  const edition = "quran-uthmani";
  
  // Fetch surah data from API with simple retry
  let response;
  let json: QuranApiResponse | undefined;
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${edition}`
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      json = (await response.json()) as QuranApiResponse;
      break; 
    } catch (e) {
      attempts++;
      console.warn(`⚠️ Attempt ${attempts}/${maxAttempts} failed for Surah ${surahNumber}:`, e);
      if (attempts >= maxAttempts) throw e;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempts)));
    }
  }
  
  if (!json) throw new Error("Failed to fetch JSON after retries");

  return processSurahData(json.data, globalKalimahOffset, globalHarfOffset);
}

/**
 * 🔄 Regenerate enhanced surah data from LOCAL file (No API)
 */
export async function regenerateLocalEnhancedSurah(
  surahNumber: number,
  surahNameEn: string,
  globalKalimahOffset: number,
  globalHarfOffset: number
) {
    let path = `./src/data/enhanced-${surahNameEn.toLowerCase()}.json`;
    
    if (!existsSync(path)) {
        // Try fuzzy match or scan by number (most robust)
        const dir = './src/data';
        try {
            const files = readdirSync(dir).filter(f => f.startsWith('enhanced-') && f.endsWith('.json'));
            
            // First try finding by number by reading content (expensive but reliable)
            let match = files.find(f => {
                try {
                    const content = readFileSync(`${dir}/${f}`, 'utf-8');
                    // Check number using regex to avoid parsing full JSON if possible, or just parse small chunk
                    // Fast check: look for "number": 100,
                    const numMatch = content.match(/"number":\s*(\d+)/);
                    if (numMatch && numMatch[1] && parseInt(numMatch[1]) === surahNumber) return true;
                } catch(e) { return false; }
                return false;
            });

            // Fallback to name fuzzy match if number match fails (unlikely)
            if (!match) {
                 // Normalize name: remove dashes, lowercase, vowels
                 const normalize = (s: string | undefined | null) => (s || "").toLowerCase().replace(/[^a-z]/g, '').replace(/[aeiou]/g, '');
                 const target = normalize(surahNameEn);
                 
                 match = files.find((f: string) => {
                     const clean = normalize(f.replace('enhanced-', '').replace('.json', ''));
                     return target.startsWith(clean) || clean.startsWith(target);
                });
            }
            
            if (match) {
                path = `${dir}/${match}`;
                console.log(`⚠️ Fuzzy/Number matched file: ${match} for ${surahNameEn}`);
            } else {
                throw new Error(`Local file not found for Surah ${surahNumber} (${surahNameEn})`);
            }
        } catch (e) {
            throw new Error(`Failed to search for local file: ${path}. Error: ${e}`);
        }
    }
    
    const localData = JSON.parse(readFileSync(path, 'utf-8')) as EnhancedSurah;
    
    // Map EnhancedSurah back to QuranApiSurah structure for processing
    const surah: QuranApiSurah = {
        number: localData.number,
        name: localData.nameAr,
        englishName: localData.nameEn,
        englishNameTranslation: localData.translation,
        revelationType: localData.revelation,
        numberOfAyahs: localData.numberOfAyahs,
        ayahs: (localData.ayahs || []).map(a => ({
            number: a.globalAyahNumber,
            text: a.text,
            numberInSurah: a.numberInSurah,
            juz: a.juz,
            manzil: a.manzil,
            page: a.page,
            ruku: a.ruku,
            hizbQuarter: a.hizbQuarter,
            sajda: a.sajda as boolean
        }))
    };
    
    console.log(`📂 Loaded local data for Surah ${surahNumber} (${surahNameEn})`);
    return processSurahData(surah, globalKalimahOffset, globalHarfOffset);
}

/**
 * ⚙️ Core processing logic
 */
function processSurahData(
    surah: QuranApiSurah, 
    globalKalimahOffset: number, 
    globalHarfOffset: number
): EnhancedSurah {
    
    if (!surah?.ayahs?.length) {
      throw new Error("No ayahs found");
    }

    // Initialize result structure
    const result: EnhancedSurah = {
      number: surah.number,
      nameAr: surah.name,
      nameEn: surah.englishName,
      translation: surah.englishNameTranslation,
      revelation: surah.revelationType,
      numberOfAyahs: surah.numberOfAyahs,
      totalKalimahs: 0,
      totalHarfs: 0,
      totalHisab: 0,
      ayahs: [],
    };

    // Helper to remove BOM and Waqf
    const stripBOMAndWaqf = (s: string) => {
      let result = s.replace(/^\uFEFF/, "");
      // If reading from local file, waist marks might already be removed, but safe to run again
      result = [...result].filter((ch) => !WAQF_MARKS.has(ch)).join("");
      return result;
    };

    // Process each ayah
    for (const ayah of surah.ayahs) {
      if (!ayah) throw new Error("Empty ayah");

      const text = stripBOMAndWaqf(ayah.text);
      const ayahUID = `${surah.number}:${ayah.numberInSurah}`;

      // Handle Bismillah: exclude from word analysis for non-Fatiha surahs
      let textToAnalyze = text;

      if (surah.number !== 1) {
        // Normalize text to remove tashkeel for comparison
        const normalizedText = stripDiacritics(text);

        if (normalizedText.startsWith(BISMILLAH_NORMALIZED)) {
          const parts = text.split(/\s+/);
          if (parts.length >= 4) {
             const remainingParts = parts.slice(4);
             textToAnalyze = remainingParts.join(" ");
          }
        }
      }

      // Split into words
      const kalimahArray = textToAnalyze.split(/\s+/);

      // Filter out empty strings
      const filteredKalimahArray = kalimahArray.filter(
        (k) => k && k.trim().length > 0
      );

      // Analyze words
      const { kalimahs, KalimahCount, harfCount } = analyzeKalimahsEnhanced(
        filteredKalimahArray,
        surah.number,
        ayah.numberInSurah,
        ayah.number,
        globalKalimahOffset,
        globalHarfOffset
      );

      // Update global letter offset
      globalKalimahOffset += KalimahCount;
      globalHarfOffset += harfCount;

      // Calculate total hisab
      const totalHisabValue = kalimahs.reduce(
        (sum, kalimah) => sum + kalimah.totalHisabValue,
        0
      );

      // Count letters
      const harfCounts = countHarfs(kalimahs);

      // Create enhanced ayah
      const enhancedAyah: EnhancedAyah = {
        ayahUID,
        surahNumber: surah.number,
        numberInSurah: ayah.numberInSurah,
        globalAyahNumber: ayah.number,
        text: text,
        page: ayah.page,
        juz: ayah.juz,
        ruku: ayah.ruku,
        manzil: ayah.manzil,
        hizbQuarter: ayah.hizbQuarter,
        sajda: ayah.sajda,
        totalKalimahs: KalimahCount,
        totalHarfs: harfCount,
        totalHisabValue,
        harfCounts,
        kalimahs,
      };

      result?.ayahs?.push(enhancedAyah);

      // Update surah totals
      result.totalKalimahs += KalimahCount;
      result.totalHarfs += harfCount;
      result.totalHisab += totalHisabValue;
    }

    // 💾 Save enhanced JSON
    const outputPath = `./src/data/enhanced-${result.nameEn.toLowerCase()}.json`;
    writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

    console.log(`✅ Success! Enhanced output: ${outputPath}`);
    console.log(`\n📖 Surah: ${result.nameEn} (${result.nameAr})`);
    console.log(`📊 Ayahs: ${result.numberOfAyahs}`);
    console.log(`🔤 Total kalimahs: ${result.totalKalimahs}`);
    console.log(`🔤 Total harfs: ${result.totalHarfs}`);
    console.log(`🧮 Total Hisab: ${result.totalHisab}\n`);

    return result;
}
