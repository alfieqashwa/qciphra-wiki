---
title: surahName.ts — Metadata Offset Per Surah
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, metadata, offsets, surah, code]
sources: [surahName.ts]
---

# surahName.ts — Metadata Offset Per Surah

_File TypeScript yang menyimpan metadata setiap surah: nama, nomor, dan offset global untuk penomoran kata dan huruf._

## Struktur Data

Setiap surah direpresentasikan sebagai object:

```typescript
export const alFatihah = {
  surahName: "Al-Fatihah",
  surahNumber: 1,
  globalKalimahOffset: 1,    // Kata pertama surah ini = kata ke-1 seluruh Quran
  globalHarfOffset: 1,       // Huruf pertama surah ini = huruf ke-1 seluruh Quran
};
```

## Apa Itu Offset?

**globalKalimahOffset** — Posisi kata pertama surah ini dalam keseluruhan Quran.
- Al-Fatihah: offset 1 (kata pertama Quran)
- Al-Baqarah: offset 30 (setelah 29 kata Al-Fatihah)
- Ali Imran: offset 6146 (setelah semua kata surah 1-2)

**globalHarfOffset** — Posisi huruf pertama surah ini dalam keseluruhan Quran.
- Al-Fatihah: offset 1
- Al-Baqarah: offset 140 (setelah 139 huruf Al-Fatihah)

## Data Lengkap (Surah 1-63)

| Surah | Nama | Kalimah Offset | Harf Offset |
|-------|------|----------------|-------------|
| 1 | Al-Fatihah | 1 | 1 |
| 2 | Al-Baqarah | 30 | 140 |
| 3 | Ali 'Imran | 6,146 | 25,957 |
| 4 | An-Nisa | 9,627 | 40,656 |
| 5 | Al-Ma'idah | 13,374 | 56,664 |
| ... | ... | ... | ... |
| 63 | Al-Munafiqun | 71,505 | 300,061 |

## Data yang Belum Lengkap (Surah 64-114)

Surah 64-114 memiliki nilai `null` untuk kedua offset:

```typescript
export const atTaghabun = {
  surahName: "At-Taghabun",
  surahNumber: 64,
  globalKalimahOffset: null,  // Belum dihitung
  globalHarfOffset: null,
};
```

Ini berarti pipeline belum memproses surah-surah tersebut secara berurutan. Offset dihitung secara kumulatif — untuk menghitung offset surah 64, harus memproses surah 1-63 terlebih dahulu.

## Penggunaan

Digunakan di `generateEnhancedSurah.ts` untuk memberikan posisi global yang benar saat memproses setiap surah:

```typescript
const { alBaqarah } = await import('./surahName');
const result = await generateEnhancedSurah(
  alBaqarah.surahNumber,        // 2
  alBaqarah.globalKalimahOffset, // 30
  alBaqarah.globalHarfOffset     // 140
);
```

## Signifikansi

Penomoran global ini memungkinkan:
- Setiap huruf di seluruh Quran memiliki **nomor unik** (1 sampai ~330.000+)
- Setiap kata di seluruh Quran memiliki **nomor unik** (1 sampai ~77.000+)
- Cross-referencing antar surah menjadi mungkin
- Analisis statistik seluruh Quran secara terpadu

## Terkait

- [[generate-enhanced-surah-ts]] — pipeline yang menggunakan offset ini
- [[analyze-kalimahs-enhanced-ts]] — fungsi yang mengincrement offset
- [[types-ts]] — interface yang menyimpan globalKalimahNumber dan globalHarfNumber
- [[quran-structure-analysis]] — overview pipeline
