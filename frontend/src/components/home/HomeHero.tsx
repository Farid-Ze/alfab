"use client";

import ButtonLink from "@/components/ui/ButtonLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

export default function HomeHero() {
  const { locale } = useLocale();
  const copy = t(locale);

  return (
    <section className="border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
      <div className="max-w-3xl space-y-5">
        <p className="type-kicker">{copy.home.hero.kicker}</p>
        <h1 className="type-h1">{copy.home.hero.title}</h1>
        <p className="type-lede">{copy.home.hero.lede}</p>

        <ul className="list-disc space-y-1 pl-5 type-body text-zinc-700">
          {copy.home.hero.points.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/products" variant="primary">
            {copy.cta.exploreProducts}
          </ButtonLink>
          <ButtonLink href="/partnership/become-partner" variant="secondary">
            {copy.cta.becomePartner}
          </ButtonLink>
        </div>
        <p className="type-data">{copy.home.hero.note}</p>
      </div>
    </section>
  );
}
