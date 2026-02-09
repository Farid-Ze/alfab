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
 * Default locale — aligned with middleware (Indonesian default for B2B Indonesia)
 */
export const defaultLocale: Locale = "id";

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

/**
 * Get a translation value from a dot-separated key path
 * e.g. getTranslation(translations, "footer.sections.products")
 */
export function getTranslation(translations: Record<string, unknown>, keyPath: string): string {
    const keys = keyPath.split(".");
    let value: unknown = translations;

    for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
            value = (value as Record<string, unknown>)[key];
        } else {
            return keyPath;
        }
    }

    return typeof value === "string" ? value : keyPath;
}
