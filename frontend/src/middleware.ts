import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for locale routing
 * 
 * Auto-redirects requests without locale prefix to default locale (en)
 * Also adds security headers (CSP)
 */

const locales = ["en", "id"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and API routes
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") // files with extensions
    ) {
        return addSecurityHeaders(NextResponse.next());
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return addSecurityHeaders(NextResponse.next());
    }

    // Redirect to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return addSecurityHeaders(NextResponse.redirect(url));
}

/**
 * Add CSP and other security headers
 * Per paket-a.md §15 Security Headers Baseline
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
    // Content Security Policy
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
        "style-src 'self' 'unsafe-inline'", // Required for inline styles
        "img-src 'self' data: https:",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https:",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
    ].join("; ");

    response.headers.set("Content-Security-Policy", csp);

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
