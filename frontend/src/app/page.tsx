import CTASection from "@/components/site/CTASection";
import Pillars from "@/components/site/Pillars";
import ProductHighlights from "@/components/site/ProductHighlights";
import HomeHero from "@/components/home/HomeHero";

export default function Home() {
  return (
    <div className="space-y-14">
      <HomeHero />

      <Pillars />
      <ProductHighlights />
      <CTASection />
    </div>
  );
}
