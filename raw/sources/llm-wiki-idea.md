# LLM Wiki — A Pattern for Building Personal Knowledge Bases

> This is the idea document that inspired the qciphra wiki system.

## The Core Idea

Most LLM + document systems use RAG: upload files, retrieve chunks at query time,
generate an answer. The LLM rediscovers knowledge from scratch every time. Nothing
accumulates.

The LLM Wiki pattern is different. The LLM incrementally builds and maintains a
**persistent wiki** — a structured, interlinked collection of markdown files. When
you add a new source, the LLM reads it, extracts key information, and integrates
it into the existing wiki: updating entity pages, revising topic summaries,
noting contradictions, strengthening the evolving synthesis.

## Three Layers

1. **Raw sources** — immutable collection of source documents.
2. **The wiki** — LLM-generated markdown files (summaries, entities, concepts,
   comparisons, synthesis).
3. **The schema** — a configuration file (AGENTS.md) that tells the LLM how the
   wiki is structured and what workflows to follow.

## Key Operations

- **Ingest**: Drop a source → LLM reads, discusses, writes summary, updates
  entity/concept pages, updates index and log.
- **Query**: Ask a question → LLM searches wiki, synthesizes answer with
  citations. Good answers get filed back as new pages.
- **Lint**: Periodic health check → contradictions, orphans, stale claims,
  missing cross-references, data gaps.

## Why It Works

The tedious part of a knowledge base is the **bookkeeping**: updating
cross-references, keeping summaries current, noting contradictions, maintaining
consistency. Humans abandon wikis because maintenance burden grows faster than
value. LLMs don't get bored and can touch 15 files in one pass.

## Related Ideas

- **Vannevar Bush's Memex** (1945): personal curated knowledge store with
  associative trails between documents. The LLM solves the maintenance problem
  Bush couldn't.
- **Zettelkasten**: atomic notes linked together. Similar spirit but the LLM
  handles the linking and maintenance.
- **Obsidian**: the IDE for this system. Graph view, wikilinks, plugins
  (Dataview, Marp).
