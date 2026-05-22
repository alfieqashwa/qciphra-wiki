import { ArabicServices } from "arabic-services";
import { ABJAD_MAP } from "./abjadMap";
import { ARABIC_HARF_REGEX } from "./arabicHarfRegex";
import { HARF_NORMALIZATION } from "./normalization";
import { TRANSLITERATION_MAP } from "./transliteration";
import type { EnhancedHarf, EnhancedKalimah } from "./types";

/**
 * 🔠 Normalize Arabic letter to canonical form
 */
function normalizeArabicHarf(harf: string): string {
  return HARF_NORMALIZATION[harf] || harf;
}

/**
 * 📖 Get transliteration for Arabic letter
 */
function getTransliteration(harf: string): string {
  return TRANSLITERATION_MAP[harf] || harf;
}

/**
 * 🧮 Analyze words with enhanced metadata
 * @param kalimahs - Array of Arabic words
 * @param ayahNumber - Ayah number for UID generation
 * @param globalHarfOffset - Starting index for global letter count
 */

export function analyzeKalimahsEnhanced(
  kalimahs: string[],
  surahNumber: number,
  ayahNumberInSurah: number,
  globalAyahNumber: number,
  globalKalimahOffset: number,
  globalHarfOffset: number
): { kalimahs: EnhancedKalimah[]; harfCount: number; KalimahCount: number } {
  let globalHarfNumber = globalHarfOffset;
  let globalKalimahNumber = globalKalimahOffset; // ENTIRE QURAN WORD INDEX
  let positionInAyah = 1; // WORD NUMBER INSIDE AYAH (1-based)
  let ayahHarfPosition = 1; // Track position within ayah (1-indexed)

  // Filter empty words
  const validKalimahs = kalimahs.filter((k) => k && k.trim().length > 0);

  const analyzedKalimahs: EnhancedKalimah[] = validKalimahs.map(
    (kalimah, kalimahIdx) => {
      const kalimahUID = `${surahNumber}:${ayahNumberInSurah}:${
        kalimahIdx + 1
      }`;

      const normalizedKalimah = ArabicServices.removeTashkeel(kalimah);
      const harfs: EnhancedHarf[] = [];
      let totalHisabValue = 0;
      let positionInKalimah = 1;

      // Extract Arabic letters from word
      for (const char of kalimah) {
        const harfInfo = ABJAD_MAP[char];

        // Only process valid Arabic letters
        if (ARABIC_HARF_REGEX.test(char) && harfInfo) {
          const EnhancedHarf: EnhancedHarf = {
            harfUID: `${kalimahUID}:${positionInKalimah}`,
            char: char,
            normalizedHarf: normalizeArabicHarf(char),
            transliteration: getTransliteration(char),
            hisabValue: harfInfo.value,
            harfType: harfInfo.type,
            positionInKalimah,
            positionInAyah: ayahHarfPosition,
            globalKalimahNumber,
            globalHarfNumber,
            ayahUID: `${surahNumber}:${ayahNumberInSurah}`,
            kalimahUID,
          };

          harfs.push(EnhancedHarf);
          totalHisabValue += harfInfo.value;
          positionInKalimah++;
          ayahHarfPosition++;
          globalHarfNumber++;
        }
      }

      const enhancedKalimah: EnhancedKalimah = {
        kalimahUID,
        kalimahText: kalimah,
        normalizedKalimah,
        totalHarfs: harfs.length,
        totalHisabValue,
        positionInAyah,
        globalKalimahNumber,
        globalAyahNumber,
        surahNumber,
        ayahUID: `${surahNumber}:${ayahNumberInSurah}`,
        harfs,
      };

      // increment counters
      positionInAyah++;
      globalKalimahNumber++;

      return enhancedKalimah;
    }
  );

  return {
    kalimahs: analyzedKalimahs,
    harfCount: globalHarfNumber - globalHarfOffset,
    KalimahCount: analyzedKalimahs.length,
  };
}
