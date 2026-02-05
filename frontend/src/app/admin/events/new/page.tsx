import { createEvent } from "@/lib/cms";
import EventForm from "@/components/admin/EventForm";
import Link from "next/link";

export default function NewEventPage() {
    async function handleSubmit(data: Parameters<typeof createEvent>[0]) {
        "use server";
        await createEvent(data);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/events"
                    className="text-muted hover:text-foreground transition-colors"
                >
                    ← Back
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">New Event</h1>
                    <p className="text-muted text-sm mt-1">Create a new education event</p>
                </div>
            </div>

            {/* Form */}
            <EventForm onSubmit={handleSubmit} />
        </div>
    );
}
