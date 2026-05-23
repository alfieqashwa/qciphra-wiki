# QCIPHRA Wiki

A persistent, compounding knowledge base about numerical patterns in the Quran, built and maintained by an LLM agent inside [Obsidian](https://obsidian.md).

## What This Is

This is **not** a chat log and **not** a RAG index. Every source ingested makes the wiki richer. Every answer gets filed back in. The wiki compounds over time — the LLM agent is the wiki maintainer; the human is the curator, questioner, and source provider.

Currently at **43+ pages** across research documents, code reference, entity/concept pages, and cross-source synthesis.

## Why "QCIPHRA"

From Arabic **قِصْفْرَة** (*qiphra*), derived from the science of **Hisab Jummal** (حساب الجُمَّل) — the Abjad numeral system where Arabic letters carry numeric values. This wiki explores the intersection of Quranic structure, prime numbers, the number 19, and computational analysis.

## Topics Covered

| Area | Examples |
|---|---|
| **Quran Structure Analysis** | Surah/ayah statistics, odd/even parity, checksum algorithms, prime surahs |
| **Numeric Mysteries** | Number 19, digital root patterns, connections between primes and Quranic structure |
| **Abjad Numeral System** | Hisab Jummal history, letter-to-number mapping, Quranic Hisab Jummal totals |
| **History of Numerals** | Hindu-Arabic numeral transmission (Brahmagupta → Al-Khwarizmi → Fibonacci) |
| **TypeScript Code Reference** | Full Quran analysis pipeline: harf counting, kalimah analysis, surah generation, normalization |
| **LLM Knowledge Systems** | The LLM Wiki pattern itself — memex, zettelkasten, RAG comparisons |

## Directory Structure

```
qciphra-wiki/
├── AGENTS.md              # LLM agent schema, rules, and workflows
├── README.md              # This file
├── raw/                   # IMMUTABLE source documents (never modify)
│   └── sources/           # Research docs, TypeScript code, JSONL data, images
├── wiki/                  # LLM-generated & maintained knowledge base
│   ├── index.md           # Content catalog (updated every ingest)
│   ├── log.md             # Chronological activity log (append-only)
│   ├── entities/          # People, places, organizations
│   ├── concepts/          # Ideas, theories, frameworks
│   ├── sources/           # Summaries of each ingested raw source
│   ├── synthesis/         # Cross-source analysis & thesis
│   ├── comparisons/       # Comparison tables, pro/con pages
│   └── dashboards/        # Charts, slides, visual reports
└── .obsidian/             # Obsidian vault configuration
```

## How It Works

The LLM agent follows strict rules defined in `AGENTS.md`:

1. **Raw sources are sacred** — never modified, never deleted.
2. **Every page has frontmatter** — YAML with title, type, dates, tags, and source citations.
3. **Every answer becomes a wiki page** — no exceptions. Chat is temporary; the wiki is persistent memory.
4. **Aggressive cross-referencing** — every page uses `[[wikilinks]]` to connect related content.
5. **Contradictions are preserved** — noted with `> [!warning]` callouts, never silently overwritten.
6. **Index and log updated on every operation** — the wiki is always self-documenting.

### Workflows

- **Ingest**: Drop a source in `raw/sources/` → agent reads, discusses, writes 10–15 wiki pages.
- **Query**: Ask a question → agent reads relevant pages, synthesizes, files a new wiki page.
- **Lint**: Health-check → scan for orphans, contradictions, stale claims, missing links.

## Obsidian Features Used

- `[[Wikilinks]]` for internal linking
- YAML frontmatter for structured metadata
- Tags (`#math`, `#quran`, `#history`) for categorization
- Callouts (`> [!note]`, `> [!warning]`) for highlights and contradictions
- Graph view for visualizing connections

## Getting Started (for humans)

1. Open the folder as an Obsidian vault.
2. Start at `wiki/index.md` — the content catalog.
3. Explore via `[[links]]` or the graph view.
4. Drop new sources in `raw/sources/` and ask the LLM agent to ingest them.
5. Ask questions — every answer will be filed back into the wiki.

## Getting Started (for the LLM agent)

Read `AGENTS.md`. Follow the schema. Never modify `raw/`. Always update `wiki/index.md` and `wiki/log.md`. File every answer. No chat-only responses.

---

*Built with [Obsidian](https://obsidian.md) and maintained by an LLM agent following the LLM Wiki pattern.*
