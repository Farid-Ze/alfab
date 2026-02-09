import pino from "pino";

/**
 * Structured Logger
 * 
 * Enterprise-grade logging with:
 * - JSON format for production (machine-readable)
 * - Pretty format for development (human-readable)
 * - Log levels (trace, debug, info, warn, error, fatal)
 * - Request ID tracking
 * - Automatic timestamp
 */

// Logger configuration
const isDev = process.env.NODE_ENV === "development";

// Create base logger
const baseLogger = pino({
    level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),

    // Add default fields to all logs
    base: {
        env: process.env.NODE_ENV,
        service: "alfa-beauty-web",
    },

    // Custom timestamp format
    timestamp: pino.stdTimeFunctions.isoTime,

    // Pretty print in development
    ...(isDev && {
        transport: {
            target: "pino/file",
            options: { destination: 1 }, // stdout
        },
    }),

    // Redact sensitive fields
    redact: {
        paths: [
            "password",
            "token",
            "authorization",
            "cookie",
            "*.password",
            "*.token",
        ],
        censor: "[REDACTED]",
    },
});

// Logger type
export type Logger = pino.Logger;

// Export logger instance
export const logger = baseLogger;

/**
 * Create child logger with request context
 */
export function createRequestLogger(requestId: string, path?: string) {
    return logger.child({
        requestId,
        path,
    });
}

/**
 * Initialize logger (called from instrumentation.ts)
 */
export function initializeLogger() {
    logger.info({
        msg: "Logger initialized",
        logLevel: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
    });
}

/**
 * Log levels helper
 */
export const log = {
    trace: (msg: string, data?: object) => logger.trace(data, msg),
    debug: (msg: string, data?: object) => logger.debug(data, msg),
    info: (msg: string, data?: object) => logger.info(data, msg),
    warn: (msg: string, data?: object) => logger.warn(data, msg),
    error: (msg: string, data?: object) => logger.error(data, msg),
    fatal: (msg: string, data?: object) => logger.fatal(data, msg),
};

export default logger;
