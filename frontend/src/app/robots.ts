import type { MetadataRoute } from "next";

/**
 * Dynamic Robots.txt
 * 
 * Generates robots.txt for search engine crawlers
 * Per paket-a.md SEO requirements (A4-02)
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alfabeauty.co.id/";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/admin/",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
