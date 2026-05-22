---
title: LLM Wiki — Pattern for Personal Knowledge Bases
type: source-summary
created: 2026-05-22
updated: 2026-05-22
tags: [llm, knowledge-base, wiki, rag, pattern]
sources: [llm-wiki-idea.md]
---

# LLM Wiki — Pattern for Personal Knowledge Bases

_Summary of the source document that inspired this wiki system._

## Key Claims

- **RAG is ephemeral**: Standard RAG (retrieval-augmented generation) rediscovers
  knowledge from scratch on every query. No accumulation occurs.
- **Wiki is persistent**: An LLM-maintained wiki compounds over time. Cross-references
  are pre-built, contradictions pre-flagged, synthesis pre-computed.
- **Three-layer architecture**: Raw sources (immutable) → Wiki (LLM-owned) → Schema
  (configuration).
- **LLM handles bookkeeping**: The maintenance burden (cross-references, consistency,
  contradiction tracking) is what kills human-maintained wikis. LLMs do this for free.
- **Human's role**: Curate sources, direct analysis, ask questions, think about meaning.

## Workflows Described

1. **Ingest**: Source → read → discuss → summary page → update entities/concepts →
   update index + log.
2. **Query**: Question → search wiki → synthesize with citations → file answer if
   substantial.
3. **Lint**: Health check → contradictions, orphans, stale claims, missing pages,
   missing links.

## Related Concepts

- [[memex]] — Vannevar Bush's 1945 vision of a personal knowledge store with
  associative trails.
- [[zettelkasten]] — Atomic note-taking method with heavy linking.
- [[obsidian]] — Markdown-based knowledge base IDE with graph view and plugins.

## Personal Notes

This document is the seed of the entire qciphra system. Every source ingested from
here will build on the pattern described here.
