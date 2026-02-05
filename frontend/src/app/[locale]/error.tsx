"use client";

import { useEffect } from "react";

import { t } from "@/lib/i18n";

import { useLocale } from "@/components/i18n/LocaleProvider";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLocale();
  const tx = t(locale);
  const base = `/${locale}`;

  useEffect(() => {
    // ITIL OPS-01: Forward to Sentry for structured observability
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error);
      });
    }
  }, [error]);

  return (
    <Page className="flex items-center justify-center">
      <Container className="max-w-2xl space-y-3">
        <h1 className="type-h2">{tx.system.error.title}</h1>
        <p className="type-body">{tx.system.error.body}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" onClick={() => reset()}>
            {tx.system.error.actions.tryAgain}
          </Button>
          <ButtonLink href={base} variant="secondary">
            {tx.system.error.actions.goHome}
          </ButtonLink>
        </div>
        {error?.digest ? <p className="type-data text-muted-soft">{tx.system.error.ref}: {error.digest}</p> : null}
      </Container>
    </Page>
  );
}
