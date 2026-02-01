import type { Metadata } from "next";

import StaggerReveal from "@/components/ui/StaggerReveal";
import type { Locale } from "@/lib/i18n";
import { normalizeLocale, t } from "@/lib/i18n";

/**
 * Terms of Service Page
 * Design V2: Clean, readable legal document
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
    title: tx.legal.termsTitle,
    description: tx.seo.termsDescription,
    alternates: {
      canonical: `/${resolved}/terms`,
      languages: {
        en: "/en/terms",
        id: "/id/terms",
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tx = t(locale);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <StaggerReveal delay={0.1} className="mb-12">
          <p className="type-kicker text-muted mb-4">{tx.footer.legal}</p>
          <h1 className="type-h1 text-foreground mb-4">{tx.legal.termsTitle}</h1>
          <p className="type-data text-muted">{tx.legal.termsPolicy.intro.prefix}</p>
        </StaggerReveal>

        <p className="type-body text-foreground-muted mb-10">
          {tx.legal.termsPolicy.intro.body}
        </p>

        <div className="prose prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.termsPolicy.sections.websiteUse.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.termsPolicy.sections.websiteUse.body}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.termsPolicy.sections.noPublicPricing.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.termsPolicy.sections.noPublicPricing.body}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.termsPolicy.sections.limitations.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.termsPolicy.sections.limitations.body}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.termsPolicy.sections.changes.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.termsPolicy.sections.changes.body}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
