import { type Locale, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home";

// Dynamic imports for below-the-fold sections (reduces initial bundle)
const BrandShowcase = dynamic(
    () => import("@/components/home/BrandShowcase").then((m) => ({ default: m.BrandShowcase })),
    { loading: () => <SectionSkeleton /> }
);

const Pillars = dynamic(
    () => import("@/components/home/Pillars").then((m) => ({ default: m.Pillars })),
    { loading: () => <SectionSkeleton /> }
);

const Stats = dynamic(
    () => import("@/components/home/Stats").then((m) => ({ default: m.Stats })),
    { loading: () => <StatsSkeleton /> }
);

// Lightweight skeleton components
function SectionSkeleton() {
    return (
        <section className="section">
            <div className="container">
                <div className="animate-pulse">
                    <div className="h-8 bg-neutral-200 rounded w-1/3 mx-auto mb-8" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 bg-neutral-100 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatsSkeleton() {
    return (
        <section className="py-20 bg-primary-900">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="text-center">
                            <div className="h-12 bg-primary-800 rounded w-20 mx-auto mb-2" />
                            <div className="h-4 bg-primary-800 rounded w-24 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Locale Homepage
 * 
 * Performance optimizations:
 * - Hero loads immediately (above-the-fold, critical)
 * - Below-fold sections use dynamic imports
 * - Suspense boundaries enable streaming
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
            {/* Hero: Critical, loads immediately */}
            <Hero locale={locale} />

            {/* Below-fold: Streamed with Suspense */}
            <Suspense fallback={<SectionSkeleton />}>
                <BrandShowcase locale={locale} />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <Pillars locale={locale} />
            </Suspense>

            <Suspense fallback={<StatsSkeleton />}>
                <Stats locale={locale} />
            </Suspense>
        </main>
    );
}
