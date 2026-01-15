"use client";

import { listProducts } from "@/lib/catalog";
import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import { t } from "@/lib/i18n";

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L7.44 7.5 4.22 4.28a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
    </svg>
  );
}

export default function ProductHighlights() {
  const { locale } = useLocale();
  const tx = t(locale);
  const products = listProducts().slice(0, 3);
  const base = `/${locale}`;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="type-h3">{tx.products.highlights.title}</h2>
          <p className="type-body max-w-lg">{tx.products.highlights.lede}</p>
        </div>
        <AppLink
          href={`${base}/products`}
          className="group inline-flex items-center gap-1.5 type-data-strong text-foreground hover:underline underline-offset-4"
        >
          {tx.products.highlights.viewAll}
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </AppLink>
      </div>

      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {products.map((p, i) => (
          <AppLink
            key={p.slug}
            href={`${base}/products/${p.slug}`}
            underline="none"
            className="ui-interactive-card group border border-border bg-background p-6"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <p className="type-kicker text-muted group-hover:text-muted-strong transition-colors">{p.brand}</p>
            <p className="mt-2 type-body-strong text-foreground">{p.name}</p>
            <p className="mt-2 type-body line-clamp-3">{p.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1 type-data-strong text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              View details
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </AppLink>
        ))}
      </div>
    </section>
  );
}
