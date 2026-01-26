"use client";

import { useEffect } from "react";
import "./globals.css";

// Note: We avoid next/font/google here to prevent build-time fetch timeouts (BLD-03/04).
// Instead, we rely on the manual CSS import in globals.css.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log validity of error to error service (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4 text-center font-sans" style={{ fontFamily: 'var(--font-inter)' }}>
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="type-h2">Something went wrong</h1>
            <p className="type-body text-muted-strong">
              A critical error occurred. We apologize for the inconvenience.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="ui-btn-primary ui-radius-tight px-6 py-2.5"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
