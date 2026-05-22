import type { EnhancedKalimah } from "./types";

/**
 * 🔢 Count letters by normalized form
 */
export function countHarfs(kalimahs: EnhancedKalimah[]) {
  const map: Record<string, number> = {};

  // Iterate through all words and their letters
  for (const kalimah of kalimahs) {
    for (const harf of kalimah.harfs ?? []) {
      const normalized = harf.normalizedHarf;
      map[normalized] = (map[normalized] || 0) + 1;
    }
  }

  return Object.keys(map).map((char) => ({ char, count: map[char] }));
}
