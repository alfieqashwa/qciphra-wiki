// Letter type definition
export type LetterType = "DARK" | "LIGHT" | "NEUTRAL"

// Letter information interface
export interface HarfInfo {
	harf: string
	value: number // Abjad/Jummal value
	type: LetterType // Letter classification
	special?: boolean // Special case
}

// Hisab Jummal Map with letter type information
export const ABJAD_MAP: HarfInfo[] = [
	// Light Letters
	{ harf: "ا", value: 1, type: "LIGHT" }, // Alif
	{ harf: "ه", value: 5, type: "LIGHT" }, // Ha'
	{ harf: "ح", value: 8, type: "LIGHT" }, // Ha
	{ harf: "ط", value: 9, type: "LIGHT" }, // Tha
	{ harf: "ي", value: 10, type: "LIGHT" }, // Ya
	{ harf: "ك", value: 20, type: "LIGHT" }, // Kaf
	{ harf: "ل", value: 30, type: "LIGHT" }, // Lam
	{ harf: "م", value: 40, type: "LIGHT" }, // Mim
	{ harf: "ن", value: 50, type: "LIGHT" }, // Nun
	{ harf: "س", value: 60, type: "LIGHT" }, // Sin
	{ harf: "ع", value: 70, type: "LIGHT" }, // Ain
	{ harf: "ص", value: 90, type: "LIGHT" }, // Shod
	{ harf: "ق", value: 100, type: "LIGHT" }, // Qaf
	{ harf: "ر", value: 200, type: "LIGHT" }, // Ra

	// Dark Letters
	{ harf: "ج", value: 3, type: "DARK" }, // Jim
	{ harf: "ز", value: 7, type: "DARK" }, // Zay
	{ harf: "ف", value: 80, type: "DARK" }, // Fa
	{ harf: "ش", value: 300, type: "DARK" }, // Syin
	{ harf: "ث", value: 500, type: "DARK" }, // Tsa
	{ harf: "خ", value: 600, type: "DARK" }, // Kha
	{ harf: "ظ", value: 900, type: "DARK" }, // Dzha

	// Neutral Letters
	{ harf: "ب", value: 2, type: "NEUTRAL" }, // Ba
	{ harf: "د", value: 4, type: "NEUTRAL" }, // Dal
	{ harf: "و", value: 6, type: "NEUTRAL" }, // Waw
	{ harf: "ت", value: 400, type: "NEUTRAL" }, // Ta
	{ harf: "ذ", value: 700, type: "NEUTRAL" }, // Dzal
	{ harf: "ض", value: 800, type: "NEUTRAL" }, // Dhad
	{ harf: "غ", value: 1000, type: "NEUTRAL" }, // Ghain

	// Special cases (variants of Alif)
	{ harf: "ء", value: 1, type: "LIGHT", special: true }, // Hamza
	{ harf: "ئ", value: 10, type: "LIGHT", special: true }, // Hamza Above Ya
	{ harf: "ة", value: 5, type: "LIGHT", special: true }, // Ta Marbuta
]

export const ABJAD_LOOKUP = Object.fromEntries(
	ABJAD_MAP.map((h) => [h.harf, h]),
)

interface HarfCountInput {
	char: string
	count: number
}

export function enrichHarfCounts(
	harfCounts: Record<string, HarfCountInput> | HarfCountInput[],
) {
	const list = Array.isArray(harfCounts)
		? harfCounts
		: Object.values(harfCounts)

	return list.map((harf) => {
		const info = ABJAD_LOOKUP[harf.char] ?? {}

		return {
			...harf,
			type: info.type ?? "NEUTRAL",
			value: info.value ?? 0,
			info: info.harf ?? null,
		}
	})
}

export function convertHarfValueListToKalimah(list: number[]) {
	return list
		.map((value) => ABJAD_MAP.find((entry) => entry.value === value)?.harf)
		.filter(Boolean)
		.join("")
}

export function convertKalimahToHarfValueList(kalimah: string) {
	return kalimah
		.split("")
		.map((harf) => ABJAD_MAP.find((entry) => entry.harf === harf)?.value ?? 0)
}
