---
title: Quranic Data Schema Overview
type: concept
created: 2026-05-23
updated: 2026-05-23
tags: [quran, data-schema, jsonl, enhanced-data, data-pipeline]
sources: [ayahs.jsonl, harfs.jsonl, kalimahs.jsonl, surahs.jsonl, generateEnhancedSurah.ts]
---

This page describes the overall data schema used within the QCiphra project for analyzing the Quran. The data flows from raw `.jsonl` files, which represent the foundational structure of the Quran, through processing by TypeScript tools to generate enhanced, comprehensive JSON data per surah. The raw `.jsonl` files are sourced from the [Al-Quran Cloud API](https://alquran.cloud/api).

## Raw Data Sources (raw/sources/)

The following JSON Lines (`.jsonl`) files serve as the immutable raw data sources, providing granular information at different levels of the Quranic text:

-   **`ayahs.jsonl`**: Contains records for each individual ayah (verse), including its text, unique ID, surah number, global ayah number, and basic counts (kalimahs, harfs, hisab value).
    *   Example fields: `ayahUID`, `surahNumber`, `text`, `totalKalimahs`, `totalHarfs`, `totalHisabValue`, `harfCounts`.
-   **`kalimahs.jsonl`**: Contains records for each individual kalimah (word), detailing its text, normalized form, total letters, hisab value, and positional information.
    *   Example fields: `kalimahUID`, `kalimahText`, `normalizedKalimah`, `totalHarfs`, `totalHisabValue`, `positionInAyah`, `globalKalimahNumber`.
-   **`harfs.jsonl`**: Provides the most granular data, with records for each individual harf (letter), including its character, normalized form, transliteration, hisab value, type, and detailed positional data.
    *   Example fields: `harfUID`, `char`, `normalizedHarf`, `transliteration`, `hisabValue`, `harfType`, `positionInKalimah`, `globalHarfNumber`.
-   **`surahs.jsonl`**: Offers summary information for each surah, such as its name (Arabic and English), revelation type, number of ayahs, and aggregated counts for kalimahs, harfs, and Hisab Jummal.
    *   Example fields: `number`, `nameAr`, `nameEn`, `translation`, `revelation`, `numberOfAyahs`, `totalKalimahs`, `totalHarfs`, `totalHisab`.

## Enhanced Data Output (src/data/)

The raw `.jsonl` data is processed by the [[generate-enhanced-surah-ts]] TypeScript pipeline to create richly detailed JSON files for each surah (e.g., `src/data/enhanced-al-baqara.json`). These enhanced files integrate and expand upon the raw data, adding comprehensive calculated metrics and nested structures (e.g., `ayahs` containing `kalimahs`, which in turn contain `harfs`).

This enhanced data is the primary source for programmatic analysis within the QCiphra project, enabling detailed queries on letter counts, word frequencies, and Hisab Jummal values across individual ayahs, words, and entire surahs. It allows for advanced numerical patterns to be identified and extracted program-matically, forming the basis for many derived facts stored in this wiki.

[[qciphra-project]]
[[quran-structure-analysis]]
[[hisab-jummal]]
