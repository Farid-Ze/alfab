import type { Product } from "@/lib/types";

import products from "@/content/products.json";

export function listProducts(): Product[] {
  return products as Product[];
}

export function allProductSlugs(): string[] {
  return listProducts().map((p) => p.slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return listProducts().find((p) => p.slug === slug);
}
