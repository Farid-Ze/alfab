import type { Metadata } from "next";

import StaggerReveal from "@/components/ui/StaggerReveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Page from "@/components/layout/Page";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { normalizeLocale, t } from "@/lib/i18n";

/**
 * About Page
 * Design V2: Editorial layout with story sections
 * Uses design tokens for consistent spacing
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
    title: tx.nav.about,
    description: tx.seo.aboutDescription,
    alternates: {
      canonical: `/${resolved}/about`,
      languages: {
        en: "/en/about",
        id: "/id/about",
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);

  return (
    <Page>
      <Container>
        {/* Hero */}
        <StaggerReveal delay={0.1} className="mb-section max-w-4xl">
          <p className="type-kicker text-muted mb-content">About Us</p>
          <h1 className="type-hero text-foreground mb-content">
            More Than a Distributor
          </h1>
          <p className="type-hero-body text-foreground-muted">
            PT Alfa Beauty Cosmetica is a professional haircare distribution company with more than 18 years of experience serving Indonesia&apos;s salon & barber industry.
          </p>
        </StaggerReveal>

        {/* Story Section 1 */}
        <Section as="div" spacing="none" className="grid lg:grid-cols-2 gap-section items-center mb-section">
          <div
            className="aspect-square ui-radius-card bg-gradient-to-br from-subtle to-subtle-hover ui-shadow-elegant"
          />
          <StaggerReveal delay={0.2}>
            <h2 className="type-h2 text-foreground mb-content">Our Story</h2>
            <p className="type-body text-foreground-muted mb-content">
              Founded with a vision to bring world-class professional haircare to Indonesia,
              PT Alfa Beauty Cosmetica has grown from a small importer to one of the nation&apos;s
              leading distributors of premium salon & barber brands.
            </p>
            <p className="type-body text-foreground-muted">
              We believe that great hair starts with great products. That&apos;s why we partner
              exclusively with brands that share our commitment to quality, innovation, and
              professional excellence.
            </p>
          </StaggerReveal>
        </Section>

        {/* Story Section 2 */}
        <Section as="div" spacing="none" className="grid lg:grid-cols-2 gap-section items-center mb-section">
          <StaggerReveal delay={0.2} className="lg:order-2">
            <h2 className="type-h2 text-foreground mb-content">Our Mission</h2>
            <p className="type-body text-foreground-muted mb-content">
              To empower Indonesian salon & barber professionals with access to the world&apos;s finest
              haircare products and the knowledge to use them effectively.
            </p>
            <p className="type-body text-foreground-muted">
              We don&apos;t just distribute products—we build brands, educate professionals,
              and support the sustainable growth of the salon & barber industry.
            </p>
          </StaggerReveal>
          <div
            className="aspect-square ui-radius-card bg-gradient-to-br from-subtle to-subtle-hover lg:order-1 ui-shadow-elegant"
          />
        </Section>

        {/* Values */}
        <Section as="div" spacing="none" className="pad-content-lg ui-radius-card bg-panel mb-section ui-shadow-elegant">
          <StaggerReveal delay={0.1}>
            <h2 className="type-h2 text-foreground mb-content-lg text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-content">
              {[
                { icon: "🤝", title: "Trust", desc: "We build relationships based on integrity and reliability." },
                { icon: "📚", title: "Education", desc: "We invest in knowledge sharing and professional development." },
                { icon: "🌱", title: "Growth", desc: "We support sustainable success for our partners and their clients." },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <div className="type-h1 mb-content-sm">{value.icon}</div>
                  <h3 className="type-h3 text-foreground mb-2">{value.title}</h3>
                  <p className="type-body text-muted">{value.desc}</p>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </Section>

        {/* CTA */}
        <Section as="div" spacing="none" className="text-center">
          <StaggerReveal>
            <h2 className="type-h2 text-foreground mb-content-sm">Ready to Partner?</h2>
            <p className="type-body text-muted mb-content">
              Join our network of professional salon & barber businesses and distributors.
            </p>
            <ButtonLink
              href={`/${resolved}/partnership`}
              variant="primary"
              size="lg"
              className="transition-all-elegant"
            >
              Become a Partner
            </ButtonLink>
          </StaggerReveal>
        </Section>
      </Container>
    </Page>
  );
}
