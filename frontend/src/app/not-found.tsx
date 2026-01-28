import ButtonLink from "@/components/ui/ButtonLink";

/**
 * Global 404 fallback (outside locale routes).
 * Redirects to / so middleware handles locale detection.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 px-4 text-center">
      <div className="space-y-4">
        <h1 className="type-h1 text-foreground">404</h1>
        <h2 className="type-h3 text-foreground/80">Page not found</h2>
        <p className="type-body text-muted max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/" variant="primary">
          Back to Home
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact Support
        </ButtonLink>
      </div>

      <div className="pt-8 border-t border-border w-full max-w-sm">
        <p className="type-ui-sm text-muted">
          Error Code: <span className="font-mono">HTTP_404_NOT_FOUND</span>
        </p>
      </div>
    </div>
  );
}
