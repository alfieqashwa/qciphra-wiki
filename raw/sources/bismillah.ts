// Bismillah standar
export const BISMILLAH_TEXT = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

/**
 * Remove tashkeel/diacritics from Arabic text
 * normalizing to NFD and stripping marks
 */
export function stripDiacritics(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, "");
}

export const BISMILLAH_NORMALIZED = stripDiacritics(BISMILLAH_TEXT);
