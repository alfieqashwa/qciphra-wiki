---
title: Hisab Jummal
type: concept
created: 2026-05-27
updated: 2026-05-27
tags: [hisab-jummal, abjad, numerology, arabic-alphabet, mathematics]
sources: [Abjad Numeral.md, Algoritma Checksum.md]
---

# Hisab Jummal

_An alphabetic numeral system assigning numeric values to Arabic letters — the foundation of Arabic/Islamic numerology._

## System Overview

Each of the 28 Arabic letters is assigned a value across three tiers:

| Tier | Range | Letters |
|------|-------|---------|
| Units | 1–9 | Alif(1), Ba(2), Jim(3), Dal(4), Ha(5), Waw(6), Zay(7), Ha(8), Ta(9) |
| Tens | 10–90 | Ya(10), Kaf(20), Lam(30), Mim(40), Nun(50), Sin(60), 'Ayn(70), Fa(80), Sad(90) |
| Hundreds | 100–1000 | Qaf(100), Ra(200), Shin(300), Ta(400), Tha(500), Kha(600), Dhal(700), Dad(800), Za(900), Ghayn(1000) |

## Key Properties

- **Non-positional**: Values are additive (like Roman numerals)
- **No zero**: The system predates the concept of zero
- **Abjad order**: `Alif-Ba-Jim-Dal` — different from modern Hijaiyah order
- **Two regional variants**: Mashriqi (Eastern) and Maghribi (Western) — differ in placement of Sin/Sad/Dad

## Letter Classification

Letters are also classified by metaphysical type:

| Type | Letters | Nature |
|------|---------|--------|
| **Light** (Nuraniyah) | ا ه ح ط ي ك ل م ن س ع ص ق ر | Positive, luminous |
| **Dark** (Zulmaniyah) | ج ز ف ش ث خ ظ | Negative, obscure |
| **Neutral** | ب د و ت ذ ض غ | Balanced |

## Historical Uses

- **Commerce**: Recording transactions before Hindu-Arabic numerals
- **Poetry**: Numeric riddles embedded in verse
- **Chronograms**: Encoding dates in phrases (the phrase's total value = the year)
- **Quranic analysis**: Analyzing Huruf Muqatta'ah, Basmalah value (786), structural patterns

## Technical Implementation

The source code (`abjadMap.ts`) implements:
- `ABJAD_MAP`: Array of 27 letter entries with harf, value, type, and special flags
- `ABJAD_LOOKUP`: O(1) lookup table
- `enrichHarfCounts()`: Annotates harf counts with type and value
- `convertHarfValueListToKalimah()`: Converts numeric values back to Arabic text
- `convertKalimahToHarfValueList()`: Converts Arabic text to numeric values

## Related

- [[islamic-numerology]] — broader numerological framework
- [[sejarah-angka-hindu-arab]] — what replaced this system
- [[algoritma-checksum]] — modern computational application
- [[number-19]] — "Wahid" (One) = 19 in this system
