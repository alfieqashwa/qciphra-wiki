
#### Tujuh Surah yang memiliki urutan dan jumlah ayat prima

┌───┬────────┬────────────┬───────────────┬──────────┐
│   │ number │ name       │ numberOfAyahs │ nthPrime │
├───┼────────┼────────────┼───────────────┼──────────┤
│ 0 │ 13     │ Ar-Ra'd    │ 43            │ 191      │
│ 1 │ 43     │ Az-Zukhruf │ 89            │ 461      │
│ 2 │ 97     │ Al-Qadr    │ 5             │ 11       │
│ 3 │ 101    │ Al-Qaari'a │ 11            │ 31       │
│ 4 │ 103    │ Al-Asr     │ 3             │ 5        │
│ 5 │ 107    │ Al-Maa'un  │ 7             │ 17       │
│ 6 │ 113    │ Al-Falaq   │ 5             │ 11       │
└───┴────────┴────────────┴───────────────┴──────────┘

---
#### Kalkulasi Akumulasi

┌────────────────┬────────┬───────────────┬──────────┬──────────┐
│                │ number │ numberOfAyahs │ nthPrime │ totalLen │
├────────────────┼────────┼───────────────┼──────────┼──────────┤
│ calcPrimeSurah │ 577    │ 163           │ 727      │ 7        │
└────────────────┴────────┴───────────────┴──────────┴──────────┘

> [!info] ALL NUMBERS ARE PRIME

---
#### Code

```ts
import { getNthPrime } from "./lib/getNthPrime";
import { isPrime } from "./lib/isPrime";

const URL = `https://api.alquran.cloud/v1/surah`;

interface ApiResponse {
  code: number;
  status: string;
  data: SurahData[];
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: number;
  numberOfAyahs: number;
  revelationType: string;
}

async function fetchSurah() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const { status, data } = (await response.json()) as ApiResponse;
    if (status !== "OK") throw new Error("Response status NOT OK!");

    return data;
  } catch (err) {
    throw err instanceof Error ? err : new Error(String(err));
  }
}

const surahData = await fetchSurah();

const primeSurahs = surahData
  .filter((s) => isPrime(s.number) && isPrime(s.numberOfAyahs))
  .map((s) => ({
    number: s.number,
    name: s.englishName,
    numberOfAyahs: s.numberOfAyahs,
    nthPrime: getNthPrime(s.numberOfAyahs),
  }));

console.table(primeSurahs);

const calcPrimeSurah = primeSurahs.reduce(
  (acc, s) => {
    acc.number += s.number;
    acc.numberOfAyahs += s.numberOfAyahs;
    acc.nthPrime += s.nthPrime;
    acc.totalLen++;
    return acc;
  },
  {
    number: 0,
    numberOfAyahs: 0,
    nthPrime: 0,
    totalLen: 0,
  },
);

console.table({ calcPrimeSurah });
```

---
