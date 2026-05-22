---
title: abjadMap.ts — Peta Nilai Abjad
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, abjad, hisab-jummal, code, data-mapping]
sources: [abjadMap.ts]
---

# abjadMap.ts — Peta Nilai Abjad/Jummal

_File TypeScript yang memetakan setiap huruf Arab ke nilai Abjad, tipe (Light/Dark/Neutral), dan fungsi konversi._

## Fungsi Utama

1. **ABJAD_MAP** — Array 27 entry huruf dengan nilai Abjad, tipe, dan flag khusus
2. **ABJAD_LOOKUP** — Lookup table O(1) dari huruf → info
3. **enrichHarfCounts()** — Anotasi hitungan huruf dengan tipe & nilai
4. **convertHarfValueListToKalimah()** — Konversi daftar nilai → teks Arab
5. **convertKalimahToHarfValueList()** — Konversi teks Arab → daftar nilai

## Struktur Data: HarfInfo

```typescript
interface HarfInfo {
  harf: string;        // Karakter Arab
  value: number;       // Nilai Abjad (1-1000)
  type: LetterType;    // "DARK" | "LIGHT" | "NEUTRAL"
  special?: boolean;   // Kasus khusus (varian Alif)
}
```

## Daftar Huruf & Nilai

### Huruf Light (Nuraniyah) — 14 huruf

| Huruf | Nama | Nilai |
|-------|------|-------|
| ا | Alif | 1 |
| ه | Ha' | 5 |
| ح | Ha | 8 |
| ط | Tha | 9 |
| ي | Ya | 10 |
| ك | Kaf | 20 |
| ل | Lam | 30 |
| م | Mim | 40 |
| ن | Nun | 50 |
| س | Sin | 60 |
| ع | Ain | 70 |
| ص | Shod | 90 |
| ق | Qaf | 100 |
| ر | Ra | 200 |

### Huruf Dark (Zulmaniyah) — 7 huruf

| Huruf | Nama | Nilai |
|-------|------|-------|
| ج | Jim | 3 |
| ز | Zay | 7 |
| ف | Fa | 80 |
| ش | Syin | 300 |
| ث | Tsa | 500 |
| خ | Kha | 600 |
| ظ | Dzha | 900 |

### Huruf Neutral — 7 huruf

| Huruf | Nama | Nilai |
|-------|------|-------|
| ب | Ba | 2 |
| د | Dal | 4 |
| و | Waw | 6 |
| ت | Ta | 400 |
| ذ | Dzal | 700 |
| ض | Dhad | 800 |
| غ | Ghain | 1000 |

### Kasus Khusus (special: true)

| Huruf | Normalisasi | Nilai | Keterangan |
|-------|-------------|-------|------------|
| ء | → ا (Alif) | 1 | Hamza |
| ئ | → ي (Ya) | 10 | Hamza di atas Ya |
| ة | → ه (Ha) | 5 | Ta Marbuta |

## Fungsi Konversi

### convertKalimahToHarfValueList(kalimah)
```typescript
// Input: "بسم" → Output: [2, 60, 40]
// Ba=2, Sin=60, Mim=40
```

### convertHarfValueListToKalimah(list)
```typescript
// Input: [2, 60, 40] → Output: "بsm"
// (reverse lookup, filter undefined)
```

### enrichHarfCounts(harfCounts)
Menambahkan metadata (type, value) ke setiap hitungan huruf.

## Terkait

- [[hisab-jummal]] — sistem Abjad secara konseptual
- [[analyze-kalimahs-enhanced-ts]] — menggunakan ABJAD_MAP untuk analisis
- [[normalization-ts]] — peta normalisasi huruf varian
- [[transliteration-ts]] — peta transliterasi
