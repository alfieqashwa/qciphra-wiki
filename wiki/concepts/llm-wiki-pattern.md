---
title: LLM Wiki Pattern
type: concept
created: 2026-05-22
updated: 2026-05-22
tags: [llm, knowledge-base, wiki, pattern, architecture]
sources: [llm-wiki-idea.md]
---

# LLM Wiki Pattern

_A pattern for building personal knowledge bases where the LLM incrementally
constructs and maintains a persistent, interlinked wiki._

## Overview

Instead of retrieving from raw documents at query time (RAG), the LLM builds a
structured wiki that sits between the human and the raw sources. Knowledge is
compiled once and kept current, not re-derived on every query.

## Architecture

| Layer | Owner | Mutability | Purpose |
|-------|-------|------------|---------|
| Raw sources | Human | Immutable | Source of truth |
| Wiki | LLM | Read/write | Summaries, entities, synthesis |
| Schema | Human + LLM | Evolving | Rules and workflows |

## Key Principle

> The wiki is a **compounding artifact**. Every source makes it richer. Every
> good answer gets filed back in. The cost of maintenance is near zero because
> the LLM handles all bookkeeping.

## Use Cases

- Personal: goals, health, psychology, journaling
- Research: papers, articles, evolving thesis
- Reading: chapter-by-chapter companion wikis
- Business: internal wiki from Slack, meetings, documents
- Competitive analysis, due diligence, trip planning, course notes

## Contrast with RAG

| Aspect | RAG | LLM Wiki |
|--------|-----|----------|
| Knowledge accumulation | None — rediscovers every time | Compounds with every source |
| Cross-references | Not maintained | Pre-built and maintained |
| Contradictions | Not flagged | Explicitly tracked |
| Maintenance | N/A (stateless) | LLM handles it |
| Query speed | Depends on retrieval | Wiki is pre-synthesized |

## Related

- [[memex]] — Bush's original vision
- [[zettelkasten]] — Similar linking philosophy
- [[obsidian]] — The IDE for this pattern
