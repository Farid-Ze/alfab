import type { Metadata } from "next";

import ProductDetailContent from "@/components/products/ProductDetailContent";
import { getProductBySlug, listProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product" };
  return {
    title: p.name,
    description: p.summary,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProductBySlug(slug);

  return <ProductDetailContent product={p ?? null} />;
}
