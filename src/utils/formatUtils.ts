
import { FormattingOptions } from "@/types";

/**
 * Format text to uppercase if needed
 */
export const formatText = (text: string, options?: FormattingOptions): string => {
  if (!text) return text;
  
  // Always convert to uppercase
  return text.toUpperCase();
};

/**
 * Format numbers with comma as decimal separator and dot as thousands separator
 */
export const formatNumberWithEuropeanStyle = (value: number | string, options?: FormattingOptions): string => {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  
  if (!options?.formatNumber) {
    return String(value);
  }
  
  try {
    const num = typeof value === "string" ? parseFloat(value) : value;
    // Format with comma for decimals and dot for thousands
    return num.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    console.error("Error formatting number:", error);
    return String(value);
  }
};

/**
 * Parse European format number (comma decimal separator) to number
 */
export const parseEuropeanNumber = (value: string): number => {
  if (!value) return 0;
  
  // Replace dots (thousands separator) and convert comma (decimal separator) to dot
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized);
};

/**
 * Ensure input text is always uppercase
 */
export const ensureUppercase = (text: string): string => {
  return text.toUpperCase();
};
