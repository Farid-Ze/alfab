export type LogLevel = "info" | "warn" | "error" | "debug";

type LogEntry = {
    timestamp: string;
    level: LogLevel;
    message: string;
    requestId?: string;
    context?: Record<string, unknown>;
};

/**
 * Structured Logger (ITIL Observability - OPS-01)
 * Outputs JSON logs for ingestion by Datadog/Splunk/CloudWatch.
 * Handles automatic timestamping, request ID propagation, and Sentry forwarding.
 */
class Logger {
    private requestId?: string;

    /**
     * Set the request ID for the current context.
     * Call this in middleware or at the start of an API route.
     */
    setRequestId(id: string) {
        this.requestId = id;
    }

    private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            requestId: this.requestId,
            context,
        };
        // In production, this would go to stdout (container log collector)
        console.log(JSON.stringify(entry));
    }

    info(message: string, context?: Record<string, unknown>) {
        this.log("info", message, context);
    }

    warn(message: string, context?: Record<string, unknown>) {
        this.log("warn", message, context);
    }

    error(message: string, context?: Record<string, unknown>) {
        this.log("error", message, context);

        // Forward to Sentry if available (OPS-01)
        if (typeof window === "undefined" && process.env.NEXT_PUBLIC_SENTRY_DSN) {
            import("@sentry/nextjs").then((Sentry) => {
                Sentry.captureMessage(message, {
                    level: "error",
                    extra: { ...context, requestId: this.requestId },
                });
            }).catch(() => {
                // Sentry not available, fail silently
            });
        }
    }
}

export const logger = new Logger();

