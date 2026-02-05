import type { EducationEvent } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { env } from "@/lib/env";

type Props = {
    event: EducationEvent;
    locale: Locale;
};

/**
 * Event JSON-LD structured data.
 * Provides rich snippets for search engines (Name, Date, Location, Organizer).
 */
export default function EventSchema({ event, locale }: Props) {
    const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const eventUrl = `${siteUrl}/${locale}/education/events/${event.slug}`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        name: event.title,
        description: event.excerpt,
        startDate: event.date,
        // End date defaults to same day if not specified, simplified for this implementation
        endDate: event.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: event.city, // Simplified location
            address: {
                "@type": "PostalAddress",
                addressLocality: event.city,
                addressCountry: "ID"
            }
        },
        organizer: {
            "@type": "Organization",
            name: "PT Alfa Beauty Cosmetica",
            url: siteUrl
        },
        url: eventUrl,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
