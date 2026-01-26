export type LogLevel = "info" | "warn" | "error" | "debug";

type LogEntry = {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, unknown>;
};

/**
 * Structured Logger (ITIL Observability)
 * Outputs JSON logs for ingestion by Datadog/Splunk/CloudWatch.
 * Handles automatic timestamping and redaction placeholders.
 */
class Logger {
    private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            context,
        };
        // In production, this would go to stdout (container log collector)
        // In development, we pretty print for readability if needed, but JSON is safer.
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
    }
}

export const logger = new Logger();
