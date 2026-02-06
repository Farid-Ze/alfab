import Link from "next/link";
import { getCMSStats } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    let stats = { products: 0, articles: 0, events: 0 };

    try {
        stats = await getCMSStats();
    } catch {
        // Database not yet configured - show zeros
    }

    const cards = [
        {
            title: "Products",
            count: stats.products,
            href: "/admin/products",
            icon: "📦",
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            title: "Articles",
            count: stats.articles,
            href: "/admin/articles",
            icon: "📝",
            color: "bg-green-500/10 text-green-500",
        },
        {
            title: "Events",
            count: stats.events,
            href: "/admin/events",
            icon: "📅",
            color: "bg-purple-500/10 text-purple-500",
        },
    ];

    return (
        <div className="space-y-content">
            {/* Header */}
            <div>
                <h1 className="type-admin-h1">Dashboard</h1>
                <p className="text-muted mt-1">
                    Selamat datang di Alfa Beauty CMS
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-content-sm">
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="ui-admin-section hover:border-accent/50 transition-all-elegant group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-muted text-sm font-medium">{card.title}</p>
                                <p className="type-admin-stat mt-2">
                                    {card.count}
                                </p>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${card.color}`}
                            >
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-sm text-accent mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            Manage {card.title.toLowerCase()} →
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="ui-admin-section">
                <h2 className="type-admin-section-h2 mb-4">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-content-sm">
                    <Link
                        href="/admin/products/new"
                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all-elegant type-ui-strong"
                    >
                        + New Product
                    </Link>
                    <Link
                        href="/admin/articles/new"
                        className="px-4 py-2 bg-surface-elevated text-foreground rounded-lg hover:bg-border transition-all-elegant type-ui-strong"
                    >
                        + New Article
                    </Link>
                    <Link
                        href="/admin/events/new"
                        className="px-4 py-2 bg-surface-elevated text-foreground rounded-lg hover:bg-border transition-all-elegant type-ui-strong"
                    >
                        + New Event
                    </Link>
                </div>
            </div>

            {/* Setup Notice */}
            {stats.products === 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl pad-content-lg">
                    <h3 className="type-admin-warning text-amber-500">
                        <span>⚠️</span> Setup Required
                    </h3>
                    <p className="text-muted mt-2 text-sm">
                        Database belum disetup. Jalankan SQL migration di Supabase:
                    </p>
                    <code className="block mt-3 bg-background p-3 rounded-lg text-xs text-muted overflow-x-auto">
                        supabase/migrations/001_cms_schema.sql
                    </code>
                </div>
            )}
        </div>
    );
}
