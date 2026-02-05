"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ui/ErrorState";

// Global error boundary page (Next.js App Router).
// Paket A UX hardening: provide a friendly fallback instead of a blank screen.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ITIL OPS-01: Forward to Sentry for structured observability
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error);
      });
    }
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      {/* TOGAF Design Decision: Root error.tsx is outside [locale] layout, 
          so we default to /id (primary market). See [locale]/error.tsx for localized version. */}
      <ErrorState
        title="Something went wrong!"
        description="Please try again. If the issue persists, contact technical support."
        retry={reset}
        showHome={true}
        homeHref="/id"
        homeLabel="Back to Home"
      />
      {error?.digest && (
        <div className="fixed bottom-4 right-4 type-legal text-muted opacity-50 font-mono">
          Ref: {error.digest}
        </div>
      )}
    </div>
  );
}
