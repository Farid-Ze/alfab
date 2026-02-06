import { createArticle } from "@/lib/cms";
import ArticleForm from "@/components/admin/ArticleForm";
import Link from "next/link";

export default function NewArticlePage() {
    async function handleSubmit(data: Parameters<typeof createArticle>[0]) {
        "use server";
        await createArticle(data);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/articles"
                    className="text-muted hover:text-foreground transition-colors"
                >
                    ← Back
                </Link>
                <div>
                    <h1 className="type-admin-h2">New Article</h1>
                    <p className="text-muted text-sm mt-1">Create a new education article</p>
                </div>
            </div>

            {/* Form */}
            <ArticleForm onSubmit={handleSubmit} />
        </div>
    );
}
