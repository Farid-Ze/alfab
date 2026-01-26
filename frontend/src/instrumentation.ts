/**
 * Next.js Instrumentation Hook
 * OPS-01: Observability (ITIL4)
 * 
 * This file is automatically loaded by Next.js 16+ for server-side instrumentation.
 * It initializes Sentry before any request is processed.
 */
export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        // Import server config only on Node.js runtime
        await import("../sentry.server.config");
    }

    if (process.env.NEXT_RUNTIME === "edge") {
        // Edge runtime: Sentry has limited support, but we can still import
        await import("../sentry.server.config");
    }
}

/**
 * onRequestError Hook (Next.js 16+)
 * Automatically captures unhandled errors in API routes and pages.
 */
export function onRequestError(
    error: { digest: string } & Error,
    request: {
        path: string;
        method: string;
        headers: Record<string, string>;
    },
    context: {
        routerKind: "Pages Router" | "App Router";
        routePath: string | undefined;
        routeType: "render" | "route";
        renderSource: "react-server-components" | "react-server-components-payload" | undefined;
        revalidateReason: "on-demand" | "stale" | undefined;
        renderType: "dynamic" | "dynamic-resume" | undefined;
    }
) {
    // Log structured error for CloudWatch/Datadog ingestion
    console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        message: error.message,
        digest: error.digest,
        path: request.path,
        method: request.method,
        routerKind: context.routerKind,
        routePath: context.routePath,
        routeType: context.routeType,
    }));

    // Forward to Sentry if available
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        import("@sentry/nextjs").then((Sentry) => {
            Sentry.captureException(error, {
                extra: {
                    path: request.path,
                    method: request.method,
                    routerKind: context.routerKind,
                    routePath: context.routePath,
                },
            });
        });
    }
}
