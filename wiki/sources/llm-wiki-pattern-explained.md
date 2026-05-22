---
title: LLM Wiki Pattern — How It Works
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [llm-wiki, pattern, knowledge-base, methodology]
sources: [llm-wiki-idea.md]
---

# LLM Wiki Pattern — How It Works

_Penjelasan tentang pattern LLM Wiki dan bagaimana seharusnya bekerja._

## Ide Dasar

Setiap interaksi dengan LLM harus **meninggalkan jejak di wiki**. Bukan hanya menjawab di chat, tapi **mendokumentasikan jawaban** sebagai halaman wiki yang persisten.

## Alur yang Benar

```
User bertanya
  → LLM menjawab
  → LLM membuat halaman wiki (jika jawaban substansial)
  → LLM menambahkan [[wikilinks]] ke halaman terkait
  → LLM update index.md + log.md
  → Jawaban tersimpan secara permanen
```

## Aturan Wajib

1. **Setiap jawaban substansial → halaman wiki baru**
   - Pertanyaan fakta → halaman di `wiki/sources/`
   - Analisis lintas sumber → halaman di `wiki/synthesis/`
   - Konsep baru → halaman di `wiki/concepts/`
   - Orang/tempat/benda → halaman di `wiki/entities/`

2. **Selalu cross-reference** dengan `[[wikilinks]]` ke halaman terkait

3. **Selalu update** `wiki/index.md` dan `wiki/log.md` setelah membuat halaman

4. **Wiki adalah memori persisten**, bukan chat. Chat bersifat sementara, wiki bersifat permanen.

## Kesalahan Umum

| Kesalahan | Seharusnya |
|-----------|------------|
| Jawab di chat saja | Jawab + buat halaman wiki |
| Tidak update index/log | Selalu update setelah operasi |
| Tidak tambah wikilinks | Cross-reference secara agresif |
| Perlakukan seperti chat normal | Perlakukan seperti wiki contribution |

## Contoh Implementasi

Pertanyaan: "Berapa jumlah huruf Nun di Surah Al-Qamar?"

**Salah** (cuma jawab di chat):
> "Huruf Nun di Surah Al-Qamar berjumlah 121."

**Benar** (jawab + buat halaman):
> "Huruf Nun di Surah Al-Qamar berjumlah 121."
> → Buat `wiki/sources/huruf-nun-surah-qamar.md`
> → Update `wiki/index.md`
> → Append ke `wiki/log.md`

## Terkait

- [[llm-wiki-pattern]] — konsep dasar pattern
- [[qciphra-thesis]] — contoh synthesis page
