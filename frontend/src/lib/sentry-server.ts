/**
 * Initialize Sentry for server-side error tracking.
 * ITIL OPS-01: Observability and error monitoring.
 * 
 * TOGAF Design Decision: Uses `as any` intentionally for dynamic require()
 * to avoid webpack bundling Sentry (and its optional deps like Prisma/OpenTelemetry)
 * into dev builds, preventing noisy webpack warnings.
 */
export function initSentryServer() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  // Use a runtime require to avoid bundling Sentry (and its optional Prisma/OpenTelemetry deps)
  // into dev builds, which can create noisy webpack warnings.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Sentry: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req = eval("require") as any;
    Sentry = req("@sentry/nextjs");
  } catch {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: 0.1,
    debug: false,
    beforeSend(event: unknown) {
      return event as unknown;
    },
  });
}
