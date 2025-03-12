
import { SupportedLanguage } from "@/types";
import { TranslationKeys } from "./types";
import { enTranslations } from "./en";
import { esTranslations } from "./es";
import { trTranslations } from "./tr";

export const translations: Record<SupportedLanguage, TranslationKeys> = {
  en: enTranslations,
  es: esTranslations,
  tr: trTranslations
};

export * from "./types";
