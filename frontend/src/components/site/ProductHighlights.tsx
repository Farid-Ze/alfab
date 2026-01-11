import Link from "next/link";

import { listProducts } from "@/lib/catalog";

export default function ProductHighlights() {
  const products = listProducts().slice(0, 3);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Featured products</h2>
          <p className="text-sm text-zinc-700">A quick look at our curated portfolio.</p>
        </div>
        <Link href="/products" className="text-sm font-semibold text-zinc-900 underline">
          View all
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{p.brand}</p>
            <p className="mt-2 text-base font-semibold">{p.name}</p>
            <p className="mt-2 text-sm text-zinc-700 line-clamp-3">{p.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
