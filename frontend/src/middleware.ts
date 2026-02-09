import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Enterprise Middleware
 * 
 * Features:
 * - Locale routing with Accept-Language detection
 * - Security headers (CSP, HSTS)
 * - Cache-Control for static assets
 * - Brotli/Gzip hint
 */

const locales = ["en", "id"];
const defaultLocale = "id"; // Indonesian default for B2B Indonesia

// Browser locale detection
function getPreferredLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get("Accept-Language");
    if (!acceptLanguage) return defaultLocale;

    // Parse Accept-Language header
    const preferred = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().substring(0, 2))
        .find((lang) => locales.includes(lang));

    return preferred || defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and API routes
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return addPerformanceHeaders(NextResponse.next(), true);
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        const response = addPerformanceHeaders(NextResponse.next(), false);
        // Set x-url header for locale detection in not-found.tsx
        response.headers.set("x-url", request.url);
        return response;
    }

    // Redirect to preferred locale (browser detection)
    const preferredLocale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale}${pathname}`;
    return addPerformanceHeaders(NextResponse.redirect(url), false);
}

/**
 * Add Security + Performance Headers
 */
function addPerformanceHeaders(response: NextResponse, isStatic: boolean): NextResponse {
    // Content Security Policy (strict but functional)
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://*.supabase.co",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
    ].join("; ");

    response.headers.set("Content-Security-Policy", csp);

    // HSTS (production only)
    if (process.env.NODE_ENV === "production") {
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );
    }

    // Cache-Control based on resource type
    if (isStatic) {
        // Immutable for static assets (1 year)
        response.headers.set(
            "Cache-Control",
            "public, max-age=31536000, immutable"
        );
    } else {
        // Stale-while-revalidate for HTML
        response.headers.set(
            "Cache-Control",
            "public, max-age=0, s-maxage=60, stale-while-revalidate=600"
        );
    }

    // Compression hint (Vercel handles actual compression)
    response.headers.set("Accept-Encoding", "br, gzip");

    // Note: Early Hints for fonts not needed - next/font handles via CDN

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
