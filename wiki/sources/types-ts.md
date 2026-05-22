---
title: types.ts — Type Definitions
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, types, data-model, code]
sources: [types.ts]
---

# types.ts — Definisi Tipe Data

_File TypeScript yang mendefinisikan semua interface/tipe data untuk pipeline analisis Quran._

## Fungsi

File ini adalah **fondasi tipe data** untuk seluruh proyek. Semua file lain mengimpor tipe dari sini. Mendefinisikan 4 interface utama yang membentuk hierarki data:

```
EnhancedSurah → EnhancedAyah → EnhancedKalimah → EnhancedHarf
```

## Interface: EnhancedHarf

Mewakili **satu huruf** dalam Quran dengan metadata lengkap:

| Field | Tipe | Keterangan |
|-------|------|------------|
| `harfUID` | string | ID unik: `{surah}:{ayah}:{kalimah}:{pos}` |
| `char` | string | Karakter Arab asli |
| `normalizedHarf` | string | Bentuk canonical (setelah normalisasi) |
| `transliteration` | string | Transliterasi Latin |
| `hisabValue` | number | Nilai Abjad/Jummal |
| `harfType` | LIGHT \| DARK \| NEUTRAL | Klasifikasi huruf |
| `positionInKalimah` number | Posisi dalam kata (1-indexed) |
| `positionInAyah` | number | Posisi dalam ayat (1-indexed) |
| `globalKalimahNumber` | number | Indeks kata seluruh Quran |
| `globalHarfNumber` | number | Indeks huruf absolut seluruh Quran |
| `ayahUID` | string | Referensi ke ayat induk |
| `kalimahUID` | string | Referensi ke kata induk |

## Interface: EnhancedKalimah

Mewakili **satu kata** (kalimah):

| Field | Tipe | Keterangan |
|-------|------|------------|
| `kalimahUID` | string | ID unik: `{surah}:{ayah}:{pos}` |
| `kalimahText` | string | Teks Arab asli |
| `normalizedKalimah` | string | Teks tanpa tashkeel |
| `totalHarfs` | number | Jumlah huruf |
| `totalHisabValue` | number | Total nilai Abjad |
| `positionInAyah` | number | Posisi dalam ayat |
| `globalKalimahNumber` | number | Indeks seluruh Quran (1-based) |
| `globalAyahNumber` | number | Nomor ayat global |
| `surahNumber` | number | Nomor surah |
| `harfs` | EnhancedHarf[] | Array huruf penyusun |

## Interface: EnhancedAyah

Mewakili **satu ayat**:

| Field | Tipe | Keterangan |
|-------|------|------------|
| `ayahUID` | string | `{surah}:{numberInSurah}` |
| `globalAyahNumber` | number | Nomor ayat global (1-6236) |
| `text` | string | Teks ayat lengkap |
| `page`, `juz`, `ruku`, `manzil`, `hizbQuarter` | number | Metadata struktur |
| `sajda` | boolean | Apakah ada sajdah |
| `totalKalimahs` | number | Jumlah kata |
| `totalHarfs` | number | Jumlah huruf |
| `totalHisabValue` | number | Total nilai Abjad |
| `harfCounts` | HarfCount[] | Hitungan per huruf |
| `kalimahs` | EnhancedKalimah[] | Array kata penyusun |

## Interface: EnhancedSurah

Mewakili **satu surah**:

| Field | Tipe | Keterangan |
|-------|------|------------|
| `number` | number | Nomor surah (1-114) |
| `nameAr`, `nameEn`, `translation` | string | Nama & terjemahan |
| `revelation` | string | Meccan / Medinan |
| `numberOfAyahs` | number | Jumlah ayat |
| `totalKalimahs` | number | Total kata |
| `totalHarfs` | number | Total huruf |
| `totalHisab` | number | Total nilai Abjad |
| `ayahs` | EnhancedAyah[] | Array ayat penyusun |

## Tipe Pendukung

```typescript
type HarfCount = {
  char: string;
  count: number | undefined;
};
```

## Catatan

- Surah 64-114 memiliki `globalKalimahOffset` dan `globalHarfOffset` = `null` di `surahName.ts`, artinya data global numbering belum lengkap untuk surah-surah tersebut.
- Interface ini digunakan oleh semua file lain: `generateEnhancedSurah.ts`, `analyzeKalimahsEnhanced.ts`, `countHarfs.ts`.

## Terkait

- [[quran-structure-analysis]] — pipeline yang menggunakan tipe-tipe ini
- [[generate-enhanced-surah-ts]] — file utama yang memproses data
- [[analyze-kalimahs-enhanced-ts]] — analisis kata per kata
