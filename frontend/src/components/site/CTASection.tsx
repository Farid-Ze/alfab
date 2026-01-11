import Link from "next/link";

import WhatsAppLink from "@/components/site/WhatsAppLink";

export default function CTASection() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Need help choosing products?</h2>
          <p className="text-sm leading-6 text-zinc-700">
            Message us on WhatsApp for consultation, product recommendations, and ordering.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <WhatsAppLink className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800">
            WhatsApp Consult
          </WhatsAppLink>
          <Link
            href="/partnership/become-partner"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Become Partner
          </Link>
        </div>
      </div>
    </section>
  );
}
