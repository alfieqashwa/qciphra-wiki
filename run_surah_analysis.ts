import { generateEnhancedSurah } from "./raw/sources/generateEnhancedSurah";
// No need for fs or path imports if we always regenerate

async function run() {
  let globalKalimahOffset = 0; // Cumulative kalimah offset for accurate global indexing
  let globalHarfOffset = 0;    // Cumulative harf offset for accurate global indexing
  let totalQuranHisab = 0;   // Accumulator for Hisab Jummal
  const totalSurahs = 114;

  console.log("Starting comprehensive Quranic data generation...");
  console.log("This may take a while as it processes all 114 surahs.");

  for (let surahNumber = 1; surahNumber <= totalSurahs; surahNumber++) {
    try {
      console.log(`✨ Processing Surah ${surahNumber} of ${totalSurahs}...`);
      const result = await generateEnhancedSurah(surahNumber, globalKalimahOffset, globalHarfOffset);

      // Update cumulative offsets and total Hisab
      globalKalimahOffset += result.totalKalimahs;
      globalHarfOffset += result.totalHarfs;
      totalQuranHisab += result.totalHisab;

    } catch (error) {
      console.error(`❌ Error generating enhanced data for Surah ${surahNumber}:`, error);
      // Log the error but continue to the next surah to try and get as much data as possible
    }
  }

  console.log("----------------------------------------");
  console.log("✅ All Surahs Processed. Quranic Statistics:");
  console.log(`Total Kalimahs (Words) in Quran: ${globalKalimahOffset}`);
  console.log(`Total Harfs (Letters) in Quran: ${globalHarfOffset}`);
  console.log(`Total Hisab Jummal in Quran: ${totalQuranHisab}`);
  console.log("----------------------------------------");
}

run();
