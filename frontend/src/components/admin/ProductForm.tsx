"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Product } from "@/lib/cms";

type ProductFormData = Omit<Product, "id" | "created_at" | "updated_at">;

type Props = {
    initialData?: Product;
    onSubmit: (data: ProductFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
};

const AUDIENCE_OPTIONS = ["SALON", "BARBER"];
const CATEGORY_OPTIONS = ["treatment", "styling", "color", "shampoo", "grooming"];

export default function ProductForm({ initialData, onSubmit, onDelete }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState<ProductFormData>({
        slug: initialData?.slug ?? "",
        name: initialData?.name ?? "",
        brand: initialData?.brand ?? "",
        summary: initialData?.summary ?? "",
        how_to_use: initialData?.how_to_use ?? "",
        benefits: initialData?.benefits ?? [""],
        functions: initialData?.functions ?? [""],
        categories: initialData?.categories ?? [],
        audience: initialData?.audience ?? [],
        image_url: initialData?.image_url ?? "",
        image_alt: initialData?.image_alt ?? "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field: "benefits" | "functions", index: number, value: string) => {
        setFormData((prev) => {
            const arr = [...prev[field]];
            arr[index] = value;
            return { ...prev, [field]: arr };
        });
    };

    const addArrayItem = (field: "benefits" | "functions") => {
        setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeArrayItem = (field: "benefits" | "functions", index: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const toggleMultiSelect = (field: "audience" | "categories", value: string) => {
        setFormData((prev) => {
            const arr = prev[field];
            const newArr = arr.includes(value)
                ? arr.filter((v) => v !== value)
                : [...arr, value];
            return { ...prev, [field]: newArr };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            // Filter empty strings from arrays
            const cleanData = {
                ...formData,
                benefits: formData.benefits.filter(Boolean),
                functions: formData.functions.filter(Boolean),
            };
            await onSubmit(cleanData);
            router.push("/admin/products");
            router.refresh();
        });
    };

    const handleDelete = () => {
        if (!onDelete || !confirm("Yakin hapus produk ini?")) return;
        startTransition(async () => {
            await onDelete();
            router.push("/admin/products");
            router.refresh();
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Basic Info</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Name *
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="ui-input"
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
                            className="ui-input"
                            placeholder="product-name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Brand *
                    </label>
                    <input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        className="ui-input"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Summary
                    </label>
                    <textarea
                        name="summary"
                        value={formData.summary ?? ""}
                        onChange={handleChange}
                        rows={3}
                        className="ui-input resize-none"
                    />
                </div>
            </section>

            {/* Audience & Categories */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Classification</h2>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Audience
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {AUDIENCE_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => toggleMultiSelect("audience", opt)}
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
                        Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORY_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => toggleMultiSelect("categories", opt)}
                                className={`px-4 py-2 rounded-lg border transition-colors capitalize ${formData.categories.includes(opt)
                                    ? "bg-accent text-accent-foreground border-accent"
                                    : "bg-background border-border text-muted hover:text-foreground"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits & Functions */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Benefits & Functions</h2>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Benefits
                    </label>
                    <div className="space-y-2">
                        {formData.benefits.map((benefit, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={benefit}
                                    onChange={(e) => handleArrayChange("benefits", i, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                    placeholder="Enter a benefit"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem("benefits", i)}
                                    className="px-3 text-red-500 hover:bg-red-500/10 rounded-lg"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem("benefits")}
                            className="text-accent text-sm hover:underline"
                        >
                            + Add Benefit
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Functions
                    </label>
                    <div className="space-y-2">
                        {formData.functions.map((func, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={func}
                                    onChange={(e) => handleArrayChange("functions", i, e.target.value)}
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                                    placeholder="Enter a function"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem("functions", i)}
                                    className="px-3 text-red-500 hover:bg-red-500/10 rounded-lg"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem("functions")}
                            className="text-accent text-sm hover:underline"
                        >
                            + Add Function
                        </button>
                    </div>
                </div>
            </section>

            {/* How to Use */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">How to Use</h2>
                <textarea
                    name="how_to_use"
                    value={formData.how_to_use ?? ""}
                    onChange={handleChange}
                    rows={4}
                    className="ui-input resize-none"
                    placeholder="Instructions for using the product..."
                />
            </section>

            {/* Image */}
            <section className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <h2 className="type-admin-section-h2">Image</h2>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Image URL
                    </label>
                    <input
                        name="image_url"
                        value={formData.image_url ?? ""}
                        onChange={handleChange}
                        className="ui-input"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                        Alt Text
                    </label>
                    <input
                        name="image_alt"
                        value={formData.image_alt ?? ""}
                        onChange={handleChange}
                        className="ui-input"
                    />
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
                            Delete Product
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
                        {isPending ? "Saving..." : initialData ? "Update Product" : "Create Product"}
                    </button>
                </div>
            </div>
        </form>
    );
}
