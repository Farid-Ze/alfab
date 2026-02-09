import { type Metadata, type Viewport } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader, SiteFooter } from "@/components/site";
import { WhatsAppCTA } from "@/components/ui";
import { WebVitals } from "@/components/analytics/WebVitals";
import { type Locale, locales, isValidLocale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";
import "../globals.css";

/**
 * Font Optimization (Agency-Level)
 * - swap: Shows fallback immediately, swaps when ready
 * - preload: Handled automatically by next/font
 * - Variable font subset for smaller payload
 */
const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});


/**
 * Viewport Configuration
 * - themeColor for mobile browser chrome
 * - colorScheme for system preference
 */
export const viewport: Viewport = {
    themeColor: "#ffffff",
    colorScheme: "light",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

/**
 * Generate static params for all locales (SSG)
 */
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

/**
 * Dynamic Metadata with SEO optimization
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = isValidLocale(locale) ? locale : "id";
    const translations = t(validLocale);
    const site = translations.site as { title: string; titleTemplate: string; description: string };
    const isId = validLocale === "id";

    return {
        title: {
            default: site.title,
            template: site.titleTemplate,
        },
        description: site.description,
        alternates: {
            canonical: `/${locale}`,
            languages: { en: "/en", id: "/id" },
        },
        // OpenGraph for social sharing
        openGraph: {
            type: "website",
            locale: isId ? "id_ID" : "en_US",
            siteName: "Alfa Beauty Cosmetica",
        },
        // Robots directives
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

/**
 * Locale Layout (Agency-Level Performance)
 * 
 * Performance Features:
 * - Font preload via next/font
 * - Minimal critical CSS
 * - Optimized render blocking
 */
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return (
        <html lang={locale} className={montserrat.variable} suppressHydrationWarning>
            <body className="font-sans antialiased bg-white text-neutral-900">
                <WebVitals />

                <SiteHeader locale={locale} />

                {children}

                <SiteFooter locale={locale} />
                <WhatsAppCTA locale={locale} />
            </body>
        </html>
    );
}
