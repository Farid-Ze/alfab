import type { Metadata } from "next";

import StaggerReveal from "@/components/ui/StaggerReveal";
import ProductFilters from "@/components/products/ProductFilters";
import { normalizeLocale, t } from "@/lib/i18n";

/**
 * Products Page
 * Design V2: Bento Grid layout with floating filter bar
 * Migrated from (v2) to production route.
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
    title: tx.nav.products,
    description: tx.seo.productsDescription,
    alternates: {
      canonical: `/${resolved}/products`,
      languages: {
        en: "/en/products",
        id: "/id/products",
      },
    },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const dict = t(resolved);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <StaggerReveal delay={0.1} className="mb-12">
          <p className="type-kicker text-muted mb-4">{dict.products.kicker}</p>
          <h1 className="type-h1 text-foreground mb-4">
            {dict.products.heroTitle}
          </h1>
          <p className="type-body text-foreground-muted max-w-2xl">
            {dict.products.heroBody}
          </p>
        </StaggerReveal>

        {/* Dynamic Product Grid with Filters */}
        <ProductFilters />
      </div>
    </main>
  );
}
