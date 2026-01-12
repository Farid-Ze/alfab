"use client";

import ButtonLink from "@/components/ui/ButtonLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

export default function NotFound() {
  const { locale } = useLocale();
  const tx = t(locale);

  return (
    <div className="mx-auto max-w-2xl space-y-4 text-center">
      <h1 className="type-h2">{tx.system.notFound.title}</h1>
      <p className="type-body text-zinc-700">{tx.system.notFound.body}</p>
      <ButtonLink href="/">{tx.system.notFound.backHome}</ButtonLink>
    </div>
  );
}
