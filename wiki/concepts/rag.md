---
title: RAG (Retrieval-Augmented Generation)
type: concept
created: 2026-05-22
updated: 2026-05-22
tags: [llm, rag, retrieval, nlp]
sources: [llm-wiki-idea.md]
---

# RAG (Retrieval-Augmented Generation)

_A pattern where an LLM retrieves relevant document chunks at query time and
generates an answer from those chunks._

## How It Works

1. Documents are split into chunks and indexed (usually via embeddings).
2. At query time, the most relevant chunks are retrieved.
3. The LLM generates an answer conditioned on the retrieved context.

## Limitation

RAG is **stateless across queries**. The LLM rediscovers knowledge from scratch
every time. There is no accumulation, no persistent cross-referencing, no
contradiction tracking. Subtle questions requiring synthesis across many documents
must be re-derived on every ask.

## Contrast with [[llm-wiki-pattern]]

The LLM Wiki pattern addresses RAG's core weakness: knowledge compounds in a
persistent wiki rather than being re-retrieved each time.
