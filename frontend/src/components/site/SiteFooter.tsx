"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import { t } from "@/lib/i18n";

export default function SiteFooter() {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[80rem] gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="type-data-strong text-foreground">Alfa Beauty Cosmetica</p>
          <p className="type-body">{tx.footer.blurb}</p>
        </div>
        <div className="space-y-3">
          <p className="type-data-strong text-foreground">{tx.footer.explore}</p>
          <ul className="space-y-2 type-body">
            <li>
              <AppLink href={`${base}/products`}>
                {tx.nav.products}
              </AppLink>
            </li>
            <li>
              <AppLink href={`${base}/education`}>
                {tx.nav.education}
              </AppLink>
            </li>
            <li>
              <AppLink href={`${base}/partnership`}>
                {tx.nav.partnership}
              </AppLink>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="type-data-strong text-foreground">{tx.footer.legal}</p>
          <ul className="space-y-2 type-body">
            <li>
              <AppLink href={`${base}/privacy`}>
                {tx.legal.privacyTitle}
              </AppLink>
            </li>
            <li>
              <AppLink href={`${base}/terms`}>
                {tx.legal.termsTitle}
              </AppLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-8">
        <p className="mx-auto max-w-[80rem] px-4 type-data sm:px-6">
          © {new Date().getFullYear()} Alfa Beauty Cosmetica. {tx.footer.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
