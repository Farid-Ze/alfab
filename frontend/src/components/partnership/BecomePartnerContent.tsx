"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import LeadForm from "@/components/lead/LeadForm";
import Card from "@/components/ui/Card";
import { t } from "@/lib/i18n";

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
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

export default function BecomePartnerContent() {
  const { locale } = useLocale();
  const copy = t(locale);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="type-kicker">{copy.nav.partnership}</p>
        <h1 className="type-h1">{copy.becomePartner.title}</h1>
        <p className="type-body text-muted-strong">{copy.becomePartner.lede}</p>
      </header>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Left Column - Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* What Happens Next */}
          <Card className="p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center bg-foreground text-background rounded-full shrink-0">
                <IconShield className="h-5 w-5" />
              </span>
              <h2 className="type-h3">{copy.becomePartner.next.title}</h2>
            </div>
            <ol className="space-y-4">
              {copy.becomePartner.next.items.map((item, idx) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center bg-subtle border border-border type-data-strong shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="type-body text-muted-strong">{item}</span>
                </li>
              ))}
            </ol>
          </Card>

          {/* Trust Indicators */}
          <div className="space-y-4 p-6 bg-subtle border border-border">
            <h3 className="type-data-strong text-foreground">Why Partner With Us?</h3>
            <ul className="space-y-3">
              {[
                "Access to premium beauty brands",
                "Competitive B2B pricing structure",
                "Professional training & support",
                "Flexible payment terms",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2 type-body text-muted-strong">
                  <IconCheck className="h-4 w-4 text-foreground shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy Note */}
          <p className="type-data text-muted">
            Your information is secure. We respect your privacy and will only use your data to process your partnership application.
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-3">
          <div className="border border-border bg-panel p-6 lg:p-8 sticky top-24">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="type-h3">Partnership Application</h2>
                <p className="type-body text-muted-strong">
                  Fill out the form below and our team will contact you within 1-2 business days.
                </p>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
