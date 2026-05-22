// 🔠 Normalization map for Arabic letter variants
export const HARF_NORMALIZATION: Record<string, string> = {
  ٱ: "ا", // Hamza Wasla → Alif
  آ: "ا", // Alif Madda → Alif
  أ: "ا", // Hamza Above Alif → Alif
  إ: "ا", // Hamza Below Alif → Alif
  ء: "ا", // Hamza → Alif
  ى: "ي", // Alif Maqsura → Ya
  ئ: "ي", // Hamza Above Ya → Ya
  ة: "ه", // Ta Marbuta → Ha
};
