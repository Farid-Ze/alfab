import type { Metadata } from "next";

import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Alfa Beauty Cosmetica.",
};

export default function ContactPage() {
  const fallbackEmail = process.env.NEXT_PUBLIC_FALLBACK_EMAIL;

  return <ContactContent fallbackEmail={fallbackEmail} />;
}
