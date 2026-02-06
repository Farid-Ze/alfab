import type { Metadata } from "next";

import StaggerReveal from "@/components/ui/StaggerReveal";
import AppLink from "@/components/ui/AppLink";
import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";
import { listEvents } from "@/lib/education";
import { formatDate, normalizeLocale, t } from "@/lib/i18n";

/**
 * Education Events Listing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return {
    title: tx.education.hub.sections.events,
    description: tx.seo.educationDescription,
    alternates: {
      canonical: `/${resolved}/education/events`,
      languages: {
        en: "/en/education/events",
        id: "/id/education/events",
      },
    },
  };
}

export default async function EducationEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  const events = listEvents(resolved);

  return (
    <Page>
      <Container>
        <StaggerReveal delay={0.1} className="mb-section">
          <p className="type-kicker text-muted mb-4">{tx.education.hub.kicker}</p>
          <h1 className="type-h1 text-foreground mb-4">{tx.education.hub.sections.events}</h1>
          <p className="type-body text-foreground-muted max-w-2xl">
            {tx.education.hub.heroBody}
          </p>
        </StaggerReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-content">
          {events.map((event) => (
            <AppLink
              key={event.slug}
              href={`/${resolved}/education/events/${event.slug}`}
              className="group p-6 rounded-2xl bg-panel transition-all-elegant hover:scale-[1.02] block shadow-elegant-box"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-background type-data text-muted mb-4">
                {tx.education.hub.types[event.type.toLowerCase() as keyof typeof tx.education.hub.types] || event.type}
              </div>
              <h2 className="type-h3 text-foreground group-hover:text-foreground mb-3">
                {event.title}
              </h2>
              <div className="space-y-2 type-data text-muted">
                <p>🏷️ {event.brand}</p>
                <p>📅 {formatDate(event.date, resolved)}</p>
                <p>📍 {event.city}</p>
              </div>
            </AppLink>
          ))}
        </div>
      </Container>
    </Page>
  );
}
