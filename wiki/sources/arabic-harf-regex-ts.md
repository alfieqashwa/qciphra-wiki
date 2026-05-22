---
title: arabicHarfRegex.ts — Regex Huruf Arab
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, regex, unicode, arabic, code]
sources: [arabicHarfRegex.ts]
---

# arabicHarfRegex.ts — Regex Huruf Arab

_File TypeScript yang mendefinisikan regex untuk mendeteksi karakter Arab dan tashkeel._

## Isi File

```typescript
export const ARABIC_HARF_REGEX =
  /[\u0621-\u063A\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC\u0610-\u061A\u064B-\u065F]/;
```

## Penjelasan Range Unicode

| Range | Isi | Keterangan |
|-------|-----|------------|
| `\u0621-\u063A` | ء إلى غ | Huruf Arab dasar (Hamza sampai Ghain) |
| `\u0641-\u064A` | ف إلى ي | Huruf Arab lanjutan (Fa sampai Ya) |
| `\u066E-\u066F` | ٮ و ٯ | Huruf Arab extended (Baa/Taa alternatif) |
| `\u0671-\u06D3` | ٱ إلى سٓ | Huruf Arab extended-A (Alif Wasla, varian) |
| `\u06FA-\u06FC` | ۺ إلى ۼ | Huruf Arab extended tambahan |
| `\u0610-\u061A` | ؐ إلى ؚ | Tanda baca Quranic (Arabic Sign Sallallahou...) |
| `\u064B-\u065F` | ً إلى ٍ | Tashkeel/diacritics (Fathah, Dammah, Kasrah, dll.) |

## Fungsi

Regex ini digunakan untuk **menentukan apakah sebuah karakter adalah huruf Arab** (termasuk tashkeel). Di `analyzeKalimahsEnhanced.ts`:

```typescript
if (ARABIC_HARF_REGEX.test(char) && harfInfo) {
  // Proses huruf ini
}
```

Hanya karakter yang lolos tes regex DAN punya entry di ABJAD_MAP yang akan diproses. Ini menyaring:
- Spasi dan tanda baca Latin
- Angka
- Karakter non-Arab
- Tanda waqf (yang punya range Unicode sendiri, lihat [[waqf-marks-ts]])

## Terkait

- [[analyze-kalimahs-enhanced-ts]] — fungsi yang menggunakan regex ini
- [[waqf-marks-ts]] — set karakter waqf yang dikecualikan
- [[abjad-map-ts]] — peta nilai yang dicocokkan setelah regex lolos
