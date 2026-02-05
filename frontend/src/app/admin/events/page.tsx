import Link from "next/link";
import { getEvents } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
    let events: Awaited<ReturnType<typeof getEvents>> = [];

    try {
        events = await getEvents();
    } catch {
        // Database not yet configured
    }

    const enEvents = events.filter((e) => e.locale === "en");
    const idEvents = events.filter((e) => e.locale === "id");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Events</h1>
                    <p className="text-muted text-sm mt-1">
                        Manage education events (EN/ID)
                    </p>
                </div>
                <Link
                    href="/admin/events/new"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                    + Add Event
                </Link>
            </div>

            {/* Locale Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Indonesian Events */}
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-surface-elevated">
                        <h2 className="font-semibold text-foreground flex items-center gap-2">
                            🇮🇩 Indonesian ({idEvents.length})
                        </h2>
                    </div>
                    {idEvents.length === 0 ? (
                        <div className="p-8 text-center text-muted">
                            Belum ada event
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {idEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/admin/events/${event.id}`}
                                    className="block p-4 hover:bg-surface-elevated transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium text-foreground">{event.title}</p>
                                            <p className="text-sm text-muted mt-1">{event.city} • {event.brand}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full capitalize">
                                            {event.event_type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted mt-2">
                                        {event.event_date ? new Date(event.event_date).toLocaleDateString("id-ID") : "No date"}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* English Events */}
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-surface-elevated">
                        <h2 className="font-semibold text-foreground flex items-center gap-2">
                            🇬🇧 English ({enEvents.length})
                        </h2>
                    </div>
                    {enEvents.length === 0 ? (
                        <div className="p-8 text-center text-muted">
                            No events yet
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {enEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/admin/events/${event.id}`}
                                    className="block p-4 hover:bg-surface-elevated transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium text-foreground">{event.title}</p>
                                            <p className="text-sm text-muted mt-1">{event.city} • {event.brand}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full capitalize">
                                            {event.event_type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted mt-2">
                                        {event.event_date ? new Date(event.event_date).toLocaleDateString("en-US") : "No date"}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
