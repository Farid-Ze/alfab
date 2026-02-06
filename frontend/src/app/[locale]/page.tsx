import Link from "next/link";
import { type Locale, t, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

/**
 * Locale Homepage
 * 
 * Hero section with CTAs following paket-a.md spec
 * Following Next.js 16 pattern: params is a Promise
 */
export default async function LocaleHomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;

    if (!isValidLocale(localeParam)) {
        notFound();
    }

    const locale = localeParam as Locale;
    const translations = t(locale);
    const hero = translations.home.hero;
    const pillars = translations.home.pillars;

    return (
        <>
            {/* Hero Section */}
            <section className="section bg-gradient-to-b from-neutral-50 to-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-800 mb-6 text-balance">
                            {hero.title}
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
                            {hero.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/${locale}/products`} className="btn btn-primary">
                                {hero.cta.products}
                            </Link>
                            <Link href={`/${locale}/partnership`} className="btn btn-secondary">
                                {hero.cta.partner}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-800 mb-12">
                        {pillars.title}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Products Pillar */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary-800 mb-3">
                                {pillars.products.title}
                            </h3>
                            <p className="text-neutral-600">
                                {pillars.products.description}
                            </p>
                        </div>

                        {/* Education Pillar */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary-800 mb-3">
                                {pillars.education.title}
                            </h3>
                            <p className="text-neutral-600">
                                {pillars.education.description}
                            </p>
                        </div>

                        {/* Partnership Pillar */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary-800 mb-3">
                                {pillars.partnership.title}
                            </h3>
                            <p className="text-neutral-600">
                                {pillars.partnership.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
