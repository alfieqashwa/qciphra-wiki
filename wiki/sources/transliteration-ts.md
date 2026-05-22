---
title: transliteration.ts — Transliterasi Huruf Arab
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, transliteration, arabic, code]
sources: [transliteration.ts]
---

# transliteration.ts — Transliterasi Huruf Arab

_File TypeScript yang memetakan setiap huruf Arab ke transliterasi Latin._

## Fungsi

Menyediakan peta `TRANSLITERATION_MAP` yang mengkonversi huruf Arab ke representasi Latin standar. Digunakan untuk menghasilkan field `transliteration` di setiap `EnhancedHarf`.

## Peta Transliterasi

| Arab | Latin | Nama |
|------|-------|------|
| ا | a | Alif |
| ب | b | Ba |
| ت | t | Ta |
| ث | th | Tsa |
| ج | j | Jim |
| ح | ḥ | Ha (dengan dot bawah) |
| خ | kh | Kha |
| د | d | Dal |
| ذ | dh | Dzal |
| ر | r | Ra |
| ز | z | Zay |
| س | s | Sin |
| ش | sh | Syin |
| ص | ṣ | Shod (dot bawah) |
| ض | ḍ | Dhad (dot bawah) |
| ط | ṭ | Tha (dot bawah) |
| ظ | ẓ | Dzha (dot bawah) |
| ع | ' | Ain (apostrof) |
| غ | gh | Ghain |
| ف | f | Fa |
| ق | q | Qaf |
| ك | k | Kaf |
| ل | l | Lam |
| م | m | Mim |
| ن | n | Nun |
| ه | h | Ha' |
| و | w | Waw |
| ي | y | Ya |

### Varian

| Varian | Latin | Keterangan |
|--------|-------|------------|
| ٱ | a | Hamza Wasla |
| آ | ā | Alif Madda (a panjang) |
| أ | a | Hamza atas Alif |
| إ | i | Hamza bawah Alif |
| ء | ' | Hamza mandiri |
| ى | ā | Alif Maqsura |
| ئ | y | Hamza atas Ya |
| ة | h | Ta Marbuta |

## Penggunaan

```typescript
function getTransliteration(harf: string): string {
  return TRANSLITERATION_MAP[harf] || harf;
}
```

Dipanggil di `analyzeKalimahsEnhanced.ts` untuk setiap huruf yang dianalisis.

## Terkait

- [[analyze-kalimahs-enhanced-ts]] — fungsi yang memanggil getTransliteration
- [[normalization-ts]] — normalisasi huruf sebelum transliterasi
- [[types-ts]] — interface EnhancedHarf yang menyimpan field transliteration
