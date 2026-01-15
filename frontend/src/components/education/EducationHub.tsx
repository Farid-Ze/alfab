"use client";

import { t } from "@/lib/i18n";
import { listArticles, listEvents } from "@/lib/education";

import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";

function IconCalendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDocument(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" />
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

function IconUsers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EducationHub() {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;

  const events = listEvents(locale);
  const articles = listArticles(locale);

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Hero Header */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="type-kicker">{tx.nav.education}</p>
        <h1 className="type-h1">{tx.education.hub.title}</h1>
        <p className="type-body text-muted-strong">{tx.education.hub.lede}</p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-border py-8">
        <div className="text-center space-y-1">
          <p className="type-h2">{events.length}</p>
          <p className="type-data text-muted">{tx.education.hub.sections.events}</p>
        </div>
        <div className="text-center space-y-1">
          <p className="type-h2">{articles.length}</p>
          <p className="type-data text-muted">{tx.education.hub.sections.articles}</p>
        </div>
        <div className="text-center space-y-1">
          <p className="type-h2">B2B</p>
          <p className="type-data text-muted">Professional Focus</p>
        </div>
        <div className="text-center space-y-1">
          <p className="type-h2">ID/EN</p>
          <p className="type-data text-muted">Languages</p>
        </div>
      </div>

      {/* Events Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-foreground text-background rounded-full">
              <IconCalendar className="h-5 w-5" />
            </span>
            <h2 className="type-h2">{tx.education.hub.sections.events}</h2>
          </div>
          <p className="type-data text-muted hidden sm:block">{events.length} upcoming</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <Card 
              key={e.slug} 
              className="group p-0 overflow-hidden hover:border-muted-strong transition-colors"
            >
              {/* Event Image Placeholder */}
              <div className="aspect-video bg-subtle border-b border-border flex items-center justify-center">
                <IconCalendar className="h-10 w-10 text-muted" />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 type-data text-muted">
                  <span className="inline-flex items-center gap-1">
                    <IconMapPin className="h-4 w-4" />
                    {e.city}
                  </span>
                  <span>{e.date}</span>
                </div>
                
                <div className="space-y-2">
                  <AppLink
                    href={`${base}/education/events/${e.slug}`}
                    className="type-h3 group-hover:underline transition-colors block"
                  >
                    {e.title}
                  </AppLink>
                  <p className="type-body text-muted-strong line-clamp-2">{e.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 type-data text-muted">
                  <IconUsers className="h-4 w-4" />
                  <span>{e.audience.join(", ")}</span>
                </div>

                <div className="pt-2">
                  <AppLink 
                    href={`${base}/education/events/${e.slug}`}
                    className="inline-flex items-center gap-2 type-body-strong text-foreground group-hover:gap-3 transition-all"
                  >
                    {tx.education.hub.actions.viewDetails}
                    <IconArrowRight className="h-4 w-4" />
                  </AppLink>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-foreground text-background rounded-full">
              <IconDocument className="h-5 w-5" />
            </span>
            <h2 className="type-h2">{tx.education.hub.sections.articles}</h2>
          </div>
          <p className="type-data text-muted hidden sm:block">{articles.length} articles</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Card 
              key={a.slug} 
              className="group p-0 overflow-hidden hover:border-muted-strong transition-colors"
            >
              {/* Article Image Placeholder */}
              <div className="aspect-video bg-subtle border-b border-border flex items-center justify-center">
                <IconDocument className="h-10 w-10 text-muted" />
              </div>
              
              <div className="p-6 space-y-4">
                <p className="type-data text-muted">{a.date}</p>
                
                <div className="space-y-2">
                  <AppLink
                    href={`${base}/education/articles/${a.slug}`}
                    className="type-h3 group-hover:underline transition-colors block"
                  >
                    {a.title}
                  </AppLink>
                  <p className="type-body text-muted-strong line-clamp-3">{a.excerpt}</p>
                </div>

                <div className="pt-2">
                  <AppLink 
                    href={`${base}/education/articles/${a.slug}`}
                    className="inline-flex items-center gap-2 type-body-strong text-foreground group-hover:gap-3 transition-all"
                  >
                    {tx.education.hub.actions.read}
                    <IconArrowRight className="h-4 w-4" />
                  </AppLink>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <h3 className="type-h3 text-background">Professional Training Programs</h3>
            <p className="type-body text-background/80 max-w-xl">{tx.education.hub.trainingNote}</p>
          </div>
          <div className="shrink-0">
            <ButtonLink 
              href={`${base}/contact`} 
              variant="secondary"
              size="lg"
              className="bg-background text-foreground hover:bg-subtle border-background"
            >
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
