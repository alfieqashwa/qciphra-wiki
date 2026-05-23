---
title: QCiphra Project Overview
type: entity
created: 2026-05-23
updated: 2026-05-23
tags: [qciphra, project, source-code, overview]
sources: [QCiphra Source Code.md]
---

## Project Details

**Production URL**: https://qciphra.netlify.app/

This page serves as an overview for the [[qciphra-project]] and its underlying data structure. For a detailed explanation of the data schema, refer to [[quran-data-schema]]. For general information about the LLM Wiki concept, see [[llm-wiki-pattern]].

## Raw Data Sources

The QCiphra project utilizes several raw JSON Lines (`.jsonl`) files as foundational data. These files are detailed further in the [[quran-data-schema]] page. The primary raw data files include:
- `raw/sources/ayahs.jsonl`: Ayah-level data.
- `raw/sources/kalimahs.jsonl`: Kalimah (word)-level data.
- `raw/sources/harfs.jsonl`: Harf (letter)-level data.
- `raw/sources/surahs.jsonl`: Surah-level summary data.

## Source Code Components

Below are the various TypeScript components that make up the QCiphra project's analytical engine:

- [[types-ts]]
- [[abjad-map-ts]]
- [[normalization-ts]]
- [[transliteration-ts]]
- [[arabic-harf-regex-ts]]
- [[waqf-marks-ts]]
- [[bismillah-ts]]
- [[count-harfs-ts]]
- [[analyze-kalimahs-enhanced-ts]]
- [[generate-enhanced-surah-ts]]
- [[surah-name-ts]]
