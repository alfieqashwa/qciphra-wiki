---
title: normalization.ts — Normalisasi Huruf Arab
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, normalization, arabic, code]
sources: [normalization.ts]
---

# normalization.ts — Normalisasi Huruf Arab

_File TypeScript yang memetakan varian huruf Arab ke bentuk canonical._

## Masalah yang Diselesaikan

Dalam teks Arab/Quran, satu huruf bisa memiliki beberapa bentuk penulisan:
- **Hamza** bisa ditulis di atas Alif (أ), di bawah Alif (إ), di atas Ya (ئ), atau berdiri sendiri (ء)
- **Alif** bisa berupa Alif biasa (ا), Alif Madda (آ), Alif Wasla (ٱ), atau Alif Maqsura (ى)
- **Ta Marbuta** (ة) adalah bentuk khusus Ta yang muncul di akhir kata

Untuk perhitungan Abjad yang konsisten, semua varian ini harus dinormalisasi ke satu bentuk dasar.

## Peta Normalisasi

```typescript
export const HARF_NORMALIZATION: Record<string, string> = {
  ٱ: "ا",  // Hamza Wasla → Alif
  آ: "ا",  // Alif Madda → Alif
  أ: "ا",  // Hamza Above Alif → Alif
  إ: "ا",  // Hamza Below Alif → Alif
  ء: "ا",  // Hamza → Alif
  ى: "ي",  // Alif Maqsura → Ya
  ئ: "ي",  // Hamza Above Ya → Ya
  ة: "ه",  // Ta Marbuta → Ha
};
```

## Aturan Normalisasi

| Varian | → | Canonical | Alasan |
|--------|---|-----------|--------|
| ٱ (Hamza Wasla) | → | ا (Alif) | Keduanya bunyi /a/ |
| آ (Alif Madda) | → | ا (Alif) | Panjang /a:/ tetap Alif |
| أ (Hamza + Alif) | → | ا (Alif) | Hamza adalah varian penulisan |
| إ (Hamza bawah Alif) | → | ا (Alif) | Sama |
| ء (Hamza mandiri) | → | ا (Alif) | Hamza dasar = glottal stop |
| ى (Alif Maqsura) | → | ي (Ya) | Bunyi /a:/ tapi grafem Ya |
| ئ (Hamza + Ya) | → | ي (Ya) | Varian Ya |
| ة (Ta Marbuta) | → | ه (Ha) | Secara fonetik = /h/ di akhir kata |

## Penggunaan

Digunakan di `analyzeKalimahsEnhanced.ts`:

```typescript
function normalizeArabicHarf(harf: string): string {
  return HARF_NORMALIZATION[harf] || harf;
}
```

Setiap huruf yang dianalisis akan dinormalisasi sebelum dicocokkan dengan ABJAD_MAP, memastikan bahwa varian penulisan tidak menghasilkan nilai Abjad yang berbeda.

## Terkait

- [[abjad-map-ts]] — peta nilai Abjad yang menggunakan hasil normalisasi
- [[analyze-kalimahs-enhanced-ts]] — fungsi yang memanggil normalizeArabicHarf
- [[hisab-jummal]] — sistem Abjad secara konseptual
