import { MetadataRoute } from "next";

/**
 * Enterprise Robots.txt (ITIL Knowledge Management)
 * Explicitly controls crawler access.
 * - Allows: Google, Bing (Search Engines)
 * - Blocks: GPTBot, CCBot (AI Scrapers - IP Protection)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alfabeauty.co.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/", "/_next/"],
      },
      {
        userAgent: ["GPTBot", "CCBot", "ChatGPT-User"],
        disallow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
