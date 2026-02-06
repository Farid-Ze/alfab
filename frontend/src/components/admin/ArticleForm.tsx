"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Article } from "@/lib/cms";

type ArticleFormData = {
    slug: string;
    locale: "en" | "id";
    title: string;
    excerpt: string | null;
    body: string[];
    date: string;
};

type Props = {
    initialData?: Article;
    onSubmit: (data: ArticleFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
};

export default function ArticleForm({ initialData, onSubmit, onDelete }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function getInitialState(data: Article | undefined): ArticleFormData {
        if (data) {
            return {
                slug: data.slug,
                locale: data.locale,
                title: data.title,
                excerpt: data.excerpt,
                body: data.body,
                date: data.date,
            };
        }
        return {
            slug: "",
            locale: "id",
            title: "",
            excerpt: null,
            body: [""],
            date: new Date().toISOString().slice(0, 10),
        };
    }

    const [formData, setFormData] = useState<ArticleFormData>(getInitialState(initialData));

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const cleanData = {
                ...formData,
                body: formData.body.filter(Boolean),
            };
            await onSubmit(cleanData);
            router.push("/admin/articles");
            router.refresh();
        });
    };

    const handleDelete = () => {
        if (!onDelete || !confirm("Yakin hapus artikel ini?")) return;
        startTransition(async () => {
            await onDelete();
            router.push("/admin/articles");
            router.refresh();
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Article Info</h2>

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
                            Date
                        </label>
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="ui-input"
                        />
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
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                </div>

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
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                        placeholder="article-url-slug"
                    />
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
                        placeholder="Short description for previews..."
                    />
                </div>
            </section>

            {/* Body Content */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Body Content</h2>
                <p className="text-sm text-muted">
                    Each text area represents a paragraph in the article.
                </p>

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
                            Delete Article
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
                        {isPending ? "Saving..." : initialData ? "Update Article" : "Create Article"}
                    </button>
                </div>
            </div>
        </form>
    );
}
