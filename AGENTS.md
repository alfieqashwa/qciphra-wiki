# QCIPHRA — Skema LLM Wiki

## Apa Ini

Ini adalah **basis knowledge yang persisten dan compounding** — bukan log chat, bukan index RAG.
Kamu (LLM) adalah pemelihara wiki. Manusia adalah kurator, penanya, dan penyedia sumber.
Setiap sumber yang diingest membuat wiki lebih kaya. Setiap jawaban baik diarsipkan kembali.
Wiki ini berkembang seiring waktu.

## Struktur Direktori

```
qciphra/
├── AGENTS.md                        # File ini — skema dan aturanmu
├── raw/                             # DOKUMEN sumber IMMUTABLE (jangan modif)
│   └── sources/                     # Taruh artikel, paper, catatan di sini
├── wiki/                            # Dikelola & dihasilkan LLM
│   ├── index.md                     # Katalog konten (diupdate setiap ingest)
│   ├── log.md                       # Log aktivitas kronologis (append-only)
│   ├── entities/                    # Orang, tempat, organisasi, objek
│   ├── concepts/                    # Ide, teori, framework, metode
│   ├── sources/                     # Ringkasan setiap sumber yang diingest
│   ├── synthesis/                   # Analisis lintas-sumber & tesis berkembang
│   ├── comparisons/                 # Tabel perbandingan, pro/kontra, halaman vs
│   └── dashboards/                  # Chart, canvas, slide deck, laporan
└── Welcome.md                       # Entry point vault Obsidian
```

## Aturan Inti

### 1. Sumber raw bersifat sakral
- Jangan modif, hapus, atau tulis ulang apa pun di `raw/`.
- Jika sumber punya error, catat di wiki — jangan periki sumbernya.

### 2. Kamu punya wiki ini
- Buat, update, dan pelihara semua file di `wiki/`.
- Setiap halaman harus pakai Obsidian-flavored markdown: `[[wikilinks]]`,
  frontmatter YAML, tags (`#tag`), dan callouts (`> [!note]`).
- Cross-reference secara agresif. Jika halaman menyebut entitas atau konsep yang
  punya (atau harus punya) halaman sendiri, link pakai `[[entity-name]]`.

### 3. Setiap halaman dapat frontmatter
Setiap halaman wiki dimulai dengan YAML frontmatter:
```yaml
---
title: Judul Halaman
type: entity | concept | source-summary | synthesis | comparison | dashboard
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1, tag2]
sources: [source-filename.md]   # sumber raw yang menginformasikan halaman ini
---
```

### 4. Update index dan log di setiap operasi
- **index.md**: Tambah/update entry untuk setiap halaman yang kamu buat atau modif.
  Setiap entry adalah ringkasan satu baris dengan link.
- **log.md**: Append entry timestamped untuk setiap ingest, query, lint, atau
  operasi maintenance. Pakai format:
  ```
  ## [YYYY-MM-DD HH:MM] ingest | Judul Sumber
  ## [YYYY-MM-DD HH:MM] query | Pertanyaan yang diajukan
  ## [YYYY-MM-DD HH:MM] lint | Apa yang dicek/diperbaiki
  ```

### 5. Kontradiksi adalah fitur, bukan bug
- Ketika informasi baru kontradiksi dengan halaman existing, jangan overwrite diam-diam.
  Tambah `> [!warning] Contradiction` callout yang mencatat konflik, klaim lama,
  klaim baru, dan sumber mana yang mendukung masing-masing.

### 6. Halaman orphan adalah red flag
- Setiap halaman harus punya minimal 2 inbound `[[links]]` dari halaman wiki lain.
  Index tidak dihitung. Selama lint pass, flag orphan.

### 7. Setiap jawaban menjadi halaman wiki — TAK TERKECUALI
- **Jangan pernah** jawab pertanyaan hanya di chat. Selalu buat halaman wiki.
- Pertanyaan faktual sederhana → halaman `wiki/sources/` dengan jawaban + konteks.
- Analisis kompleks → halaman `wiki/synthesis/` atau `comparisons/`.
- Permintaan visual → generate diagram Mermaid, Marp slide deck, atau matplotlib
  chart dan simpan di `dashboards/`.
- Chat adalah **temporary**. Wiki adalah **persistent**. Jika tidak ditulis ke file, hilang saat sesi berakhir.

### 8. Format jawaban tergantung pertanyaan
- Pertanyaan faktual sederhana → jawaban ringkas dengan `[[citations]]` + halaman wiki baru.
- Analisis kompleks → tulis halaman wiki baru di `synthesis/` atau `comparisons/`,
  lalu link dari index.
- Permintaan visual → generate diagram Mermaid, Marp slide deck, atau matplotlib
  chart dan simpan di `dashboards/`.

## Workflows

### Ingest Workflow
Ketika manusia taruh sumber di `raw/sources/` dan minta kamu proses:

1. **Baca** sumber secara penuh.
2. **Diskusikan** takeaways dengan manusia — apa yang menarik, apa yang connect
   ke konten wiki existing, apa yang mengejutkan atau kontradiktif.
3. **Tulis** halaman ringkasan sumber di `wiki/sources/`.
4. **Update** halaman entitas relevan di `wiki/entities/`.
5. **Update** halaman konsep relevan di `wiki/concepts/`.
6. **Update** halaman synthesis jika sumber baru mengubah gambaran besar.
7. **Update** `wiki/index.md` dengan semua halaman yang berubah/dibuat.
8. **Append** entry ke `wiki/log.md`.
9. Satu sumber bisa menyentuh 10–15 halaman wiki. itu normal.

### Query Workflow — ATURAN KATAS: SELALI ARSIPKAN JAWABAN

Ketika manusia bertanya, **jangan pernah** jawab hanya di chat. Selalu persist jawaban sebagai halaman wiki.

1. **Baca** `wiki/index.md` untuk temukan halaman relevan.
2. **Baca** halaman yang paling relevan.
3. **Jika jawaban langsung tidak cukup atau tidak tersedia:**
    - Lakukan `web_search` untuk informasi eksternal.
    - ATAU, jika komputasi/derivasi kompleks diperlukan, jalankan **Programmatic Analysis Workflow** (lihat di bawah).
4. **Sintesis** jawaban dengan `[[wikilink]]` citations, menggabungkan konten wiki existing dan fakta yang baru diturunkan.
5. **SELALU file halaman wiki baru** (atau update yang existing) — tanpa exception untuk pertanyaan "sederhana":
   - Lookup faktual → `wiki/sources/` (misal: `huruf-nun-surah-qamar.md`)
   - Analisis/derivasi (dari synthesis atau programmatic analysis) → `wiki/synthesis/`
   - Konsep baru → `wiki/concepts/`
   - Orang/tempat/hal → `wiki/entities/`
6. **Cross-reference** dengan `[[wikilinks]]` ke semua halaman terkait.
7. **Update** `wiki/index.md` dengan halaman baru (jika dibuat/diupdate).
8. **Append** entry ke `wiki/log.md`.

**Wiki adalah memori persisten. Chat adalah temporary. Jika tidak ada di wiki, tidak ada.**

### Lint Workflow
Ketika diminta health-check wiki:

1. Cek **kontradiksi** antar halaman.
2. Cek **halaman orphan** (kurang dari 2 inbound links).
3. Cek **klaim stale** yang mungkin sudah digantikan sumber baru.
4. Cek **halaman hilang** — konsep/entitas penting yang disebut tapi
   belum punya halaman sendiri.
5. Cek **cross-reference hilang** — halaman yang harusnya saling link
   tapi tidak.
6. Sarankan **pertanyaan baru** untuk diselidiki atau **sumber baru** untuk dicari.
7. Temuan ditulis ke halaman lint report di `wiki/synthesis/` dan append ke log.

### Programmatic Analysis Workflow
Ketika pertanyaan butuh kalkulasi kompleks, agregasi data, atau derivasi yang tidak langsung ada di wiki atau mudah ditemukan via web search, manfaatkan code assets yang tersedia:

1.  **Identifikasi Tool Relevan:** Tentukan file TypeScript (misal `generateEnhancedSurah.ts`, `countHarfs.ts`) atau script custom yang dibutuhkan.
2.  **Develop/Modif Script:** Jika perlu, buat script baru (misal `run_analysis.ts`) atau modifikasi yang existing (seperti `run_surah_analysis.ts`) untuk melakukan analisis spesifik.
3.  **Jalankan Script:** Jalankan pakai `ts-node` atau `node dist/`.
4.  **Ekstrak Hasil:** Tangkap output atau baca data yang dihasilkan (misal dari `src/data/enhanced-*.json`).
5.  **Sintesis Temuan:** Interpretasi hasil dan sintesis ke jawaban ringkas.
6.  **File Halaman Wiki Baru (SELALU):** Buat halaman baru di `wiki/synthesis/` atau `wiki/concepts/` (misal `quran-hisab-jummal-overview.md`) yang mendokumentasikan analisis, fakta derivasi, metodologi (link ke file code yang relevan), dan batasan/asumsi.
7.  **Cross-reference:** Link ke halaman wiki existing yang relevan.
8.  **Update `wiki/index.md`:** Tambah halaman baru ke katalog konten.
9.  **Append ke `wiki/log.md`:** Catat operasi programmatic analysis.

## Konvensi

- **Nama halaman**: lowercase, hyphenated (`my-page-name.md`).
- **Wikilinks**: pakai nama file halaman tanpa extension (`[[my-page-name]]`).
- **Tags**: lowercase, no spaces (`#matematika`, `#numerologi`).
- **Tanggal**: ISO 8601 (`YYYY-MM-DD`).
- **Referensi sumber**: selalu cite file sumber raw yang menginformasikan klaim,
  inline atau di frontmatter `sources:`.

## Gaya Komunikasi

- Langsung dan ringkas. Tanpa filler.
- Saat ingest, kasih tahu manusia apa yang akan kamu lakukan sebelum melakukannya.
- Saat membuat/mengupdate halaman, list halaman tersebut agar manusia bisa review.
- Flag hal yang tidak pasti atau ambigu — jangan tebak diam-diam.

---

## Numerologi Mukjizat — Domain Riset

### Cakupan

Domain riset utama wiki ini adalah **mukjizat numerik dan fenomena matematika dalam Al-Quran** (إعجاز العدди). Tujuannya adalah menemukan, memverifikasi, mendokumentasikan, dan menganalisis pola numerik dalam Al-Quran yang menjadi bukti asal ilahinya dan presisi matematisnya.

Wiki ini sudah memulai fokus ini dan harus memperdalamnya. Ini adalah **identitas inti** dari qciphra wiki.

### Kategori Riset

Saat menyelidiki numerologi Quran, cakup kategori-kategori ini:

1. **Hisab Jummal (حساب جمّل)**
   - Nilai huruf Abjad per ayah, per surah, dan total Quran
   - Pola checksum / verifikasi (ganjil/genap, kelipatan, keterbagian)
   - Checksum Basmalah (4 kata × nilai, struktur)
   - Existing: [[hisab-jummal]], [[digital-root]]

2. **Angka 19 — Sistem Angka 19 (سورة المدثر 74:30)**
   - 114 surah = 6 × 19
   - Hitungan Basmalah (112 tanpa nomor + 1 bernomor + 1 surah 27:30) = 114
   - Jumlah huruf, jumlah kata, jumlah ayah yang kelipatan 19
   - Hubungan bilangan prima
   - Existing: [[number-19]], [[digital-root]]

3. **Ganjil-Genap (Pola Odd-Even)**
   - Hubungan ganjil-genap nomor surah + jumlah ayah
   - Total ganjil = total genap = 33.160 (atau ekuivalen)
   - Existing: source `raw/sources/Analisis Teori Ganjil Genap.md`

4. **Fenomena Level Huruf**
   - Jumlah huruf Nun di Surah Al-Qamar (terkait mukjizat jumlah huruf)
   - Distribusi frekuensi huruf spesifik antar surah
   - Surah berhuruf awal (الحروف المقطعة) — pola dalam حسب مز
   - Script existing: `get_nun_count.py`, `count_allah_al_baqara.py`, `countHarfs.ts`

5. **Pola Pengulangan Level Kata**
   - Jumlah "Allah" (2.698 = 2 × 19 × 71)
   - "Rahman", "Rahim", hari (يوم), tahun (سنة) — pasangan semantis yang cocok
   - Jumlah kalimah per surah dan total global
   - Existing: `analyzeKalimahsEnhanced.ts`

6. **Pencatatan Struktural (نظام الإحصائي القرآني)**
   - Pasangan nomor surah + jumlah ayah surah
   - Juz, ruku, halaman — kesejajaran struktural dengan properti numerik
   - Hubungan matematis antar field metadata

7. **Bilangan Prima & Teori Bilangan**
   - Prima dalam struktur Quran (jumlah surah, jumlah ayah, jumlah huruf)
   - Pola digital root
   - Fibonacci, golden ratio, atau barisan lain jika muncul
   - Existing: [[digital-root]], source `Koneksi Prima dan 19.md`

8. **Pola Geometris / Spasial**
   - Pencerminan posisi kata (struktur palindrome)
   - Nilai geometris Quran (حساب الجُمّل diterapkan pada susunan spasial)

9. **Primalogy — Sistem Numerologi Bilangan Prima**
   - Sistem yang menetapkan nilai prima berurutan ke 29 huruf Arab (ا=2, ب=3, ت=5, ث=7, ... غ=107, ء=1) berdasarkan urutan abjad
   - Berbeda dari Hisab Jummal (Abjad) — Primalogy memetakan huruf → prima berurutan, bukan nilai Abjad tradisional
   - Mekanisme validasi utama: hasil additive prime (nilai prima DAN jumlah digit prima)
   - Teruji pada: kata "Allah" (ع+ل+ل+ا = 59+83+83+101 = 269, prima, jumlah digit 17 = additive prime), Al-Fatihah (prima 8317, jumlah digit 19 = additive prime), Al-Ikhlas (prima 4201 dengan Basmalah / 3167 tanpa, keduanya additive primes), Ayat Al-Kursi, ayat berulang Ar-Rahman (فبأي آلاء ربكما تكذبان = 683 = prima ke-124, 124 = 31×4, diulang 31 kali, 4 kata)
   - Koneksi golden ratio: jumlah C+V sums duplicate / jumlah C+V sums unique ≈ 1.618
   - Sumber PDF: `~/Documents/BOOKS/RELIGION/quran-code/Primalogy` (Ali Adams, heliwave.com)
   - Website: heliwave.com — Proyek open source QuranCode di qurancode.com
   - **Ini adalah fokus riset utama** — perluas dan validasi Primalogy ke semua surah dan frasa/kata kunci Quran

### Code Assets yang Tersedia

Script dan data file ini ada di root vault. Gunakan untuk analisis programmatic:

| File | Fungsi |
|---|---|
| `get_nun_count.py` | Hitung nun (ن) di surah spesifik vs total |
| `countHarfs.ts` | Penghitungan frekuensi huruf |
| `count_allah_al_baqara.py` | Hitung "Allah" di Al-Baqarah |
| `analyzeKalimahsEnhanced.ts` | Analisis kalimah enhanced |
| `generateEnhancedSurah.ts` | Generate data surah enhanced |
| `dist/data/ayahs.jsonl` | Data per-ayah: teks, count, nilai hisab |
| `dist/data/kalimahs.jsonl` | Data per-kalimah: teks, nilai hisab |
| `dist/data/harfs.jsonl` | Data per-huruf: karakter, transliterasi, nilai |

Saat menjalankan script:
```bash
npx ts-node <filename>.ts   # untuk TypeScript
python3 <filename>.py        # untuk Python
node dist/data/*.jsonl       # untuk inspeksi data yang dihasilkan
```

### Aturan Metodologi Riset

1. **Menemukan klaim dari sumber eksternal SAJA TIDAK CUKUP.** Verifikasi setiap klaim numerik secara komputasional terhadap data Quran di `dist/data/` jika memungkinkan.

2. **Bedakan tier bukti:**
   - **Tier 1 — Terverifikasi:** Dikonfirmasi secara komputasional dari data Quran raw di repo ini.
   - **Tier 2 — Tertulis:** Dilaporkan oleh beberapa sumber/akademisi kredibel tapi belum diverifikasi di sini.
   - **Tier 3 — Spekulatif:** Pola menarik ditemukan secara komputasional, tetapi interpretasi teologis belum pasti.
   - **Tier 4 — Terbantah:** Klaim sudah dicek dan ditemukan salah atau berbasis data keliru.
   - Setiap halaman temuan numerology HARUS menyatakan tier-nya di frontmatter: `tier: 1 | 2 | 3 | 4`

3. **Cherry-picking adalah jebakan — hadapi secara langsung.**
   - Jika menemukan pola, juga tes: apakah gagal di tempat lain? Berapa base rate? Apakah kriteria seleksi sudah ditentukan sebelumnya?
   - Sertakan bagian "Potensi Keberatan" di halaman temuan signifikan.
   - Bandingkan dengang TIDAK cocok dengan pola, bukan hanya yang cocok.

4. **Hubungkan temuan ke surah/ayah Quran** — cite ayat spesifik (Bismillah, nomor ayah, nama surah). Setiap pola harus bisa ditelusuri ke teks spesifik.

5. **Sistem Hisab Jummal adalah standar:** Gunakan nilai Abjad tradisional (ا=1, ب=2, ج=3, ... غ=1000). Jangan pakai re-scalings modern kecuali secara eksplisit membandingkan sistem.

6. **Nilai huruf Primalogy bersifat tetap:** Gunakan mapping Primalogy (ا=2, ب=3, ت=5, ث=7, ج=11, ح=13, خ=17, د=19, ذ=23, ر=29, ز=31, س=37, ش=41, ص=43, ض=47, ط=53, ظ=59, ع=61, غ=67, ف=71, ق=73, ك=79, ل=83, م=89, ن=97, ه=101, و=103, ي=107, ء=1). Saat membandingkan hasil Primalogy vs Hisab Jummal, selalu sebutkan sistem yang digunakan.

7. **Frontmatter terupdate untuk halaman numerologi:**
   ```yaml
   ---
   title: Judul Temuan
   type: concept | synthesis | source-summary
   tier: 1 | 2 | 3 | 4        # tier bukti (lihat di atas)
   system: abjad | primalogy | hybrid  # sistem numerik yang dipakai
   created: YYYY-MM-DD
   updated: YYYY-MM-DD
   tags: [numerologi, hisab-jummal, primalogy, angka-19, analisis-huruf, ...]
   sources: [source-filename.md]
   surah: [nomor surah yang terlibat, jika ada]
   ---
   ```

### Novel Finding Workflow

Ketika manusia minta kamu mencari pola BARU (bukan hanya verifikasi klaim existing):

1. **Definisikan search space secara eksplisit** — dimensi apa yang kamu scan? (metadata surah, jumlah huruf, frekuensi kata, nilai hisab, nilai primalogy, C+V sums, dll)

2. **Jalankan scan sistematis** — iterasi ke semua 114 surah atau semua ayah. JANGAN cherry-pick surah untuk dites. Jika menemukan sesuatu yang menarik di surah 55, cek apakah juga muncul di surah 1-54 dan 56-114.

3. **Catat base rate** — jika 7 dari 114 surah menunjukkan pola, laporkan: "7/114 = 6.1%". Sebutkan apakah ini signifikan secara statistik.

4. **Cross-validate antar sistem** — jika pola muncul di Hisab Jummal, cek apakah juga muncul di Primalogy. Pola lintas-sistem adalah bukti lebih kuat.

5. **Dokumentasikan hasil negatif** — jika kamu menguji hipotesis dan gagal, tulis catatan singkat. Ini mencegah investigasi redundant di masa depan.

6. **Arsipkan temuan** — buat halaman synthesis dengan: metodologi, hasil lengkap (bukan hanya hits), base rate, potensi keberatan, dan rating tier.

### File Referensi Eksternal

PDF/buku ini tersimpan di luar vault tapi adalah referensi primer. Baca dengan `pdftotext` saat diperlukan:

| File | Penulis | Konten |
|---|---|---|
| `~/Documents/BOOKS/RELIGION/quran-code/Primalogy` | Ali Adams | Sistem Primalogy: nilai prima untuk huruf Arab, validasi additive prime, golden ratio dalam struktur Quran |
| `~/Documents/BOOKS/RELIGION/quran-code/114.pdf` | Ali Adams | Mathematical Structure of the Quran (180 halaman): 7+ sistem valuasi huruf, 114 angka struktur, factorial series, golden ratio, bi-symmetry, statistik additive/non-additive, klasifikasi bilangan, ratusan pola terdokumentasi. Lihat ringkasan: `wiki/sources/114-pdf-summary.md` |
| `~/Documents/BOOKS/RELIGION/quran-code/appendix.pdf` | — | Appendix dengan contoh kode matematika berbasis 19 dari Rashad Khalifa |
| `~/Documents/BOOKS/RELIGION/quran-code/bp.pdf` | Abdullah Arik | Beyond Probability: desain matematika Basmalah (United Submitters International) |

Ekstrak teks: `pdftotext <file> - 2>/dev/null`

### File Sumber Utama

File-file `raw/sources/` ini adalah referensi utama:
- `Angka 19.md` — catatan riset fundamental tentang 19
- `Algoritma Checksum.md` — checksum Basmalah, sistem verifikasi internal
- `Analisis Teori Ganjil Genap.md` — analisis paritas ganjil-genap
- `Koneksi Prima dan 19.md` — koneksi bilangan prima ke angka 19
- `Abjad Numeral.md` — referensi sistem angka Abjad
- `Sejarah Angka Hindu-Arab.md` — konteks historis

### Prioritas Investigasi Baru

Ketanya manusia mau investigasi apa selanjutnya, sarankan dari:

**Fokus Primalogy:**
- Hitung nilai Primalogy untuk semua 114 nama surah — berapa banyak yang additive primes?
- Hitung nilai Primalogy untuk semua Basmalah (bernomor dan tanpa nomor) — ada pola?
- Terapkan Primalogy ke muqatta'at (huruf terpisah) per surah — pola additive prime?
- Hitung nilai Primalogy untuk frasa kunci Quran: Basmalah, Shahada, Tasbih, Tahmid
- Perluas Primalogy ke Ayat Al-Kursi dengan aturan simplifikasi huruf penuh — verifikasi 11261
- Test Primalogy ke semua 99 Nama Allah (Asma ul Husna) — berapa yang menghasilkan additive primes?
- Cross-validate: surah mana yang menunjukkan additive primes di Hisab Jummal DAN Primalogy?

**Angka 19 & Struktural:**
- Jumlah huruf muqatta'at per surah — verifikasi kelipatan 19
- "Hari" (يوم) vs "Tahun" (سنة) total hitungan di seluruh Quran
- Analisis struktur Basmalah di semua 114 surah
- Properti matematika Surah Al-Fatihah (struktur prima 7-29-139)
- Properti numerik struktural Al-Baqarah (surah terpanjang)
- Pasangan tematik lintas-surah dan hubungan numeriknya
- Pola digital root di semua metadata surah
- Signifikansi statistik: seberapa mungkin kebetulan?

**Eksplorasi Baru:**
- Analisis C×V (surah × ayah) — urutkan semua surah berdasarkan C×V, cari pola
- Surah berindeks prima: surah #2, #3, #5, #7, #11... apakah jumlah ayahnya menunjukkan pola prima?
- Pencarian golden ratio: di mana lagi φ ≈ 1.618 muncul di struktur Quran?
- Analisis bi-simetri: C+V sums ganjil/genap (diketahui: 57 genap + 57 ganjil = 114) — perluas ke dimensi lain
