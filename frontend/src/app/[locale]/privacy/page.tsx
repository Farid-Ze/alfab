import type { Metadata } from "next";

import StaggerReveal from "@/components/ui/StaggerReveal";
import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";
import type { Locale } from "@/lib/i18n";
import { normalizeLocale, t } from "@/lib/i18n";

/**
 * Privacy Policy Page
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
    title: tx.legal.privacyTitle,
    description: tx.seo.privacyDescription,
    alternates: {
      canonical: `/${resolved}/privacy`,
      languages: {
        en: "/en/privacy",
        id: "/id/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tx = t(locale);

  return (
    <Page>
      <Container size="narrow">
        <StaggerReveal delay={0.1} className="mb-12">
          <p className="type-kicker text-muted mb-4">{tx.footer.legal}</p>
          <h1 className="type-h1 text-foreground mb-4">{tx.legal.privacyTitle}</h1>
          <p className="type-data text-muted">{tx.legal.privacyPolicy.intro.prefix}</p>
        </StaggerReveal>

        <p className="type-body text-foreground-muted mb-10">
          {tx.legal.privacyPolicy.intro.body}
        </p>

        <div className="prose prose-zinc max-w-none">
          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.privacyPolicy.sections.informationWeCollect.title}
            </h2>
            <ul className="list-disc pl-6 type-body text-foreground-muted space-y-2">
              {tx.legal.privacyPolicy.sections.informationWeCollect.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.privacyPolicy.sections.howWeUse.title}
            </h2>
            <ul className="list-disc pl-6 type-body text-foreground-muted space-y-2">
              {tx.legal.privacyPolicy.sections.howWeUse.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.privacyPolicy.sections.storageSecurity.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.privacyPolicy.sections.storageSecurity.body}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.privacyPolicy.sections.cookies.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.privacyPolicy.sections.cookies.body}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="type-h3 text-foreground mb-4">
              {tx.legal.privacyPolicy.sections.contact.title}
            </h2>
            <p className="type-body text-foreground-muted">
              {tx.legal.privacyPolicy.sections.contact.body}
            </p>
          </section>
        </div>
      </Container>
    </Page>
  );
}
