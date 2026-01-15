"use client";

import { getEventBySlug } from "@/lib/education";
import { t } from "@/lib/i18n";

import { useLocale } from "@/components/i18n/LocaleProvider";
import AppLink from "@/components/ui/AppLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";

function IconChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
  );
}

function IconCalendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
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

function IconUsers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EducationEventDetailClient({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;
  const event = slug ? getEventBySlug(locale, slug) : null;

  if (!event) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="h-16 w-16 rounded-full bg-subtle flex items-center justify-center">
          <IconCalendar className="h-8 w-8 text-muted" />
        </div>
        <div className="space-y-2">
          <h1 className="type-h3">{tx.education.event.notFound.title}</h1>
          <p className="type-body text-muted max-w-md">{tx.education.event.notFound.body}</p>
        </div>
        <AppLink 
          href={`${base}/education`}
          className="inline-flex items-center gap-2 type-body-strong text-foreground hover:underline"
        >
          ← {tx.education.common.backToEducation}
        </AppLink>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 type-data text-muted">
        <AppLink 
          href={`${base}/education`}
          className="hover:text-foreground transition-colors"
        >
          {tx.nav.education}
        </AppLink>
        <IconChevronRight className="h-4 w-4" />
        <span className="text-foreground truncate">{event.title}</span>
      </nav>

      {/* Event Content */}
      <article className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 type-data text-muted">
              <span className="inline-flex items-center gap-1">
                <IconMapPin className="h-4 w-4" />
                {event.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconCalendar className="h-4 w-4" />
                {event.date}
              </span>
            </div>
            <h1 className="type-h1">{event.title}</h1>
            <p className="type-body text-muted-strong">{event.excerpt}</p>
            <div className="flex items-center gap-2 type-data text-muted">
              <IconUsers className="h-4 w-4" />
              <span>{tx.education.hub.labels.audience}: {event.audience.join(", ")}</span>
            </div>
          </header>

          <div className="space-y-6 border-t border-border pt-8">
            {event.body.map((p, idx) => (
              <p key={idx} className="type-body text-muted-strong">
                {p}
              </p>
            ))}
          </div>

          <footer className="border-t border-border pt-6">
            <p className="type-data text-muted">{tx.education.event.note}</p>
          </footer>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="p-6 space-y-4 sticky top-24 bg-subtle">
            <h2 className="type-h3">Interested?</h2>
            <p className="type-body text-muted-strong">
              Contact us to learn more about this event and reserve your spot.
            </p>
            <div className="flex flex-col gap-3">
              <ButtonLink href={`${base}/contact`} variant="primary" size="md">
                {event.cta_label}
              </ButtonLink>
              <ButtonLink href={`${base}/education`} variant="secondary" size="md">
                {tx.education.common.backToEducation}
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </article>
    </div>
  );
}
