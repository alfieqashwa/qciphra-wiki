---
title: Quran Structure Analysis
type: concept
created: 2026-05-27
updated: 2026-05-27
tags: [quran, structure, analysis, checksum, parity, prime]
sources: [Algoritma Checksum.md, Analisis Teori Ganjil Genap.md, Surah-Surah Prima.md, Koneksi Prima dan 19.md]
---

# Quran Structure Analysis

_Computational and mathematical analysis of the Quran's structural patterns._

## Analytical Layers

### 1. Macro Structure (Surah-Level)
- **114 surahs** = 6 × 19
- **Odd-even parity**: 57 surahs with odd (surah# + ayah#), 57 with even — perfect 1:1 ratio
- **Prime surahs**: 7 surahs where both surah number and ayah count are prime
- **Accumulation totals**: All-prime result (577, 163, 727, 7)

### 2. Meso Structure (Ayah-Level)
- Per-ayah harf (letter) counts
- Per-ayah kalimah (word) counts
- Per-ayah Hisab (Abjad) totals
- Bismillah handling: excluded from non-Fatiha surah analysis

### 3. Micro Structure (Harf-Level)
- Each letter mapped to Abjad value
- Letter classification: Light / Dark / Neutral
- Global harf numbering across entire Quran (1 to ~330,000+)
- Normalization of letter variants (Hamza forms → Alif, Ta Marbuta → Ha, etc.)

## Data Pipeline

```
Quran API (api.alquran.cloud/v1/surah)
  → Fetch Uthmani text
  → Strip BOM & Waqf marks
  → Split into kalimahs (words)
  → Map each harf to Abjad value + type
  → Aggregate: harf → kalimah → ayah → surah
  → Output: enhanced JSON
```

## Key Data Types (from `types.ts`)

- `EnhancedHarf`: UID, char, normalized form, transliteration, Abjad value, type, positions
- `EnhancedKalimah`: UID, text, normalized text, harf count, Hisab total, global position
- `EnhancedAyah`: UID, text, page/juz/ruku, kalimah/harf/hisab totals, harf counts
- `EnhancedSurah`: number, names, revelation type, ayah count, totals

## Tools & Code

| File                         | Purpose                                            |
| ---------------------------- | -------------------------------------------------- |
| `generateEnhancedSurah.ts`   | Main pipeline — fetches API, processes, saves JSON |
| `analyzeKalimahsEnhanced.ts` | Word-level analysis with harf metadata             |
| `countHarfs.ts`              | Aggregates letter counts by normalized form        |
| `abjadMap.ts`                | Abjad value mapping + lookup tables                |
| `normalization.ts`           | Arabic letter variant normalization                |
| `transliteration.ts`         | Arabic-to-Latin transliteration                    |
| `arabicHarfRegex.ts`         | Unicode regex for Arabic letter detection          |
| `waqfMarks.ts`               | Unicode set of Quranic annotation marks            |
| `bismillah.ts`               | Bismillah text constants + diacritic stripping     |
| `surahName.ts`               | Per-surah metadata (offsets, names)                |
| `types.ts`                   | TypeScript interfaces for all data structures      |

## Related

- [[hisab-jummal]] — the value system
- [[islamic-numerology]] — broader framework
- [[number-19]] — 19's role in the structure
- [[prime-number]] — prime analysis
