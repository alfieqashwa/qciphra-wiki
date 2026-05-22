---
title: analyzeKalimahsEnhanced.ts — Analisis Kata Enhanced
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, analysis, kalimah, word-analysis, code]
sources: [analyzeKalimahsEnhanced.ts]
---

# analyzeKalimahsEnhanced.ts — Analisis Kata Enhanced

_File TypeScript yang menganalisis setiap kata (kalimah) dalam ayat dan mengekstrak metadata huruf per huruf._

## Fungsi Inti

```typescript
export function analyzeKalimahsEnhanced(
  kalimahs: string[],           // Array kata Arab
  surahNumber: number,          // Nomor surah
  ayahNumberInSurah: number,    // Nomor ayat dalam surah
  globalAyahNumber: number,     // Nomor ayat global (1-6236)
  globalKalimahOffset: number,  // Offset indeks kata seluruh Quran
  globalHarfOffset: number      // Offset indeks huruf seluruh Quran
): { kalimahs: EnhancedKalimah[]; harfCount: number; KalimahCount: number }
```

## Proses Step-by-Step

### 1. Inisialisasi Counter
```typescript
let globalHarfNumber = globalHarfOffset;
let globalKalimahNumber = globalKalimahOffset;
let positionInAyah = 1;        // Posisi kata dalam ayat
let ayahHarfPosition = 1;      // Posisi huruf dalam ayat
```

### 2. Filter Kata Kosong
```typescript
const validKalimahs = kalimahs.filter((k) => k && k.trim().length > 0);
```

### 3. Loop Setiap Kata
Untuk setiap kata, fungsi:
- Membuat `kalimahUID` = `{surah}:{ayah}:{pos}`
- Menghapus tashkeel via `ArabicServices.removeTashkeel()`
- Loop setiap karakter dalam kata

### 4. Loop Setiap Huruf
Untuk setiap karakter:
- Cek apakah karakter adalah huruf Arab (`ARABIC_HARF_REGEX.test(char)`)
- Cari info Abjad (`ABJAD_MAP[char]`)
- Jika valid, buat `EnhancedHarf` dengan:
  - UID, karakter asli, bentuk normalized
  - Transliterasi, nilai Abjad, tipe (Light/Dark/Neutral)
  - Posisi dalam kata, ayat, dan global
- Akumulasi nilai Hisab
- Increment semua counter

### 5. Return
```typescript
return {
  kalimahs: analyzedKalimahs,   // Array EnhancedKalimah
  harfCount: globalHarfNumber - globalHarfOffset,
  KalimahCount: analyzedKalimahs.length,
};
```

## Dependencies

| Import | Dari | Fungsi |
|--------|------|--------|
| `ArabicServices.removeTashkeel` | arabic-services | Hapus tashkeel dari kata |
| `ABJAD_MAP` | abjadMap.ts | Nilai & tipe huruf |
| `ARABIC_HARF_REGEX` | arabicHarfRegex.ts | Deteksi huruf Arab |
| `HARF_NORMALIZATION` | normalization.ts | Normalisasi varian huruf |
| `TRANSLITERATION_MAP` | transliteration.ts | Transliterasi Latin |
| `EnhancedHarf`, `EnhancedKalimah` | types.ts | Tipe data output |

## Terkait

- [[generate-enhanced-surah-ts]] — pemanggil utama fungsi ini
- [[abjad-map-ts]] — peta nilai Abjad
- [[normalization-ts]] — normalisasi huruf
- [[transliteration-ts]] — transliterasi
- [[arabic-harf-regex-ts]] — regex deteksi huruf
- [[types-ts]] — interface output
- [[count-harfs-ts]] — penghitungan huruf dari hasil analisis
