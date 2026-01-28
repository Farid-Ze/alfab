import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleI18nRouting } from "@/lib/i18n-middleware";

/**
 * Next.js Middleware
 * 
 * Responsibilities:
 * 1. **Internationalization (i18n)**: Detects user locale and redirects/rewrites paths.
 * 2. **Security Headers**: Sets CSP, HSTS, and other security headers via `next.config.ts` (often delegated, but middleware can handle dynamic ones).
 * 3. **Routing**: Handles root redirection to default locale.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Traceability: Generate Request ID (ITIL)
    // Propagated to all downstream logs and services.
    const requestHeaders = new Headers(request.headers);
    const requestId = crypto.randomUUID();
    requestHeaders.set("x-request-id", requestId);

    // Expert Mode: Standard Sub-path Routing (Best Practice)
    // We do NOT use suffix rewriting (.en) as it fights the framework.
    // Logic extracted to lib/i18n-middleware.ts (TOGAF Decoupling)

    // 0. ITIL 4: Maintenance Mode Check (High Priority)
    // Bypasses all routing if enabled.
    if (process.env.MAINTENANCE_MODE === "true" && !pathname.startsWith("/maintenance")) {
        // Allow access to static assets even in maintenance mode
        return NextResponse.redirect(new URL("/maintenance", request.url));
    }

    // 1. & 2. Handle I18n Routing
    const i18nResponse = handleI18nRouting(request);
    if (i18nResponse) return i18nResponse;

    // 3. Pass headers (including Trace ID)
    requestHeaders.set("Server-Timing", `trace;desc="${requestId}"`);

    // 4. Content Security Policy (Nonce-based) - Phase 5
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    // We set the nonce in the request header so it can be read by server components (if needed)
    requestHeaders.set("x-nonce", nonce);

    // Construct CSP (Strict, removing unsafe-inline for scripts)
    // Note: We keep 'unsafe-eval' for Next.js dev mode (hot reload), but prompt to remove in prod if possible.
    // Actually, 'unsafe-eval' is often required by Next in Dev. In Prod it might be removable.
    // For now, we replicate the next.config.ts policy but with 'nonce-...' instead of 'unsafe-inline' for scripts.
    const isDev = process.env.NODE_ENV !== "production";

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""};
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https://cdn.brandfetch.io https://*.supabase.co https://placehold.co;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://*.supabase.co https://*.sentry.io https://vitals.vercel-insights.com https://www.google-analytics.com;
        object-src 'none';
        base-uri 'none';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, " ").trim();

    // Create the response
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Set the CSP header on the response
    response.headers.set("Content-Security-Policy", cspHeader);

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
