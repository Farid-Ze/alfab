"use client";

import { t } from "@/lib/i18n";

import { useLocale } from "@/components/i18n/LocaleProvider";
import TermsContent from "@/components/legal/TermsContent";

export default function TermsPageContent() {
  const { locale } = useLocale();
  const tx = t(locale);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="type-h2">{tx.legal.termsTitle}</h1>
      <TermsContent />
    </div>
  );
}
