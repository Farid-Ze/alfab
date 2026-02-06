"use client";

/**
 * Global Error Boundary
 * 
 * Catches errors in the root layout that other error boundaries can't handle
 * Must include html and body tags since root layout may have failed
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
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
                            Application Error
                        </h1>
                        <p style={{
                            color: "#666",
                            marginBottom: "1.5rem",
                        }}>
                            A critical error occurred. Please refresh the page.
                        </p>
                        <button
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
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
