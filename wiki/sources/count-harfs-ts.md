---
title: countHarfs.ts — Penghitungan Huruf
type: source-summary
created: 2026-05-27
updated: 2026-05-27
tags: [typescript, counting, aggregation, code]
sources: [countHarfs.ts]
---

# countHarfs.ts — Penghitungan Huruf

_File TypeScript yang menghitung frekuensi setiap huruf (bentuk normalized) dari array kalimah._

## Fungsi

```typescript
export function countHarfs(kalimahs: EnhancedKalimah[]) {
  const map: Record<string, number> = {};

  for (const kalimah of kalimahs) {
    for (const harf of kalimah.harfs ?? []) {
      const normalized = harf.normalizedHarf;
      map[normalized] = (map[normalized] || 0) + 1;
    }
  }

  return Object.keys(map).map((char) => ({ char, count: map[char] }));
}
```

## Cara Kerja

1. **Input**: Array `EnhancedKalimah[]` (semua kata dalam satu ayat)
2. **Iterasi**: Loop setiap kata → loop setiap huruf dalam kata
3. **Normalisasi**: Menggunakan `harf.normalizedHarf` (bentuk canonical, bukan huruf asli)
4. **Akumulasi**: Menghitung frekuensi per huruf normalized
5. **Output**: Array `{ char, count }[]`

## Contoh Output

Untuk ayat Al-Fatihah pertama (بسم الله الرحمن الرحيم):

```json
[
  { "char": "ب", "count": 1 },
  { "char": "س", "count": 1 },
  { "char": "م", "count": 3 },
  { "char": "ا", "count": 3 },
  { "char": "ل", "count": 4 },
  { "char": "ه", "count": 1 },
  { "char": "ر", "count": 2 },
  { "char": "ح", "count": 2 },
  { "char": "ن", "count": 1 },
  { "char": "ي", "count": 1 }
]
```

## Penggunaan

Dipanggil di `generateEnhancedSurah.ts` untuk setiap ayat:

```typescript
const harfCounts = countHarfs(kalimahs);
```

Hasilnya disimpan di field `harfCounts` pada `EnhancedAyah`, yang kemudian di-export ke JSON.

## Terkait

- [[generate-enhanced-surah-ts]] — fungsi yang memanggil countHarfs
- [[analyze-kalimahs-enhanced-ts]] — menghasilkan kalimah yang dihitung
- [[types-ts]] — interface EnhancedKalimah dan EnhancedHarf
- [[normalization-ts]] — normalisasi huruf yang digunakan untuk pengelompokan
