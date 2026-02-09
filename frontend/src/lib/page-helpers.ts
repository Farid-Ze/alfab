import { type Locale, isValidLocale, t } from "@/lib/i18n";
import type { Metadata } from "next";

/**
 * Page key type — must match keys in messages/{locale}.json `pages` object.
 */
export type PageKey = "home" | "about" | "contact" | "education" | "partnership" | "privacy" | "products" | "terms";

interface PageMeta {
    title: string;
    description: string;
}

/**
 * Resolve a valid locale from route params, falling back to "id".
 */
export function resolveLocale(locale: string): Locale {
    return isValidLocale(locale) ? locale : "id";
}

/**
 * Get page metadata from i18n messages for a given page key.
 */
export function getPageMeta(locale: Locale, pageKey: PageKey): PageMeta {
    const translations = t(locale);
    const pages = translations.pages as Record<string, PageMeta>;
    return pages[pageKey] ?? { title: pageKey, description: "" };
}

/**
 * Generate Next.js Metadata for a maintenance page.
 * Reduces boilerplate across all page files.
 *
 * Usage:
 * ```ts
 * export const generateMetadata = createMaintenanceMetadata("about");
 * ```
 */
export function createMaintenanceMetadata(pageKey: PageKey) {
    return async function generateMetadata({
        params,
    }: {
        params: Promise<{ locale: string }>;
    }): Promise<Metadata> {
        const { locale } = await params;
        const validLocale = resolveLocale(locale);
        const page = getPageMeta(validLocale, pageKey);
        return { title: page.title, description: page.description };
    };
}
