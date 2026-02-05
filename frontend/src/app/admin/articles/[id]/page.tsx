import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleById, updateArticle, deleteArticle } from "@/lib/cms";
import ArticleForm from "@/components/admin/ArticleForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
    const { id } = await params;

    let article;
    try {
        article = await getArticleById(id);
    } catch {
        notFound();
    }

    async function handleSubmit(data: Parameters<typeof updateArticle>[1]) {
        "use server";
        await updateArticle(id, data);
    }

    async function handleDelete() {
        "use server";
        await deleteArticle(id);
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
                    <h1 className="text-2xl font-bold text-foreground">Edit Article</h1>
                    <p className="text-muted text-sm mt-1">
                        {article.locale === "id" ? "🇮🇩" : "🇬🇧"} {article.title}
                    </p>
                </div>
            </div>

            {/* Form */}
            <ArticleForm
                initialData={article}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </div>
    );
}
