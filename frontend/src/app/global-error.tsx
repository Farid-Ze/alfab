"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger";

/**
 * Global Error Boundary (App Router)
 * Catches errors thrown in the Root Layout.
 * MUST include <html> and <body> tags as it replaces the root layout.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to logger (hooks to Sentry)
        logger.error("[GlobalError] Root layout failure", {
            message: error.message,
            digest: error.digest
        });
    }, [error]);

    return (
        <html>
            <body className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
                <p className="mb-8 text-gray-500">
                    Critical application failure. Please try refreshing.
                </p>
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-black text-white rounded font-medium disabled:opacity-50"
                >
                    Try Again
                </button>
            </body>
        </html>
    );
}
