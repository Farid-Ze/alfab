import type { MetadataRoute } from "next";

/**
 * Dynamic Sitemap
 * 
 * Generates sitemap.xml for search engines
 * Per paket-a.md SEO requirements (A4-02)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alfabeauty.co.id/";
    const lastModified = new Date();

    // Core pages for each locale
    const locales = ["en", "id"];
    const pages = [
        "", // homepage
        "/products",
        "/education",
        "/partnership",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Generate entries for each locale
    for (const locale of locales) {
        for (const page of pages) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified,
                changeFrequency: page === "" ? "weekly" : "monthly",
                priority: page === "" ? 1.0 : 0.8,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${page}`,
                        id: `${baseUrl}/id${page}`,
                    },
                },
            });
        }
    }

    return sitemapEntries;
}
