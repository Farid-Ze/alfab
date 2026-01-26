"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";

// Global error boundary page (Next.js App Router).
// Paket A UX hardening: provide a friendly fallback instead of a blank screen.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Best-effort console logging for local debugging.
    // Server-side logging is handled by the Lead API / infra.
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h2 className="type-h2">Something went wrong!</h2>
          <p className="type-body text-muted-strong">
            Please try again. If the issue persists, contact technical support.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button type="button" onClick={() => reset()} variant="primary">
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Go home
          </ButtonLink>
        </div>

        {error?.digest ? (
          <p className="type-data text-muted mt-4">Ref: {error.digest}</p>
        ) : null}
      </div>
    </div>
  );
}
