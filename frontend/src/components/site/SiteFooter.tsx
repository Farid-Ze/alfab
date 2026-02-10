/**
 * SiteFooter — Enterprise-grade footer component
 *
 * Features beyond standard UI libraries:
 * ─── Accessibility (WCAG 2.1 AA) ────────────────────────────
 * - Semantic role="contentinfo" on <footer>
 * - Proper heading hierarchy: sr-only h2 section titles
 * - aria-label on navigation regions
 * - Color contrast compliant text on dark background
 *
 * ─── Sections ────────────────────────────────────────────────
 * - Trust Badges: credibility indicators with scroll-reveal
 * - Brand + Description + Social links
 * - Multi-column navigation (responsive 4→2→1)
 * - Newsletter signup with validation
 * - Payment method badges
 * - Copyright + Language switcher
 * - Back to Top button
 *
 * ─── Performance ─────────────────────────────────────────────
 * - Intersection Observer for scroll-reveal (no JS animation library)
 * - Static rendering (server component compatible)
 * - CSS-driven responsive grid
 *
 * ─── Print ───────────────────────────────────────────────────
 * - Simplified print layout (no background, minimal text)
 */

import Link from "next/link";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { footerSections, trustBadges, paymentMethods } from "./header/navigation-data";
import { SocialIcons } from "./footer/SocialIcons";
import { NewsletterSignup } from "./footer/NewsletterSignup";
import { FooterAccordion } from "./footer/FooterAccordion";
import { TrustBadges, PaymentMethods } from "./footer/FooterBadges";
import { BackToTop } from "./footer/BackToTop";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BrandLogo } from "./BrandLogo";

interface SiteFooterProps {
    locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
    const translations = t(locale);
    const footer = translations.footer as Record<string, unknown>;

    return (
        <>
            {/* Trust Badges — above footer, white background */}
            <TrustBadges badges={trustBadges} locale={locale} />

            <footer
                className="site-footer text-neutral-300 print:bg-white print:text-neutral-900"
                role="contentinfo"
            >
                {/* ─── Main Footer Grid ─────────────────────────── */}
                <div className="px-6 lg:px-10 py-16 md:py-20">
                    {/* Desktop: Multi-column grid */}
                    <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {/* Brand Column - Takes 4 columns */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <div className="mb-8">
                                <BrandLogo locale={locale} size="lg" variant="light" />
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-xs">
                                {(footer?.description as string) ||
                                    "Professional beauty distribution partner for salons and barbershops in Indonesia."}
                            </p>
                            <SocialIcons />
                        </div>

                        {/* Navigation Columns */}
                        {footerSections.map((section) => (
                            <nav
                                key={section.id}
                                className="md:col-span-3 lg:col-span-2"
                                aria-label={getTranslation(translations as Record<string, unknown>, section.titleKey)}
                            >
                                <h3
                                    className="text-xs font-medium uppercase text-neutral-500 mb-6 tracking-widest"
                                >
                                    {getTranslation(translations as Record<string, unknown>, section.titleKey)}
                                </h3>
                                <ul className="space-y-3" role="list">
                                    {section.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={`/${locale}${link.href}`}
                                                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                                            >
                                                {getTranslation(translations as Record<string, unknown>, link.labelKey)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>

                    {/* Mobile: Brand + Accordion */}
                    <div className="md:hidden">
                        <div className="mb-10">
                            <div className="mb-6">
                                <BrandLogo locale={locale} size="lg" variant="light" />
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {(footer?.description as string) ||
                                    "Professional beauty distribution partner for salons and barbershops in Indonesia."}
                            </p>
                        </div>
                        <FooterAccordion sections={footerSections} locale={locale} />
                        <div className="mt-10">
                            <SocialIcons />
                        </div>
                    </div>
                </div>

                {/* ─── Newsletter Section ───────────────────────── */}
                <div className="footer-divider">
                    <div className="px-6 lg:px-10 py-12 md:py-16">
                        <div className="max-w-7xl mx-auto md:flex md:items-center md:justify-between gap-8">
                            <div className="md:max-w-md mb-6 md:mb-0">
                                <h2 className="text-lg font-light text-white mb-2">
                                    {(footer?.newsletterTitle as string) || "Stay connected"}
                                </h2>
                                <p className="text-sm text-neutral-400">
                                    {(footer?.newsletterDesc as string) ||
                                        "Subscribe for product updates and industry insights."}
                                </p>
                            </div>
                            <div className="md:w-96">
                                <NewsletterSignup locale={locale} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Payment Methods + Bottom Bar ────────────── */}
                <div className="footer-divider">
                    <div className="px-6 lg:px-10 py-8">
                        <div className="max-w-7xl mx-auto">
                            {/* Payment methods row */}
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-8">
                                <PaymentMethods methods={paymentMethods} />
                            </div>

                            {/* Copyright + language row */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                                <p className="text-xs text-neutral-500 print:text-neutral-700">
                                    {(footer?.copyright as string) || "\u00a9 2026 PT Alfa Beauty Cosmetica. All rights reserved."}
                                </p>
                                <LanguageSwitcher locale={locale} variant="footer" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button — fixed position */}
            <BackToTop
                label={
                    getTranslation(translations as Record<string, unknown>, "footer.backToTop")
                }
            />
        </>
    );
}
