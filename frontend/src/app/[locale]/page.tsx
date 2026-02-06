import { type Locale, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Hero, Pillars, BrandShowcase, Stats } from "@/components/home";

/**
 * Locale Homepage
 * 
 * Assembled from atomic components using mock-data.ts
 * Clean, maintainable, and content-ready.
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

    return (
        <main>
            <Hero locale={locale} />
            <BrandShowcase locale={locale} />
            <Pillars locale={locale} />
            <Stats locale={locale} />
        </main>
    );
}
