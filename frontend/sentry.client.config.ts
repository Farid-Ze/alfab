/**
 * Sentry Client Configuration
 * OPS-01: Incident Management (ITIL4)
 * 
 * This file configures Sentry for client-side error tracking in Next.js.
 * Unhandled JavaScript errors in the browser will be captured here.
 */
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,

        // Environment tagging
        environment: process.env.NODE_ENV || "development",

        // Performance Monitoring
        // Adjust this value for production to reduce costs
        tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

        // Session Replay (optional - disabled for Paket A to save quota)
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0,

        // Debugging
        debug: process.env.NODE_ENV !== "production",

        // Integration configuration
        integrations: [
            Sentry.browserTracingIntegration(),
            // Sentry.replayIntegration(), // Enable if needed
        ],
    });
}
