"use client";

import WhatsAppLink from "@/components/site/WhatsAppLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getButtonClassName } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

function IconClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactContent({ fallbackEmail }: { fallbackEmail?: string }) {
  const { locale } = useLocale();
  const copy = t(locale);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="type-kicker">{copy.nav.contact}</p>
        <h1 className="type-h1">{copy.contact.title}</h1>
        <p className="type-body text-muted-strong">{copy.contact.body}</p>
      </header>

      {/* Contact Methods Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* WhatsApp Card */}
        <Card className="p-8 space-y-4 hover:border-muted-strong transition-colors group">
          <span className="inline-flex h-14 w-14 items-center justify-center bg-foreground text-background rounded-full">
            <IconWhatsApp className="h-7 w-7" />
          </span>
          <div className="space-y-2">
            <h2 className="type-h3">WhatsApp</h2>
            <p className="type-body text-muted-strong">
              Fastest response. Chat with our team directly.
            </p>
          </div>
          <WhatsAppLink className={getButtonClassName({ variant: "primary", size: "md" }) + " w-full"}>
            {copy.cta.whatsappConsult}
          </WhatsAppLink>
        </Card>

        {/* Email Card */}
        {fallbackEmail && (
          <Card className="p-8 space-y-4 hover:border-muted-strong transition-colors group">
            <span className="inline-flex h-14 w-14 items-center justify-center bg-foreground text-background rounded-full">
              <IconMail className="h-7 w-7" />
            </span>
            <div className="space-y-2">
              <h2 className="type-h3">{copy.contact.email}</h2>
              <p className="type-body text-muted-strong">
                For formal inquiries and documentation.
              </p>
            </div>
            <a
              className={getButtonClassName({ variant: "secondary", size: "md" }) + " w-full"}
              href={`mailto:${fallbackEmail}`}
            >
              {fallbackEmail}
            </a>
          </Card>
        )}

        {/* Location Card */}
        <Card className="p-8 space-y-4 hover:border-muted-strong transition-colors group">
          <span className="inline-flex h-14 w-14 items-center justify-center bg-subtle border border-border rounded-full">
            <IconLocation className="h-7 w-7" />
          </span>
          <div className="space-y-2">
            <h2 className="type-h3">Location</h2>
            <p className="type-body text-muted-strong">
              Jakarta, Indonesia
            </p>
            <p className="type-data text-muted">
              PT Alfa Beauty Cosmetica
            </p>
          </div>
        </Card>
      </section>

      {/* Business Hours */}
      <section className="border-t border-b border-border py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <IconClock className="h-5 w-5 text-muted" />
            <span className="type-data-strong">Business Hours</span>
          </div>
          <div className="flex items-center gap-6 type-body text-muted-strong">
            <span>Mon - Fri: 09:00 - 18:00 WIB</span>
            <span className="hidden sm:inline">|</span>
            <span>Sat: 09:00 - 14:00 WIB</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background p-8 lg:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="type-h2 text-background">Ready to Start?</h2>
          <p className="type-body text-background/80">
            Our team is ready to help you grow your beauty business. Reach out today and let&apos;s discuss how we can support your success.
          </p>
          <WhatsAppLink className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground type-body-strong hover:bg-subtle transition-colors">
            Start Conversation
          </WhatsAppLink>
        </div>
      </section>
    </div>
  );
}
