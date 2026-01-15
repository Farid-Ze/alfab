"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

export default function ProductsHeader() {
  const { locale } = useLocale();
  const copy = t(locale);

  return (
    <header className="space-y-6 text-center max-w-3xl mx-auto">
      <p className="type-kicker">{copy.nav.products}</p>
      <h1 className="type-h1">{copy.products.title}</h1>
      <p className="type-body text-muted-strong">{copy.products.lede}</p>
    </header>
  );
}
