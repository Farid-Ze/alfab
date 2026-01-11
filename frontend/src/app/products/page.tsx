import type { Metadata } from "next";

import ProductFilters from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our curated professional product portfolio. No public pricing.",
};

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-zinc-700">
          Curated products for salons and barbershops. No public pricing — contact us via WhatsApp for
          consultation and recommendations.
        </p>
      </header>

      <ProductFilters />
    </div>
  );
}
