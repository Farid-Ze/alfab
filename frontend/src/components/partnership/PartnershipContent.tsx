"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import { t } from "@/lib/i18n";

function IconCube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAcademic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBuilding(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0V21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  );
}

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

const ICONS = [IconCube, IconAcademic, IconBuilding];

export default function PartnershipContent() {
  const { locale } = useLocale();
  const copy = t(locale);
  const base = `/${locale}`;

  const cards = [copy.partnership.cards.curated, copy.partnership.cards.education, copy.partnership.cards.b2b];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="type-kicker">{copy.nav.partnership}</p>
        <h1 className="type-h1">{copy.partnership.title}</h1>
        <p className="type-body text-muted-strong">{copy.partnership.lede}</p>
      </header>

      {/* Benefits Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {cards.map((card, idx) => {
          const Icon = ICONS[idx];
          return (
            <Card key={card.title} className="p-8 space-y-4 group hover:border-muted-strong transition-colors">
              <span className="inline-flex h-14 w-14 items-center justify-center bg-foreground text-background rounded-full group-hover:scale-105 transition-transform">
                <Icon className="h-7 w-7" />
              </span>
              <h2 className="type-h3">{card.title}</h2>
              <p className="type-body text-muted-strong">{card.body}</p>
            </Card>
          );
        })}
      </section>

      {/* Features List */}
      <section className="border-y border-border py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Premium curated products",
            "Competitive B2B pricing",
            "Professional training",
            "Dedicated support",
            "Marketing materials",
            "Flexible payment terms",
            "Loyalty rewards program",
            "Nationwide coverage",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center bg-foreground text-background rounded-full shrink-0">
                <IconCheck className="h-3.5 w-3.5" />
              </span>
              <span className="type-body">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="type-h2 text-background">{copy.partnership.readyBlock.title}</h2>
            <p className="type-body text-background/80">{copy.partnership.readyBlock.body}</p>
          </div>
          <div className="shrink-0">
            <ButtonLink 
              href={`${base}/partnership/become-partner`}
              variant="secondary"
              size="lg"
              className="bg-background text-foreground hover:bg-subtle border-background inline-flex items-center gap-2 group"
            >
              {copy.cta.becomePartner}
              <IconArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
