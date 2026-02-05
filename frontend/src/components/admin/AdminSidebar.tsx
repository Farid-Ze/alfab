"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/products", label: "Products", icon: "📦" },
    { href: "/admin/articles", label: "Articles", icon: "📝" },
    { href: "/admin/events", label: "Events", icon: "📅" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <Link href="/admin" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">Alfa CMS</span>
                </Link>
                <p className="text-sm text-muted mt-1">Content Management</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/admin" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted hover:text-foreground hover:bg-surface-elevated"
                                }
              `}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                >
                    <span className="text-lg">🌐</span>
                    <span className="font-medium">View Site</span>
                </Link>

                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <span className="text-lg">🚪</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </form>
            </div>
        </aside>
    );
}
