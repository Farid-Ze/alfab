"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import WhatsAppLink from "@/components/site/WhatsAppLink";
import { t } from "@/lib/i18n";

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLocation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteFooter() {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;

  return (
    <footer className="border-t border-border bg-background">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[80rem] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <p className="type-brand text-foreground">Alfa Beauty</p>
            <p className="type-body max-w-xs">{tx.footer.blurb}</p>
            <div className="flex items-center gap-4 pt-2">
              <WhatsAppLink
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground hover:bg-subtle hover:border-muted-strong transition-colors"
                aria-label="WhatsApp"
              >
                <IconWhatsApp className="h-5 w-5" />
              </WhatsAppLink>
              <a
                href="mailto:hello@alfabeauty.co.id"
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground hover:bg-subtle hover:border-muted-strong transition-colors"
                aria-label="Email"
              >
                <IconMail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <p className="type-data-strong text-foreground uppercase">{tx.footer.explore}</p>
            <ul className="space-y-3">
              <li>
                <AppLink
                  href={`${base}/products`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.nav.products}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={`${base}/education`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.nav.education}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={`${base}/partnership`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.nav.partnership}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={`${base}/about`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.nav.about}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={`${base}/contact`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.nav.contact}
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <p className="type-data-strong text-foreground uppercase">{tx.footer.legal}</p>
            <ul className="space-y-3">
              <li>
                <AppLink
                  href={`${base}/privacy`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.legal.privacyTitle}
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={`${base}/terms`}
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  {tx.legal.termsTitle}
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <p className="type-data-strong text-foreground uppercase">{tx.nav.contact}</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <IconLocation className="h-5 w-5 text-muted shrink-0 mt-0.5" />
                <p className="type-body text-muted-strong">
                  Jakarta, Indonesia
                </p>
              </div>
              <div className="flex items-start gap-3">
                <IconMail className="h-5 w-5 text-muted shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@alfabeauty.co.id"
                  className="type-body text-muted-strong hover:text-foreground transition-colors"
                >
                  hello@alfabeauty.co.id
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[80rem] px-4 py-6 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-data text-muted">
              © {new Date().getFullYear()} PT Alfa Beauty Cosmetica. {tx.footer.copyrightSuffix}
            </p>
            <div className="flex items-center gap-6">
              <AppLink
                href={`${base}/privacy`}
                className="type-data text-muted hover:text-foreground transition-colors"
              >
                {tx.legal.privacyTitle}
              </AppLink>
              <AppLink
                href={`${base}/terms`}
                className="type-data text-muted hover:text-foreground transition-colors"
              >
                {tx.legal.termsTitle}
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
