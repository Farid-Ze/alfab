import { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Enterprise Robots.txt (ITIL Knowledge Management)
 * Explicitly controls crawler access.
 * - Allows: Google, Bing (Search Engines)
 * - Blocks: GPTBot, CCBot (AI Scrapers - IP Protection)
 */
export default function robots(): MetadataRoute.Robots {
  // TOGAF: Centralized Configuration (Phase 2)
  // URL is strictly derived from env.ts (which handles Vercel preview URLs logic)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/", "/_next/", "/api/leads/export"],
      },
      {
        userAgent: ["GPTBot", "CCBot", "ChatGPT-User"],
        disallow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
