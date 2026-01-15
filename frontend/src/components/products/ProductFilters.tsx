"use client";

import { useMemo, useState } from "react";

import type { Audience, Product } from "@/lib/types";
import { listProducts } from "@/lib/catalog";
import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import { t } from "@/lib/i18n";

function uniq(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function matches(p: Product, selected: Filters) {
  if (selected.brands.size > 0 && !selected.brands.has(p.brand)) return false;
  if (selected.audiences.size > 0 && !p.audience.some((a) => selected.audiences.has(a))) return false;
  if (selected.functions.size > 0 && !p.functions.some((f) => selected.functions.has(f))) return false;
  return true;
}

type Filters = {
  brands: Set<string>;
  functions: Set<string>;
  audiences: Set<Audience>;
};

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

export default function ProductFilters() {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;

  const all = useMemo(() => listProducts(), []);

  const brands = useMemo(() => uniq(all.map((p) => p.brand)), [all]);
  const functions = useMemo(() => uniq(all.flatMap((p) => p.functions)), [all]);

  const [filters, setFilters] = useState<Filters>({
    brands: new Set(),
    functions: new Set(),
    audiences: new Set(),
  });

  const filtered = useMemo(() => all.filter((p) => matches(p, filters)), [all, filters]);

  const hasFilters = filters.brands.size > 0 || filters.functions.size > 0 || filters.audiences.size > 0;

  const toggle = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const next = {
        brands: new Set(prev.brands),
        functions: new Set(prev.functions),
        audiences: new Set(prev.audiences),
      };
      const set = next[key] as Set<string>;
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return next;
    });
  };

  const clear = () =>
    setFilters({
      brands: new Set(),
      functions: new Set(),
      audiences: new Set(),
    });

  return (
    <section className="grid gap-8 md:grid-cols-4">
      {/* Filter Sidebar */}
      <aside className="md:col-span-1">
        <div className="border border-border bg-panel p-6 sticky top-24">
          <div className="flex items-center justify-between">
            <h2 className="type-data-strong text-foreground">{tx.products.filters.title}</h2>
            {hasFilters && (
              <button
                type="button"
                onClick={clear}
                className="type-data text-muted hover:text-foreground underline decoration-dotted underline-offset-4 transition-colors"
              >
                {tx.products.filters.clear}
              </button>
            )}
          </div>

          <div className="mt-5 space-y-5">
            {/* Brand Filter */}
            <div>
              <p className="type-data-strong text-foreground">{tx.products.filters.groups.brand}</p>
              <div className="mt-2 space-y-1.5">
                {brands.map((b) => (
                  <label
                    key={b}
                    className="group flex items-center gap-2.5 py-1 type-data cursor-pointer hover:text-foreground transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-foreground transition-shadow focus:ring-2 focus:ring-border-strong focus:ring-offset-1"
                      checked={filters.brands.has(b)}
                      onChange={() => toggle("brands", b)}
                    />
                    <span className={filters.brands.has(b) ? "text-foreground type-data-strong" : "text-muted-strong"}>
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Audience Filter */}
            <div>
              <p className="type-data-strong text-foreground">{tx.products.filters.groups.audience}</p>
              <div className="mt-2 space-y-1.5">
                {(["SALON", "BARBER"] as const).map((a) => (
                  <label
                    key={a}
                    className="group flex items-center gap-2.5 py-1 type-data cursor-pointer hover:text-foreground transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-foreground transition-shadow focus:ring-2 focus:ring-border-strong focus:ring-offset-1"
                      checked={filters.audiences.has(a)}
                      onChange={() => toggle("audiences", a)}
                    />
                    <span className={filters.audiences.has(a) ? "text-foreground type-data-strong" : "text-muted-strong"}>
                      {a === "SALON"
                        ? tx.products.filters.audience.salon
                        : tx.products.filters.audience.barber}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Function Filter */}
            <div>
              <p className="type-data-strong text-foreground">{tx.products.filters.groups.function}</p>
              <div className="mt-2 space-y-1.5">
                {functions.map((f) => (
                  <label
                    key={f}
                    className="group flex items-center gap-2.5 py-1 type-data cursor-pointer hover:text-foreground transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-foreground transition-shadow focus:ring-2 focus:ring-border-strong focus:ring-offset-1"
                      checked={filters.functions.has(f)}
                      onChange={() => toggle("functions", f)}
                    />
                    <span className={filters.functions.has(f) ? "text-foreground type-data-strong" : "text-muted-strong"}>
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="md:col-span-3">
        {/* Results count */}
        {hasFilters && (
          <p className="type-data text-muted mb-4">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        )}

        {filtered.length === 0 ? (
          /* Empty State */
          <div className="border border-border bg-panel p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-subtle">
              <IconSearch className="h-6 w-6 text-muted" />
            </div>
            <p className="mt-4 type-body-strong text-foreground">{tx.products.filters.empty.title}</p>
            <p className="mt-2 type-body max-w-sm mx-auto">{tx.products.filters.empty.body}</p>
            <button
              type="button"
              onClick={clear}
              className="mt-4 type-data-strong text-foreground underline decoration-dotted underline-offset-4"
            >
              {tx.products.filters.clear}
            </button>
          </div>
        ) : (
          /* Product Cards */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <AppLink
                key={p.slug}
                href={`${base}/products/${p.slug}`}
                underline="none"
                className="ui-interactive-card group border border-border bg-panel p-6"
              >
                <p className="type-kicker text-muted group-hover:text-muted-strong transition-colors">{p.brand}</p>
                <p className="mt-2 type-body-strong text-foreground">{p.name}</p>
                <p className="mt-2 type-body line-clamp-3">{p.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 type-data-strong text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  View details
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L7.44 7.5 4.22 4.28a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                  </svg>
                </span>
              </AppLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
