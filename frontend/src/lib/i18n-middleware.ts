import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function handleI18nRouting(request: NextRequest): NextResponse | null {
    const pathname = request.nextUrl.pathname;

    // 1. Root Redirect -> Default to /id
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = "/id";
        return NextResponse.redirect(url);
    }

    // 2. Locale Enforcement (Resilience)
    // Check if path starts with a supported locale
    const pathnameIsMissingLocale = ["/en", "/id"].every(
        (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale
    );

    // Redirect if locale is missing (e.g. /products -> /id/products)
    if (pathnameIsMissingLocale) {
        const url = request.nextUrl.clone();
        url.pathname = `/id${pathname.startsWith("/") ? "" : "/"}${pathname}`;
        return NextResponse.redirect(url);
    }

    return null;
}
