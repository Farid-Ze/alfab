"use client";

/**
 * Global Error Boundary
 * 
 * Catches errors in the root layout that other error boundaries can't handle.
 * Must include html and body tags since root layout may have failed.
 * Self-contained with inline bilingual strings — no external imports
 * to avoid cascading failures.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // Detect locale from URL pathname (self-contained, no external imports)
    const isId = typeof window !== "undefined"
        ? window.location.pathname.startsWith("/id")
        : true; // Default to Indonesian

    const text = {
        title: isId ? "Kesalahan Aplikasi" : "Application Error",
        description: isId
            ? "Terjadi kesalahan kritis. Silakan muat ulang halaman."
            : "A critical error occurred. Please refresh the page.",
        retry: isId ? "Coba lagi" : "Try again",
    };

    // Log error for debugging
    if (typeof console !== "undefined") {
        console.error("[GlobalError]", error.message, error.digest);
    }

    return (
        <html lang={isId ? "id" : "en"}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    fontFamily: "system-ui, sans-serif",
                }}>
                    <div style={{ textAlign: "center", maxWidth: "400px" }}>
                        <h1 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: "#1a1a1a",
                        }}>
                            {text.title}
                        </h1>
                        <p style={{
                            color: "#666",
                            marginBottom: "1.5rem",
                        }}>
                            {text.description}
                        </p>
                        <button
                            type="button"
                            onClick={reset}
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#1a1a1a",
                                color: "white",
                                border: "none",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                        >
                            {text.retry}
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
