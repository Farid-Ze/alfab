import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import { normalizeLocale, t } from "@/lib/i18n";

/**
 * Homepage - PT Alfa Beauty Cosmetica
 * 
 * REBUILD IN PROGRESS
 * Previous sections have been removed for agency-level rebuild.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return {
    title: tx.nav.home,
    description: tx.seo.homeDescription,
    alternates: {
      canonical: `/${resolved}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
          HOMEPAGE SECTIONS - REBUILD IN PROGRESS
          
          Sections to be rebuilt:
          1. Hero Section
          2. Introduction
          3. Services/Solutions
          4. Brands Showcase
          5. Education Highlights
          6. Call to Action
         ═══════════════════════════════════════════════════════════════ */}

      {/* Temporary Placeholder */}
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="type-h1 text-foreground">
            {tx.nav.home}
          </h1>
          <p className="type-body text-muted">
            Homepage under construction
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
