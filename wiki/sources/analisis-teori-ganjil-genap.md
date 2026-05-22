---
title: Analisis Teori Ganjil Genap
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [parity, odd-even, quran-structure, checksum]
sources: [Analisis Teori Ganjil Genap.md]
---

# Analisis Teori Ganjil Genap

_Odd/even parity analysis of Quranic surah and ayah numbers._

## The Analysis

For each of the 114 surahs, compute: `surah_number + number_of_ayahs`

| Metric | Value |
|--------|-------|
| Sum of surah numbers (1 to 114) | 6,555 |
| Sum of all ayahs | 6,236 |
| Surahs with odd sum | 57 |
| Surahs with even sum | 57 |
| Odd total | 6,555 |
| Even total | 6,236 |

## Key Result

**Perfect 57:57 balance** between odd and even sums. This is described as a "Matriks Integritas" (Integrity Matrix) because it locks three variables at once: surah count, surah order, and ayah count per surah.

## Full Data Table

The source contains a complete table of all 114 surahs with:
- Surah number, name, ayah count
- Odd or even classification
- Running totals

## Code

TypeScript implementation included that:
1. Fetches surah data from `api.alquran.cloud/v1/surah`
2. Maps each surah to its parity classification
3. Reduces to aggregate statistics

## Related

- [[algoritma-checksum]] — broader checksum framework
- [[islamic-numerology]] — numerological context
