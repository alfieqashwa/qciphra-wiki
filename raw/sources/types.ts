type HarfCount = {
  char: string;
  count: number | undefined;
};

// 🎯 Enhanced Harf interface
export interface EnhancedHarf {
  harfUID: string;
  char: string;
  normalizedHarf: string;
  transliteration: string;
  hisabValue: number;
  harfType: "LIGHT" | "DARK" | "NEUTRAL";
  positionInKalimah: number; // Human-readable position (1-indexed)
  positionInAyah: number; // Position within ayah (1-indexed)
  globalKalimahNumber: number;
  globalHarfNumber: number; // Absolute position in entire Quran
  ayahUID: string; // Reference to parent ayah
  kalimahUID: string; // Reference to parent word
}

// 🎯 Enhanced word interface
export interface EnhancedKalimah {
  kalimahUID: string;
  kalimahText: string;
  normalizedKalimah: string;
  totalHarfs: number;
  totalHisabValue: number;
  positionInAyah: number; // 1-based index inside ayah
  globalKalimahNumber: number; // 1- based index across entire Quran
  globalAyahNumber: number;
  surahNumber: number;
  ayahUID: string;
  harfs?: EnhancedHarf[];
}

// 🎯 Enhanced ayah interface
export interface EnhancedAyah {
  ayahUID: string;
  surahNumber: number;
  numberInSurah: number;
  globalAyahNumber: number; // <-- add this
  text: string;
  page: number;
  juz: number;
  ruku: number;
  manzil: number;
  hizbQuarter: number;
  sajda: boolean;
  totalKalimahs: number;
  totalHarfs: number;
  totalHisabValue: number;
  harfCounts: HarfCount[];
  kalimahs?: EnhancedKalimah[];
}

// 🎯 Enhanced surah interface
export interface EnhancedSurah {
  number: number;
  nameAr: string;
  nameEn: string;
  translation: string;
  revelation: string;
  numberOfAyahs: number;
  totalKalimahs: number; // NEW: Calculate this
  totalHarfs: number;
  totalHisab: number;
  ayahs?: EnhancedAyah[];
}
