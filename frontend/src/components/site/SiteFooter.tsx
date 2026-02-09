import Link from "next/link";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { footerSections } from "./header/navigation-data";
import { SocialIcons } from "./footer/SocialIcons";
import { NewsletterSignup } from "./footer/NewsletterSignup";
import { FooterAccordion } from "./footer/FooterAccordion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BrandLogo } from "./BrandLogo";

interface SiteFooterProps {
    locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
    const translations = t(locale);
    const footer = translations.footer as Record<string, unknown>;

    return (
        <footer
            className="site-footer text-neutral-300"
            role="contentinfo"
        >
            {/* Main Footer Grid */}
            <div className="px-6 lg:px-10 py-16 md:py-20">
                {/* Desktop: Multi-column grid */}
                <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Brand Column - Takes 4 columns */}
                    <div className="md:col-span-4">
                        <div className="mb-8">
                            <BrandLogo locale={locale} size="lg" variant="light" />
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-xs">
                            {(footer?.description as string) ||
                                "Professional beauty distribution partner for salons and barbershops in Indonesia."}
                        </p>
                        <SocialIcons />
                    </div>

                    {/* Navigation Columns - Each takes 2 columns */}
                    {footerSections.map((section) => (
                        <div key={section.id} className="md:col-span-2">
                            <h3
                                className="text-xs font-medium uppercase text-neutral-500 mb-6 tracking-widest"
                            >
                                {getTranslation(translations as Record<string, unknown>, section.titleKey)}
                            </h3>
                            <ul className="space-y-3">
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
                        </div>
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

            {/* Newsletter Section */}
            <div>
                <div className="px-6 lg:px-10 py-12 md:py-16">
                    <div className="max-w-7xl mx-auto md:flex md:items-center md:justify-between">
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

            {/* Bottom Bar */}
            <div>
                <div className="px-6 lg:px-10 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-neutral-500">
                            {(footer?.copyright as string) || "\u00a9 2026 PT Alfa Beauty Cosmetica. All rights reserved."}
                        </p>
                        <LanguageSwitcher locale={locale} variant="footer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
