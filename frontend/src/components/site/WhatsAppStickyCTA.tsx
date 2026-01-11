"use client";

import WhatsAppLink from "@/components/site/WhatsAppLink";

export default function WhatsAppStickyCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <WhatsAppLink
        className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        prefill={process.env.NEXT_PUBLIC_WHATSAPP_PREFILL}
      >
        WhatsApp Consult
      </WhatsAppLink>
    </div>
  );
}
