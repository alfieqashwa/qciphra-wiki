---
title: Obsidian (Software)
type: entity
created: 2026-05-22
updated: 2026-05-22
tags: [software, note-taking, markdown, ide]
sources: [llm-wiki-idea.md]
---

# Obsidian

_A markdown-based knowledge base application that runs locally on your device._

## Why It's the IDE for LLM Wiki

- **Wikilinks**: `[[page-name]]` syntax maps directly to the LLM Wiki's
  cross-referencing convention.
- **Graph view**: Visualizes the shape of the wiki — hubs, orphans, clusters.
- **Local files**: The vault is just a directory of markdown files. The LLM
  reads and writes them directly.
- **Plugin ecosystem**:
  - **Dataview**: Query pages via YAML frontmatter (tags, dates, sources).
  - **Marp**: Markdown-based slide decks from wiki content.
  - **Web Clipper**: Save web articles as markdown to `raw/sources/`.

## Recommended Setup for LLM Wiki

1. Set attachment folder to `raw/assets/` (Settings → Files and links).
2. Bind `Ctrl+Shift+D` to "Download attachments for current file".
3. Enable graph view for visual exploration.

## Related

- [[llm-wiki-pattern]]
- [[zettelkasten]]
