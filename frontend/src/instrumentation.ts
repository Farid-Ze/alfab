/**
 * Next.js Instrumentation
 * 
 * This file is called once when a new Next.js server instance is initiated.
 * Used for:
 * - Setting up OpenTelemetry
 * - Initializing logging
 * - Registering monitoring hooks
 * 
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
    // Only run on server
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // Initialize server-side services
        const { initializeLogger } = await import("@/lib/logger");
        initializeLogger();

        console.log("[instrumentation] Server initialized", {
            nodeVersion: process.version,
            env: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
        });
    }

    // Edge runtime specific initialization
    if (process.env.NEXT_RUNTIME === "edge") {
        console.log("[instrumentation] Edge runtime initialized");
    }
}

/**
 * Called when uncaught exception occurs
 * Useful for error reporting services like Sentry
 */
export function onRequestError(
    error: Error,
    request: { path: string; method: string },
    context: { routerKind: string; routePath: string; revalidateReason: string }
) {
    // Log error with context
    console.error("[instrumentation] Request error", {
        error: error.message,
        stack: error.stack,
        path: request.path,
        method: request.method,
        routePath: context.routePath,
        routerKind: context.routerKind,
    });

    // TODO: Send to error reporting service (Sentry, etc.)
    // if (typeof Sentry !== "undefined") {
    //     Sentry.captureException(error, { extra: context });
    // }
}
