import Link from "next/link";
import { BRANDS } from "@/lib/mock-data";
import { type Locale, t } from "@/lib/i18n";
import { BrandPlaceholder } from "@/components/ui/BrandPlaceholder";

interface BrandShowcaseProps {
    locale: Locale;
}

export function BrandShowcase({ locale }: BrandShowcaseProps) {
    const translations = t(locale);
    const brands = translations.home.brands as { label: string; viewAll: string };

    return (
        <section className="section bg-neutral-50 border-y border-neutral-100">
            <div className="container">
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                        {brands.label}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {BRANDS.map((brand) => (
                        <div key={brand.id} className="relative group w-full max-w-[160px] aspect-[3/2] flex items-center justify-center">
                            <BrandPlaceholder brand={brand} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href={`/${locale}/products` as `/${string}`} className="text-primary-600 font-medium hover:text-primary-800 transition-colors inline-flex items-center gap-2">
                        {brands.viewAll}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
