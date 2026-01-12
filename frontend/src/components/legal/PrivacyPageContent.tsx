"use client";

import { t } from "@/lib/i18n";

import { useLocale } from "@/components/i18n/LocaleProvider";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

export default function PrivacyPageContent() {
  const { locale } = useLocale();
  const tx = t(locale);

  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="type-h2">{tx.legal.privacyTitle}</h1>
      <PrivacyPolicyContent />
    </div>
  );
}
