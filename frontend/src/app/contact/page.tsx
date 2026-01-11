import type { Metadata } from "next";

import WhatsAppLink from "@/components/site/WhatsAppLink";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Alfa Beauty Cosmetica.",
};

export default function ContactPage() {
  const fallbackEmail = process.env.NEXT_PUBLIC_FALLBACK_EMAIL;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="text-zinc-700">
        For consultation, product recommendations, and partnership inquiries, reach us via WhatsApp.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <WhatsAppLink className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800">
          WhatsApp Consult
        </WhatsAppLink>
        {fallbackEmail ? (
          <a
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            href={`mailto:${fallbackEmail}`}
          >
            Email
          </a>
        ) : null}
      </div>
    </div>
  );
}
