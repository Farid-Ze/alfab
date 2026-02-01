import type { Metadata } from "next";

import PartnershipPageClient from "@/components/partnership/PartnershipPageClient";
import { normalizeLocale, t } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return {
    title: tx.nav.partnership,
    description: tx.seo.partnershipDescription,
    alternates: {
      canonical: `/${resolved}/partnership`,
      languages: {
        en: "/en/partnership",
        id: "/id/partnership",
      },
    },
  };
}

export default function PartnershipPage() {
  return <PartnershipPageClient />;
}
