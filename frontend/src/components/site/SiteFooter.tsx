import Link from "next/link";
import { type Locale, t } from "@/lib/i18n";

interface SiteFooterProps {
    locale: Locale;
}

/**
 * SiteFooter - Main footer with navigation and legal links
 */
export function SiteFooter({ locale }: SiteFooterProps) {
    const translations = t(locale);
    const nav = translations.nav;
    const footer = translations.footer;

    return (
        <footer className="bg-primary-900 text-white">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href={`/${locale}`} className="inline-block mb-4">
                            <span className="text-2xl font-bold">Alfa Beauty</span>
                        </Link>
                        <p className="text-neutral-300 text-sm max-w-md leading-relaxed">
                            Professional beauty distribution company providing products, education,
                            and technical support for salons and barbershops in Indonesia.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${locale}/products`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {nav.products}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/education`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {nav.education}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/partnership`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {nav.partnership}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/about`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {nav.about}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${locale}/privacy`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {footer.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/terms`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {footer.terms}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/contact`} className="text-sm text-neutral-300 hover:text-white transition-colors">
                                    {nav.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-sm text-neutral-400 text-center">
                        {footer.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
