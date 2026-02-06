import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";
import { normalizeLocale, t } from "@/lib/i18n";
import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return {
    title: tx.legal.securityTitle,
    description: tx.seo.securityPolicyDescription,
    alternates: {
      canonical: `/${resolved}/security-policy`,
      languages: {
        en: "/en/security-policy",
        id: "/id/security-policy",
      },
    },
  };
}

export default async function SecurityPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tx = t(locale);

  return (
    <Page>
      <Container className="max-w-4xl">
        <div className="prose prose-zinc max-w-none">
          <h1 className="type-h1 mb-content">{tx.legal.securityTitle}</h1>

          <section className="space-y-4 mb-section">
            <h2 className="type-h2">{tx.legal.securityPolicy.sections.disclosure.title}</h2>
            <p className="type-body">
              {tx.legal.securityPolicy.intro.body}
            </p>
            <p className="type-body">
              {tx.legal.securityPolicy.sections.disclosure.body}{" "}
              <a href="mailto:alfabeautycosmeticaa@gmail.com" className="text-foreground underline">alfabeautycosmeticaa@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-4 mb-section">
            <h2 className="type-h2">{tx.legal.securityPolicy.sections.guidelines.title}</h2>
            <ul className="list-disc pl-5 type-body space-y-2">
              {tx.legal.securityPolicy.sections.guidelines.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 mb-section">
            <h2 className="type-h2">{tx.legal.securityPolicy.sections.safeHarbor.title}</h2>
            <p className="type-body">
              {tx.legal.securityPolicy.sections.safeHarbor.body}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="type-h2">{tx.legal.securityPolicy.sections.response.title}</h2>
            <p className="type-body">
              {tx.legal.securityPolicy.sections.response.body}
            </p>
          </section>
        </div>
      </Container>
    </Page>
  );
}
