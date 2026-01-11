import Link from "next/link";

import CTASection from "@/components/site/CTASection";
import Pillars from "@/components/site/Pillars";
import ProductHighlights from "@/components/site/ProductHighlights";

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Professional B2B Beauty Distribution
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Products, education, and technical support for salons & barbershops.
          </h1>
          <p className="text-base leading-7 text-zinc-700 sm:text-lg">
            PT Alfa Beauty is a professional beauty distribution company dedicated to providing products,
            education, and technical support for salons and barbershops in Indonesia.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Explore Products
            </Link>
            <Link
              href="/partnership/become-partner"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Become Partner
            </Link>
          </div>
          <p className="text-sm text-zinc-600">
            No public pricing. For consultation and product recommendations, contact us via WhatsApp.
          </p>
        </div>
      </section>

      <Pillars />
      <ProductHighlights />
      <CTASection />
    </div>
  );
}
