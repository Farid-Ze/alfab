/**
 * i18n Library
 * 
 * Simple translation helper for bilingual EN/ID support
 */

import en from "../../messages/en.json";
import id from "../../messages/id.json";

export type Locale = "en" | "id";

const messages = { en, id } as const;

/**
 * Get translations for a given locale
 */
export function getTranslations(locale: Locale) {
    return messages[locale] ?? messages.en;
}

/**
 * Type-safe translation getter
 */
export function t(locale: Locale) {
    return getTranslations(locale);
}

/**
 * Get all supported locales
 */
export const locales: Locale[] = ["en", "id"];

/**
 * Default locale
 */
export const defaultLocale: Locale = "en";

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}
