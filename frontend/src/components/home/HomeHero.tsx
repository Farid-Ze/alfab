"use client";

import ButtonLink from "@/components/ui/ButtonLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

export default function HomeHero() {
  const { locale } = useLocale();
  const copy = t(locale);
  const base = `/${locale}`;

  return (
    <section className="border border-border bg-background">
      {/* Main Hero Content */}
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-4">
            <p className="type-kicker inline-flex items-center gap-2">
              <span className="h-1 w-6 bg-foreground" aria-hidden="true" />
              {copy.home.hero.kicker}
            </p>
            <h1 className="type-h1">{copy.home.hero.title}</h1>
          </div>

          <p className="type-lede max-w-2xl">{copy.home.hero.lede}</p>

          <ul className="space-y-3 type-body">
            {copy.home.hero.points.map((x) => (
              <li key={x} className="flex gap-3 items-start group">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10">
                  <IconCheck className="h-3.5 w-3.5 text-foreground" />
                </span>
                <span className="text-muted-strong group-hover:text-foreground transition-colors">{x}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <ButtonLink href={`${base}/products`} variant="primary" size="lg">
              {copy.cta.exploreProducts}
            </ButtonLink>
            <ButtonLink href={`${base}/partnership/become-partner`} variant="secondary" size="lg">
              {copy.cta.becomePartner}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Note Bar */}
      <div className="border-t border-border bg-subtle px-6 py-4 sm:px-10 lg:px-12">
        <p className="type-data text-muted-strong flex items-center gap-2">
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
          </svg>
          {copy.home.hero.note}
        </p>
      </div>
    </section>
  );
}
