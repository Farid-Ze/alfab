import type { Metadata } from "next";

import ProductFilters from "@/components/products/ProductFilters";
import ProductsHeader from "@/components/products/ProductsHeader";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our curated professional product portfolio. No public pricing.",
};

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductsHeader />

      <ProductFilters />
    </div>
  );
}
