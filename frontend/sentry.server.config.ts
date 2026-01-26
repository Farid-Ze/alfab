/**
 * Sentry Server Configuration
 * OPS-01: Incident Management (ITIL4)
 * 
 * This file configures Sentry for server-side error tracking in Next.js.
 * Errors in API routes (e.g., /api/leads) will be captured here.
 */
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,

        // Environment tagging for filtering in Sentry dashboard
        environment: process.env.NODE_ENV || "development",

        // Performance Monitoring (optional, can be disabled for Paket A)
        tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

        // Debugging: Enable in development only
        debug: process.env.NODE_ENV !== "production",

        // Release tracking (auto-set by Vercel)
        // release: process.env.VERCEL_GIT_COMMIT_SHA,

        // Hooks for additional context
        beforeSend(event: Sentry.ErrorEvent) {
            // COBIT: Redact PII before sending to Sentry
            // This is a placeholder - add actual PII scrubbing rules here
            return event;
        },
    });
}

export { Sentry };
