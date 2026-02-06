"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Event } from "@/lib/cms";

type EventFormData = {
    slug: string;
    locale: "en" | "id";
    title: string;
    excerpt: string | null;
    body: string[];
    brand: string | null;
    city: string | null;
    event_type: string | null;
    audience: string[];
    event_date: string | null;
    cta_label: string | null;
};

type Props = {
    initialData?: Event;
    onSubmit: (data: EventFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
};

const EVENT_TYPES = ["training", "seminar", "workshop", "webinar"];
const AUDIENCE_OPTIONS = ["Salon & Barber", "Salon", "Barber"];

export default function EventForm({ initialData, onSubmit, onDelete }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function getInitialState(data: Event | undefined): EventFormData {
        if (data) {
            return {
                slug: data.slug,
                locale: data.locale,
                title: data.title,
                excerpt: data.excerpt,
                body: data.body,
                brand: data.brand,
                city: data.city,
                event_type: data.event_type,
                audience: data.audience,
                event_date: data.event_date,
                cta_label: data.cta_label,
            };
        }
        return {
            slug: "",
            locale: "id",
            title: "",
            excerpt: null,
            body: [""],
            brand: null,
            city: null,
            event_type: "training",
            audience: [],
            event_date: null,
            cta_label: null,
        };
    }

    const [formData, setFormData] = useState<EventFormData>(getInitialState(initialData));

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBodyChange = (index: number, value: string) => {
        setFormData((prev) => {
            const arr = [...prev.body];
            arr[index] = value;
            return { ...prev, body: arr };
        });
    };

    const addBodyParagraph = () => {
        setFormData((prev) => ({ ...prev, body: [...prev.body, ""] }));
    };

    const removeBodyParagraph = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            body: prev.body.filter((_, i) => i !== index),
        }));
    };

    const toggleAudience = (value: string) => {
        setFormData((prev) => {
            const arr = prev.audience;
            const newArr = arr.includes(value)
                ? arr.filter((v) => v !== value)
                : [...arr, value];
            return { ...prev, audience: newArr };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const cleanData = {
                ...formData,
                body: formData.body.filter(Boolean),
            };
            await onSubmit(cleanData);
            router.push("/admin/events");
            router.refresh();
        });
    };

    const handleDelete = () => {
        if (!onDelete || !confirm("Yakin hapus event ini?")) return;
        startTransition(async () => {
            await onDelete();
            router.push("/admin/events");
            router.refresh();
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Event Info</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Locale *
                        </label>
                        <select
                            name="locale"
                            value={formData.locale}
                            onChange={handleChange}
                            className="ui-input"
                        >
                            <option value="id">🇮🇩 Indonesian</option>
                            <option value="en">🇬🇧 English</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Event Type *
                        </label>
                        <select
                            name="event_type"
                            value={formData.event_type ?? "training"}
                            onChange={handleChange}
                            className="ui-input capitalize"
                        >
                            {EVENT_TYPES.map((t) => (
                                <option key={t} value={t} className="capitalize">
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Title *
                    </label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="ui-input"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Slug *
                        </label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            pattern="[a-z0-9-]+"
                            className="ui-input"
                            placeholder="event-url-slug"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Event Date
                        </label>
                        <input
                            name="event_date"
                            type="date"
                            value={formData.event_date ?? ""}
                            onChange={handleChange}
                            className="ui-input"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Brand
                        </label>
                        <input
                            name="brand"
                            value={formData.brand ?? ""}
                            onChange={handleChange}
                            className="ui-input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            City
                        </label>
                        <input
                            name="city"
                            value={formData.city ?? ""}
                            onChange={handleChange}
                            className="ui-input"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Audience
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {AUDIENCE_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => toggleAudience(opt)}
                                className={`px-4 py-2 rounded-lg border transition-colors ${formData.audience.includes(opt)
                                    ? "bg-accent text-accent-foreground border-accent"
                                    : "bg-background border-border text-muted hover:text-foreground"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Excerpt
                    </label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt ?? ""}
                        onChange={handleChange}
                        rows={2}
                        className="ui-input resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        CTA Label
                    </label>
                    <input
                        name="cta_label"
                        value={formData.cta_label ?? ""}
                        onChange={handleChange}
                        className="ui-input"
                        placeholder="Daftar via WhatsApp"
                    />
                </div>
            </section>

            {/* Body Content */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Description</h2>

                <div className="space-y-3">
                    {formData.body.map((paragraph, i) => (
                        <div key={i} className="flex gap-2">
                            <textarea
                                value={paragraph}
                                onChange={(e) => handleBodyChange(i, e.target.value)}
                                rows={3}
                                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground resize-none"
                                placeholder={`Paragraph ${i + 1}...`}
                            />
                            <button
                                type="button"
                                onClick={() => removeBodyParagraph(i)}
                                className="px-3 text-red-500 hover:bg-red-500/10 rounded-lg self-start mt-2"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addBodyParagraph}
                        className="text-accent text-sm hover:underline"
                    >
                        + Add Paragraph
                    </button>
                </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <div>
                    {onDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isPending}
                            className="px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            Delete Event
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-border text-muted hover:text-foreground rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all-elegant disabled:opacity-50"
                    >
                        {isPending ? "Saving..." : initialData ? "Update Event" : "Create Event"}
                    </button>
                </div>
            </div>
        </form>
    );
}
