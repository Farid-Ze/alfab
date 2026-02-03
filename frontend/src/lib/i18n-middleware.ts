import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function handleI18nRouting(request: NextRequest): NextResponse | null {
    const pathname = request.nextUrl.pathname;

    // Never locale-prefix internal/API routes.
    if (
        pathname.startsWith("/api/") ||
        pathname === "/api" ||
        pathname.startsWith("/maintenance") ||
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml" ||
        pathname === "/manifest.webmanifest"
    ) {
        return null;
    }

    const cookieLocale = request.cookies.get("alfab_locale")?.value;
    const preferredLocale = cookieLocale === "id" || cookieLocale === "en" ? cookieLocale : "en";

    // 1. Root Redirect -> Default to cookie locale (fallback: /en)
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = `/${preferredLocale}`;
        return NextResponse.redirect(url);
    }

    // 2. Locale Enforcement (Resilience)
    // Check if path starts with a supported locale
    const pathnameIsMissingLocale = ["/en", "/id"].every(
        (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale
    );

    // Redirect if locale is missing (e.g. /products -> /en/products)
    if (pathnameIsMissingLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${preferredLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
        return NextResponse.redirect(url);
    }

    return null;
}
