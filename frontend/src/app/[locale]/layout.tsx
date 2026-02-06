import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader, SiteFooter } from "@/components/site";
import { type Locale, locales, isValidLocale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";
import "../globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

/**
 * Generate static params for all locales
 * This enables static generation for all locale routes
 */
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata per locale for SEO
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const isId = locale === "id";

    return {
        title: {
            default: isId
                ? "Alfa Beauty Cosmetica - Mitra Distribusi Kecantikan Profesional"
                : "Alfa Beauty Cosmetica - Professional Beauty Distribution Partner",
            template: isId ? "%s | Alfa Beauty" : "%s | Alfa Beauty",
        },
        description: isId
            ? "Produk, edukasi, dan dukungan teknis untuk salon & barbershop di Indonesia"
            : "Products, education, and technical support for salons & barbershops in Indonesia",
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: "/en",
                id: "/id",
            },
        },
    };
}

/**
 * Locale Layout
 * 
 * Root layout for locale routes with proper html lang attribute
 * Following Next.js 16 pattern: params is a Promise
 */
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!isValidLocale(locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={montserrat.variable}>
            <body className="font-sans antialiased">
                <SiteHeader locale={locale} />
                <main className="min-h-screen">{children}</main>
                <SiteFooter locale={locale} />
            </body>
        </html>
    );
}

