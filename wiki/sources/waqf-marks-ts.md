---
title: waqfMarks.ts — Tanda Waqf Quran
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, waqf, unicode, quran, code]
sources: [waqfMarks.ts]
---

# waqfMarks.ts — Tanda Waqf Quran

_File TypeScript yang mendefinisikan set karakter Unicode untuk tanda waqf (berhenti) dan anotasi Quranic._

## Apa Itu Waqf?

**Waqf** (وقف) adalah tanda baca dalam mushaf Quran yang menunjukkan:
- Tempat berhenti saat membaca (pausa)
- Awal/akhir ayat
- Penanda rub el hizb (perempat hizb)
- Tempat sajdah

Tanda-tanda ini **bukan bagian dari teks asli** Quran dan harus dikecualikan saat menghitung huruf.

## Isi File

```typescript
export const WAQF_MARKS = new Set<string>([
  "\u06D6", // ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA
  "\u06D7", // ARABIC SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA
  "\u06D8", // ARABIC SMALL HIGH MEEM INITIAL FORM
  "\u06D9", // ARABIC SMALL HIGH LAM ALEF
  "\u06DA", // ARABIC SMALL HIGH JEEM
  "\u06DB", // ARABIC SMALL HIGH THREE DOTS ۛ
  "\u06DC", // ARABIC SMALL HIGH SEEN
  "\u06DD", // ARABIC END OF AYAH ۝
  "\u06DE", // ARABIC START OF RUB EL HIZB ۞
  "\u06DF", // ARABIC SMALL HIGH ROUNDED ZERO
  "\u06E0", // ARABIC SMALL HIGH UPRIGHT RECTANGULAR ZERO
  "\u06E1", // ARABIC SMALL HIGH DOTLESS HEAD OF KHAH
  "\u06E2", // ARABIC SMALL HIGH MEEM ISOLATED FORM
  "\u06E3", // ARABIC SMALL LOW SEEN
  "\u06E4", // ARABIC SMALL HIGH MADDA
  "\u06E5", // ARABIC SMALL WAW
  "\u06E6", // ARABIC SMALL YEH
  "\u06E7", // ARABIC SMALL HIGH YEH
  "\u06E8", // ARABIC SMALL HIGH NOON
  "\u06E9", // ARABIC PLACE OF SAJDAH ۩
  "\u06EA", // ARABIC EMPTY CENTRE LOW STOP
  "\u06EB", // ARABIC EMPTY CENTRE HIGH STOP
  "\u06EC", // ARABIC ROUNDED HIGH STOP WITH FILLED CENTRE
  "\u06ED", // ARABIC SMALL LOW MEEM
]);
```

Total: **24 karakter** tanda waqf/anotasi.

## Tanda-Tanda Penting

| Unicode | Simbol | Nama | Fungsi |
|---------|--------|------|--------|
| U+06DD | ۝ | End of Ayah | Penanda akhir ayat |
| U+06DE | ۞ | Start of Rub el Hizb | Penanda perempat hizb |
| U+06E9 | ۩ | Place of Sajdah | Tempat sujud |
| U+06D6-DB | ۖ-ۛ | Various waqf signs | Tanda berhenti bacaan |

## Penggunaan

Di `generateEnhancedSurah.ts`:

```typescript
const stripBOMAndWaqf = (s: string) => {
  let result = s.replace(/^\uFEFF/, "");  // Hapus BOM
  result = [...result].filter((ch) => !WAQF_MARKS.has(ch)).join("");
  return result;
};
```

Setiap teks ayat dibersihkan dari BOM dan tanda waqf **sebelum** dianalisis. Ini memastikan hitungan huruf hanya mencakup huruf-huruf Quran yang sebenarnya.

## Terkait

- [[generate-enhanced-surah-ts]] — fungsi yang menggunakan WAQF_MARKS
- [[arabic-harf-regex-ts]] — regex untuk mendeteksi huruf Arab
- [[quran-structure-analysis]] — pipeline keseluruhan
