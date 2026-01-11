import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partnership",
  description: "Become a partner and get professional distribution support.",
};

export default function PartnershipPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Partnership</h1>
        <p className="text-zinc-700">
          We work as a strategic partner for salons and barbershops: curated products, education, and
          technical support.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Curated portfolio",
            body: "Access carefully selected brands supported by real-world technical knowledge.",
          },
          {
            title: "Education & support",
            body: "Training, product knowledge, and support to help your team deliver consistent results.",
          },
          {
            title: "B2B-first",
            body: "Designed for professionals — no retail gimmicks, no public pricing.",
          },
        ].map((x) => (
          <div key={x.title} className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-base font-semibold">{x.title}</h2>
            <p className="mt-2 text-sm text-zinc-700">{x.body}</p>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-base font-semibold">Ready to become a partner?</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Submit your details and we’ll follow up. Your lead is stored durably before we confirm success.
        </p>
        <div className="mt-4">
          <Link
            href="/partnership/become-partner"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Become Partner
          </Link>
        </div>
      </div>
    </div>
  );
}
