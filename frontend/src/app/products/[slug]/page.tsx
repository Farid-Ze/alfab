import type { Metadata } from "next";
import Link from "next/link";

import WhatsAppLink from "@/components/site/WhatsAppLink";
import { getProductBySlug, listProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProductBySlug(params.slug);
  if (!p) return { title: "Product" };
  return {
    title: p.name,
    description: p.summary,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) {
    return (
      <div className="space-y-3">
        <p className="text-zinc-700">Product not found.</p>
        <Link href="/products" className="text-sm font-semibold text-zinc-900 underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <nav className="text-sm text-zinc-600">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <span className="px-2">/</span>
        <span className="text-zinc-900">{p.name}</span>
      </nav>

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{p.brand}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{p.name}</h1>
        <p className="max-w-3xl text-zinc-700">{p.summary}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold">Key benefits</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700">
              {p.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold">How to use</h2>
            <p className="mt-3 text-zinc-700 whitespace-pre-line">{p.howToUse}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-base font-semibold">Consult & request recommendations</h2>
            <p className="mt-2 text-sm text-zinc-700">
              No public pricing. Message us on WhatsApp for suitability, usage guidance, and ordering.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <WhatsAppLink
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
                prefill={`Hi Alfa Beauty, I’d like to consult about ${p.name}.`}
              >
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

          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-base font-semibold">Recommended for</h2>
            <ul className="mt-3 space-y-1 text-sm text-zinc-700">
              <li>
                <span className="font-medium text-zinc-900">Audience:</span> {p.audience.join(", ")}
              </li>
              <li>
                <span className="font-medium text-zinc-900">Functions:</span> {p.functions.join(", ")}
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
