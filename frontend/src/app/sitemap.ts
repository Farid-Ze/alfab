import type { MetadataRoute } from "next";

import { allProductSlugs } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/products",
    "/education",
    "/partnership",
    "/partnership/become-partner",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...allProductSlugs().map((slug) => ({
      url: `${siteUrl}/products/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
