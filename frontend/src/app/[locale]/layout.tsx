import { type Metadata, type Viewport } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader, SiteFooter, MaintenancePage } from "@/components/site";
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
    // Preload only critical weights
    weight: ["400", "500", "600", "700"],
});

/**
 * Viewport Configuration
 * - themeColor for mobile browser chrome
 * - colorScheme for system preference
 */
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    ],
    colorScheme: "light dark",
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
    const isId = locale === "id";

    return {
        title: {
            default: isId
                ? "Alfa Beauty Cosmetica - Mitra Distribusi Kecantikan Profesional"
                : "Alfa Beauty Cosmetica - Professional Beauty Distribution Partner",
            template: "%s | Alfa Beauty",
        },
        description: isId
            ? "Produk, edukasi, dan dukungan teknis untuk salon & barbershop di Indonesia"
            : "Products, education, and technical support for salons & barbershops in Indonesia",
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
 * - Resource Hints (dns-prefetch, preconnect)
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
            <head>
                {/* Resource Hints for external domains */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

                {/* Preconnect for critical resources */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="font-sans antialiased bg-white text-neutral-900">
                <WebVitals />

                <SiteHeader locale={locale} />

                <main className="min-h-screen container mx-auto px-4 py-8">
                    {/* Maintenance Mode - Override page content */}
                    <MaintenancePage />

                    {/* Original Page Content (Hidden)
                    {children}
                    */}
                </main>

                <SiteFooter locale={locale} />
                <WhatsAppCTA />
            </body>
        </html>
    );
}
