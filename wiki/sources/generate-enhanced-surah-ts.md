---
title: generateEnhancedSurah.ts — Pipeline Utama
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, pipeline, api, data-generation, code]
sources: [generateEnhancedSurah.ts]
---

# generateEnhancedSurah.ts — Pipeline Utama

_File TypeScript yang menjadi **entry point** pipeline: fetch data Quran dari API, proses, dan simpan sebagai JSON enhanced._

## Tiga Fungsi Utama

### 1. generateEnhancedSurah() — Fetch dari API
```typescript
export async function generateEnhancedSurah(
  surahNumber: number,
  globalKalimahOffset: number,
  globalHarfOffset: number
)
```
- Fetch dari `https://api.alquran.cloud/v1/surah/{number}/quran-uthmani`
- Retry mechanism: 5 attempts dengan exponential backoff (1s, 2s, 4s, 8s, 16s)
- Parses JSON response
- Delegasi ke `processSurahData()`

### 2. regenerateLocalEnhancedSurah() — Baca dari File Lokal
```typescript
export async function regenerateLocalEnhancedSurah(
  surahNumber: number,
  surahNameEn: string,
  globalKalimahOffset: number,
  globalHarfOffset: number
)
```
- Baca file JSON enhanced yang sudah ada di `./src/data/`
- Fuzzy matching: cari by number dulu, lalu by name
- Map `EnhancedSurah` → `QuranApiSurah` untuk kompatibilitas
- Delegasi ke `processSurahData()`

### 3. processSurahData() — Logika Pemrosesan Inti
```typescript
function processSurahData(
  surah: QuranApiSurah,
  globalKalimahOffset: number,
  globalHarfOffset: number
): EnhancedSurah
```

## Alur processSurahData()

```
1. Inisialisasi result: EnhancedSurah
2. Untuk setiap ayat:
   a. Strip BOM & Waqf marks
   b. Handle Bismillah (kecuali Surah 1)
   c. Split menjadi array kata
   d. Filter kata kosong
   e. analyzeKalimahsEnhanced() → EnhancedKalimah[]
   f. Update global offsets
   g. Hitung total Hisab
   h. countHarfs() → harfCounts[]
   i. Buat EnhancedAyah
   j. Push ke result.ayahs
   k. Akumulasi totals surah
3. Simpan ke ./src/data/enhanced-{nameEn}.json
4. Return result
```

## Penanganan Bismillah

```typescript
if (surah.number !== 1) {
  const normalizedText = stripDiacritics(text);
  if (normalizedText.startsWith(BISMILLAH_NORMALIZED)) {
    // Hapus 4 kata pertama (Bismillah)
    const parts = text.split(/\s+/);
    textToAnalyze = parts.slice(4).join(" ");
  }
}
```

Bismillah di awal surah (kecuali Al-Fatihah) dikecualikan dari analisis kata agar tidak terhitung sebagai kata surah tersebut.

## Output

File JSON disimpan di `./src/data/enhanced-{surahNameEn.toLowerCase()}.json` dengan struktur `EnhancedSurah` lengkap.

Console output:
```
✅ Success! Enhanced output: ./src/data/enhanced-al-fatihah.json

📖 Surah: Al-Faatiha (سُورَةُ ٱلْفَاتِحَةِ)
📊 Ayahs: 7
🔤 Total kalimahs: 29
🔤 Total harfs: 139
🧮 Total Hisab: 10143
```

## Dependencies

| Import | Dari | Fungsi |
|--------|------|--------|
| `analyzeKalimahsEnhanced` | analyzeKalimahsEnhanced.ts | Analisis kata per kata |
| `BISMILLAH_NORMALIZED`, `stripDiacritics` | bismillah.ts | Penanganan Bismillah |
| `countHarfs` | countHarfs.ts | Hitung frekuensi huruf |
| `WAQF_MARKS` | waqfMarks.ts | Hapus tanda waqf |
| `EnhancedAyah`, `EnhancedSurah` | types.ts | Tipe data output |

## Terkait

- [[quran-structure-analysis]] — overview pipeline
- [[analyze-kalimahs-enhanced-ts]] — analisis kata
- [[count-harfs-ts]] — penghitungan huruf
- [[bismillah-ts]] — konstanta Bismillah
- [[waqf-marks-ts]] — tanda waqf
- [[surah-name-ts]] — metadata offset per surah
- [[types-ts]] — interface data
