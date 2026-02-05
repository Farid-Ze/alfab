import Link from "next/link";
import { getArticles } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
    let articles: Awaited<ReturnType<typeof getArticles>> = [];

    try {
        articles = await getArticles();
    } catch {
        // Database not yet configured
    }

    const enArticles = articles.filter((a) => a.locale === "en");
    const idArticles = articles.filter((a) => a.locale === "id");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Articles</h1>
                    <p className="text-muted text-sm mt-1">
                        Manage education articles (EN/ID)
                    </p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                    + Add Article
                </Link>
            </div>

            {/* Locale Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Indonesian Articles */}
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-surface-elevated">
                        <h2 className="font-semibold text-foreground flex items-center gap-2">
                            🇮🇩 Indonesian ({idArticles.length})
                        </h2>
                    </div>
                    {idArticles.length === 0 ? (
                        <div className="p-8 text-center text-muted">
                            Belum ada artikel
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {idArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/admin/articles/${article.id}`}
                                    className="block p-4 hover:bg-surface-elevated transition-colors"
                                >
                                    <p className="font-medium text-foreground">{article.title}</p>
                                    <p className="text-sm text-muted mt-1 line-clamp-1">
                                        {article.excerpt}
                                    </p>
                                    <p className="text-xs text-muted mt-2">
                                        {new Date(article.date).toLocaleDateString("id-ID")}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* English Articles */}
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-surface-elevated">
                        <h2 className="font-semibold text-foreground flex items-center gap-2">
                            🇬🇧 English ({enArticles.length})
                        </h2>
                    </div>
                    {enArticles.length === 0 ? (
                        <div className="p-8 text-center text-muted">
                            No articles yet
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {enArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/admin/articles/${article.id}`}
                                    className="block p-4 hover:bg-surface-elevated transition-colors"
                                >
                                    <p className="font-medium text-foreground">{article.title}</p>
                                    <p className="text-sm text-muted mt-1 line-clamp-1">
                                        {article.excerpt}
                                    </p>
                                    <p className="text-xs text-muted mt-2">
                                        {new Date(article.date).toLocaleDateString("en-US")}
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
