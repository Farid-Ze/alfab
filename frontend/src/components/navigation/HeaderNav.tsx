"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import LocaleToggle from "@/components/i18n/LocaleToggle";
import { t } from "@/lib/i18n";

/**
 * HeaderNav: Ineo-Sense inspired navigation
 * Clean, centered logo, pill-shaped contact button
 */
export default function HeaderNav() {
    const pathname = usePathname();
    const { locale } = useLocale();
    const tx = t(locale);
    const base = `/${locale}`;

    const navLinks = [
        { href: `${base}/products`, label: tx.nav.products },
        { href: `${base}/education`, label: tx.nav.education },
        { href: `${base}/about`, label: tx.nav.about },
        { href: `${base}/partnership`, label: tx.nav.partnership },
    ];

    const isActive = (href: string) => {
        if (href === base) return pathname === base;
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-header">
            <nav className="bg-surface-background/80 backdrop-blur-md border-b border-border/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Left: Main Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.slice(0, 2).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`type-ui-sm font-medium transition-colors ${isActive(link.href)
                                            ? "text-brand"
                                            : "text-foreground hover:text-brand"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Center: Logo */}
                        <Link href={base} className="flex items-center">
                            <motion.span
                                className="type-h4 font-bold text-brand"
                                whileHover={{ scale: 1.02 }}
                            >
                                Alfa Beauty
                            </motion.span>
                        </Link>

                        {/* Right: Secondary Nav + Contact + Language */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.slice(2).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`type-ui-sm font-medium transition-colors ${isActive(link.href)
                                            ? "text-brand"
                                            : "text-foreground hover:text-brand"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Contact Button - Pill Style */}
                            <Link
                                href={`${base}/contact`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors"
                            >
                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                {tx.nav.contact}
                            </Link>

                            <LocaleToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            className="lg:hidden p-2 text-foreground"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
