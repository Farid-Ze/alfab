import Link from "next/link";
import { type Locale, t } from "@/lib/i18n";

interface HeroProps {
    locale: Locale;
}

export function Hero({ locale }: HeroProps) {
    const translations = t(locale);
    const hero = translations.home.hero as {
        headline: string;
        subheadline: string;
        cta: { products: string; partner: string };
    };

    return (
        <section className="section bg-gradient-to-b from-neutral-50 to-white">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-800 mb-6 text-balance">
                        {hero.headline}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
                        {hero.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/${locale}/products` as `/${string}`} className="btn btn-primary">
                            {hero.cta.products}
                        </Link>
                        <Link href={`/${locale}/partnership` as `/${string}`} className="btn btn-secondary">
                            {hero.cta.partner}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
