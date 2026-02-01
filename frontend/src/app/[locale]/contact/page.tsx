import type { Metadata } from "next";

import ContactPageClient from "@/components/contact/ContactPageClient";
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
    title: tx.nav.contact,
    description: tx.seo.contactDescription,
    alternates: {
      canonical: `/${resolved}/contact`,
      languages: {
        en: "/en/contact",
        id: "/id/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
