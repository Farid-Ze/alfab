"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";

function IconTarget(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutContent() {
  const { locale } = useLocale();
  const copy = t(locale);
  const base = `/${locale}`;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="type-kicker">{copy.nav.about}</p>
        <h1 className="type-h1">{copy.about.title}</h1>
        <p className="type-body text-muted-strong">{copy.about.body}</p>
      </header>

      {/* Mission & Vision */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center bg-foreground text-background rounded-full">
              <IconTarget className="h-6 w-6" />
            </span>
            <h2 className="type-h3">Our Mission</h2>
          </div>
          <p className="type-body text-muted-strong">
            To provide professional beauty partners with premium cosmetic products and comprehensive business support, enabling their success in the beauty industry.
          </p>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center bg-foreground text-background rounded-full">
              <IconEye className="h-6 w-6" />
            </span>
            <h2 className="type-h3">Our Vision</h2>
          </div>
          <p className="type-body text-muted-strong">
            To become Indonesia&apos;s leading B2B beauty distribution platform, recognized for quality products, reliable service, and empowering partnerships.
          </p>
        </Card>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <h2 className="type-h2 text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center space-y-4 p-6">
            <span className="inline-flex h-14 w-14 items-center justify-center bg-subtle border border-border rounded-full mx-auto">
              <IconShield className="h-7 w-7" />
            </span>
            <h3 className="type-h3">Quality</h3>
            <p className="type-body text-muted-strong">
              We curate only the finest cosmetic products that meet international standards.
            </p>
          </div>
          <div className="text-center space-y-4 p-6">
            <span className="inline-flex h-14 w-14 items-center justify-center bg-subtle border border-border rounded-full mx-auto">
              <IconHeart className="h-7 w-7" />
            </span>
            <h3 className="type-h3">Partnership</h3>
            <p className="type-body text-muted-strong">
              We grow together with our partners, providing education and continuous support.
            </p>
          </div>
          <div className="text-center space-y-4 p-6">
            <span className="inline-flex h-14 w-14 items-center justify-center bg-subtle border border-border rounded-full mx-auto">
              <IconTarget className="h-7 w-7" />
            </span>
            <h3 className="type-h3">Excellence</h3>
            <p className="type-body text-muted-strong">
              We strive for operational excellence in every aspect of our business.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-foreground text-background p-8 lg:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="type-h1 text-background">500+</p>
            <p className="type-data text-background/70">Products</p>
          </div>
          <div className="space-y-2">
            <p className="type-h1 text-background">5000+</p>
            <p className="type-data text-background/70">Partners</p>
          </div>
          <div className="space-y-2">
            <p className="type-h1 text-background">34</p>
            <p className="type-data text-background/70">Provinces</p>
          </div>
          <div className="space-y-2">
            <p className="type-h1 text-background">10+</p>
            <p className="type-data text-background/70">Years Experience</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <h2 className="type-h2">Ready to Partner With Us?</h2>
        <p className="type-body text-muted-strong">
          Join thousands of beauty professionals who trust Alfa Beauty for their business needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href={`${base}/partnership/become-partner`} variant="primary" size="lg">
            {copy.cta.becomePartner}
          </ButtonLink>
          <ButtonLink href={`${base}/contact`} variant="secondary" size="lg">
            {copy.nav.contact}
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
