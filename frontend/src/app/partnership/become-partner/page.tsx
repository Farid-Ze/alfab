import type { Metadata } from "next";

import LeadForm from "@/components/lead/LeadForm";

export const metadata: Metadata = {
  title: "Become Partner",
  description: "Submit your details to become an Alfa Beauty partner.",
};

export default function BecomePartnerPage() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Become a Partner</h1>
        <p className="text-zinc-700">
          Tell us a bit about your business. Our team will follow up within 24 hours.
        </p>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-700">
          <p className="font-medium text-zinc-900">What happens next</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>We review your details and reach out via WhatsApp/phone/email.</li>
            <li>We recommend suitable products and training options.</li>
            <li>No public pricing — consultation happens via WhatsApp.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 p-6">
        <LeadForm />
      </div>
    </div>
  );
}
