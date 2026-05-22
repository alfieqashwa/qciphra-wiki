---
title: bismillah.ts — Konstanta Bismillah
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, bismillah, normalization, code]
sources: [bismillah.ts]
---

# bismillah.ts — Konstanta Bismillah

_File TypeScript yang menyimpan teks Bismillah dan fungsi penghapusan diakritik._

## Isi File

```typescript
export const BISMILLAH_TEXT = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

export function stripDiacritics(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, "");
}

export const BISMILLAH_NORMALIZED = stripDiacritics(BISMILLAH_TEXT);
```

## Fungsi stripDiacritics()

Menghapus semua tanda baca/diakritik Arab dari teks:

| Range | Isi |
|-------|-----|
| `\u064B-\u065F` | Fathah, Dammah, Kasrah, Shaddah, Sukun, dll. |
| `\u0670` | Superscript Alif |
| `\u06D6-\u06DC` | Tanda waqf (juga dihapus) |
| `\u06DF-\u06E8` | Tanda anotasi Quranic |
| `\u06EA-\u06ED` | Tanda waqf tambahan |

Menggunakan **NFD normalization** (decomposition) lalu menghapus kategori Unicode "Mark" (tanda baca).

## BISMILLAH_NORMALIZED

Hasil normalisasi Bismillah:
- Asli: `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ`
- Normalized: `بسم ٱلله ٱلرحمن ٱلرحيم`

## Mengapa Penting?

Bismillah muncul di awal **setiap surah** kecuali Surah At-Tawbah (9). Saat menganalisis kata per kata, Bismillah harus dikecualikan dari surah-surah selain Al-Fatihah agar tidak terhitung sebagai kata-kata surah tersebut.

Di `generateEnhancedSurah.ts`:

```typescript
if (surah.number !== 1) {
  const normalizedText = stripDiacritics(text);
  if (normalizedText.startsWith(BISMILLAH_NORMALIZED)) {
    // Hapus 4 kata pertama (Bismillah) dari analisis
    const parts = text.split(/\s+/);
    textToAnalyze = parts.slice(4).join(" ");
  }
}
```

## Terkait

- [[generate-enhanced-surah-ts]] — fungsi yang menggunakan BISMILLAH_NORMALIZED
- [[normalization-ts]] — normalisasi huruf varian
- [[waqf-marks-ts]] — tanda waqf yang juga dihapus
