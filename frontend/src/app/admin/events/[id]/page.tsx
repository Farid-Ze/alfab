import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventById, updateEvent, deleteEvent } from "@/lib/cms";
import EventForm from "@/components/admin/EventForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: Props) {
    const { id } = await params;

    let event;
    try {
        event = await getEventById(id);
    } catch {
        notFound();
    }

    async function handleSubmit(data: Parameters<typeof updateEvent>[1]) {
        "use server";
        await updateEvent(id, data);
    }

    async function handleDelete() {
        "use server";
        await deleteEvent(id);
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
                    <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
                    <p className="text-muted text-sm mt-1">
                        {event.locale === "id" ? "🇮🇩" : "🇬🇧"} {event.title}
                    </p>
                </div>
            </div>

            {/* Form */}
            <EventForm
                initialData={event}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </div>
    );
}
