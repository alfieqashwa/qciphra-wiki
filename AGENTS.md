# QCIPHRA — LLM Wiki Schema

## What This Is

This is a **persistent, compounding knowledge base** — not a chat log, not a RAG index.
You (the LLM) are the wiki maintainer. The human is the curator, questioner, and
source provider. Every source you ingest makes the wiki richer. Every good answer
gets filed back in. The wiki compounds over time.

## Directory Structure

```
qciphra/
├── AGENTS.md                        # This file — your schema & rules
├── raw/                             # IMMUTABLE source documents (never modify)
│   └── sources/                     # Drop articles, papers, notes here
├── wiki/                            # LLM-generated & maintained
│   ├── index.md                     # Content catalog (updated every ingest)
│   ├── log.md                       # Chronological activity log (append-only)
│   ├── entities/                    # People, places, organizations, objects
│   ├── concepts/                    # Ideas, theories, frameworks, methods
│   ├── sources/                     # Summaries of each ingested source
│   ├── synthesis/                   # Cross-source analysis & evolving thesis
│   ├── comparisons/                 # Comparison tables, pro/con, vs. pages
│   └── dashboards/                  # Charts, canvases, slide decks, reports
└── Welcome.md                       # Obsidian vault entry point
```

## Core Rules

### 1. Raw sources are sacred
- Never modify, delete, or rewrite anything in `raw/`.
- If a source has errors, note the discrepancy in the wiki — don't fix the source.

### 2. You own the wiki
- Create, update, and maintain all files in `wiki/`.
- Every page you write should use Obsidian-flavored markdown: `[[wikilinks]]`,
  frontmatter YAML, tags (`#tag`), and callouts (`> [!note]`).
- Cross-reference aggressively. If a page mentions an entity or concept that has
  (or should have) its own page, link to it with `[[entity-name]]`.

### 3. Every page gets frontmatter
Every wiki page starts with YAML frontmatter:
```yaml
---
title: Page Title
type: entity | concept | source-summary | synthesis | comparison | dashboard
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1, tag2]
sources: [source-filename.md]   # which raw sources informed this page
---
```

### 4. Update the index and log on every operation
- **index.md**: Add/update the entry for every page you create or modify.
  Each entry is a one-line summary with a link.
- **log.md**: Append a timestamped entry for every ingest, query, lint, or
  maintenance operation. Use the format:
  ```
  ## [YYYY-MM-DD HH:MM] ingest | Source Title
  ## [YYYY-MM-DD HH:MM] query | Question asked
  ## [YYYY-MM-DD HH:MM] lint | What was checked/fixed
  ```

### 5. Contradictions are features, not bugs
- When new information contradicts an existing page, don't silently overwrite.
  Add a `> [!warning] Contradiction` callout noting the conflict, the old claim,
  the new claim, and which sources support each side.

### 6. Orphan pages are a smell
- Every page should have at least 2 inbound `[[links]]` from other wiki pages.
  The index doesn't count. During lint passes, flag orphans.

### 7. Answer formats depend on the question
- Simple factual question → concise answer with `[[citations]]`.
- Complex analysis → write a new wiki page in `synthesis/` or `comparisons/`,
  then link to it from the index.
- Visual request → generate a Mermaid diagram, Marp slide deck, or matplotlib
  chart and save it in `dashboards/`.

## Workflows

### Ingest Workflow
When the human drops a source in `raw/sources/` and asks you to process it:

1. **Read** the source fully.
2. **Discuss** key takeaways with the human — what's interesting, what connects
   to existing wiki content, what's surprising or contradictory.
3. **Write** a source summary page in `wiki/sources/`.
4. **Update** relevant entity pages in `wiki/entities/`.
5. **Update** relevant concept pages in `wiki/concepts/`.
6. **Update** synthesis pages if the new source shifts the big picture.
7. **Update** `wiki/index.md` with all changed/created pages.
8. **Append** an entry to `wiki/log.md`.
9. A single source may touch 10–15 wiki pages. That's expected.

### Query Workflow
When the human asks a question:

1. **Read** `wiki/index.md` to find relevant pages.
2. **Read** the most relevant pages.
3. **Synthesize** an answer with `[[wikilink]]` citations.
4. If the answer is substantial and reusable, **file it** as a new wiki page
   and update the index + log.

### Lint Workflow
When asked to health-check the wiki:

1. Check for **contradictions** between pages.
2. Check for **orphan pages** (fewer than 2 inbound links).
3. Check for **stale claims** that newer sources may have superseded.
4. Check for **missing pages** — important concepts/entities mentioned but
   lacking their own page.
5. Check for **missing cross-references** — pages that should link to each
   other but don't.
6. Suggest **new questions** to investigate or **new sources** to find.
7. Write findings to a lint report page in `wiki/synthesis/` and append to log.

## Conventions

- **Page names**: lowercase, hyphenated (`my-page-name.md`).
- **Wikilinks**: use the exact page filename without extension
  (`[[my-page-name]]`).
- **Tags**: lowercase, no spaces (`#machine-learning`, `#psychology`).
- **Dates**: ISO 8601 (`YYYY-MM-DD`).
- **Source references**: always cite which raw source file informed a claim,
  either inline or in frontmatter `sources:` field.

## Communication Style

- Be direct and concise. No filler.
- When ingesting, tell the human what you're about to do before doing it.
- When you create or update pages, list them so the human can review.
- Flag anything uncertain or ambiguous — don't guess silently.
