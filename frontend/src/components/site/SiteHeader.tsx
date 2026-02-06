import Link from "next/link";
import { type Locale, t } from "@/lib/i18n";

interface SiteHeaderProps {
    locale: Locale;
}

/**
 * SiteHeader - Main navigation header
 * 
 * Server Component - receives locale from parent
 */
export function SiteHeader({ locale }: SiteHeaderProps) {
    const translations = t(locale);
    const nav = translations.nav;

    const navLinks = [
        { href: `/${locale}`, label: nav.home },
        { href: `/${locale}/products`, label: nav.products },
        { href: `/${locale}/education`, label: nav.education },
        { href: `/${locale}/partnership`, label: nav.partnership },
        { href: `/${locale}/about`, label: nav.about },
        { href: `/${locale}/contact`, label: nav.contact },
    ];

    return (
        <header className="sticky top-0 z-sticky bg-white/95 backdrop-blur-sm border-b border-neutral-200">
            <div className="container">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="font-bold text-xl text-primary-800"
                    >
                        Alfa Beauty
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-neutral-600 hover:text-secondary-600 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Locale Switcher */}
                        <LocaleSwitcher currentLocale={locale} />

                        {/* Mobile Menu Button - placeholder for now */}
                        <button
                            className="md:hidden p-2 text-neutral-600"
                            aria-label="Open menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

/**
 * Locale Switcher Component
 */
function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const otherLocale = currentLocale === "en" ? "id" : "en";

    return (
        <Link
            href={`/${otherLocale}`}
            className="text-sm font-medium text-neutral-500 hover:text-secondary-600 transition-colors uppercase"
        >
            {otherLocale}
        </Link>
    );
}
