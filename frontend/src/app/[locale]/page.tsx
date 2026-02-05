import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import { normalizeLocale, t } from "@/lib/i18n";
import { listArticles, listEvents, calculateReadTime } from "@/lib/education";

// Homepage Components (from /home/ - domain-based structure)
import VideoHeroSection from "@/components/home/VideoHeroSection";
import IntroStatement from "@/components/home/IntroStatement";
import SolutionsSection from "@/components/home/SolutionsSection";
import SectionHeader from "@/components/home/SectionHeader";
import BrandShowcase from "@/components/home/BrandShowcase";
import EducationHighlightsSection from "@/components/home/EducationHighlightsSection";
import SectorsSection from "@/components/home/SectorsSection";
import ClosingStatement from "@/components/home/ClosingStatement";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * Homepage - PT Alfa Beauty Cosmetica
 * 
 * Creative Layout (based on ineo-sense visual analysis):
 * 
 * 1. VideoHeroSection - Full viewport with video + headline + 2 CTAs
 * 2. IntroStatement - 2-column: Large text LEFT + pill CTA RIGHT
 * 3. SolutionsSection - 3 pillars with timeline storytelling + pagination
 * 4. BrandShowcase - 4 cards with line art + nav arrows
 * 5. EducationHighlights - Articles & events grid
 * 6. ClosingStatement - Centered commitment text
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);

  return {
    title: tx.nav.home,
    description: tx.seo.homeDescription,
    alternates: {
      canonical: `/${resolved}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = normalizeLocale(locale);
  const tx = t(resolved);
  const base = `/${resolved}`;
  const isId = resolved === "id";

  // Brand data (from reference.md - 4 brands)
  const brands = [
    { name: "Alfaparf Milano Professional", country: "Italy", flag: "🇮🇹" },
    { name: "Farmavita", country: "Italy", flag: "🇮🇹" },
    { name: "Montibello", country: "Spain", flag: "🇪🇸" },
    { name: "Gamma+ Professional", country: "Italy", flag: "🇮🇹" },
  ];

  // Fetch education data for highlights
  const rawArticles = listArticles(resolved);
  const articles = rawArticles.map((a) => ({
    ...a,
    readTime: calculateReadTime(a.body),
  }));
  const events = listEvents(resolved);

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
          1. VIDEO HERO SECTION
          Full viewport, video background, centered content
         ═══════════════════════════════════════════════════════════════ */}
      <VideoHeroSection
        headline={tx.home.hero.title}
        subHeadline={tx.home.hero.lede}
        ctaPrimary={{
          label: tx.home.hero.ctaExplore,
          href: `${base}/products`,
        }}
        ctaSecondary={{
          label: tx.home.hero.ctaPartner,
          href: `${base}/partnership`,
        }}
        videoSrc="/videos/hero-bg.mp4"
        posterSrc="/images/hero-poster.jpg"
      />

      {/* ═══════════════════════════════════════════════════════════════
          2. INTRO STATEMENT (ineo-sense 2-column pattern)
          Large text LEFT + pill CTA RIGHT
         ═══════════════════════════════════════════════════════════════ */}
      <IntroStatement
        text={tx.home.about.body}
        ctaLabel={isId ? "Lihat semua layanan" : "View all our sectors"}
        ctaHref={`${base}/about`}
      />

      {/* ═══════════════════════════════════════════════════════════════
          2.5. SECTORS SECTION (ineo-sense business sectors pattern)
          Mint background + 3 sector cards + navigation
         ═══════════════════════════════════════════════════════════════ */}
      <SectorsSection
        headline={tx.home.sectors.headline}
        ctaText={tx.home.sectors.cta}
        ctaHref={`${base}/about`}
        sectors={tx.home.sectors.items.map((item: { id: string; title: string; description: string }) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          illustration: `/images/sectors/${item.id}-line.svg`,
          href: `${base}/about#${item.id}`,
        }))}
      />

      {/* ═══════════════════════════════════════════════════════════════
          3. SOLUTIONS SECTION (3 Pillars with timeline storytelling)
          Uses existing advanced component with drag scroll + timeline
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="ui-container">
          <ScrollReveal>
            <SectionHeader
              title={tx.home.roleIndustry.title}
              body={tx.home.roleIndustry.body}
              currentPage={1}
              totalPages={3}
              showPagination={true}
            />
          </ScrollReveal>
          <SolutionsSection pillars={tx.home.about.pillars} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. BRAND SHOWCASE (ineo-sense card grid pattern)
          4 brands with line art illustrations + nav arrows
         ═══════════════════════════════════════════════════════════════ */}
      <BrandShowcase
        title={tx.home.brands.title}
        body={tx.home.brands.body}
        brands={brands}
        ctaLabel={tx.home.hero.ctaExplore}
        ctaHref={`${base}/products`}
      />

      {/* ═══════════════════════════════════════════════════════════════
          5. EDUCATION HIGHLIGHTS
          Articles & Events grid
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="ui-container">
          <ScrollReveal>
            <SectionHeader
              title={tx.home.education.title}
              body={tx.home.education.body}
            />
          </ScrollReveal>
          <EducationHighlightsSection
            localeBase={base}
            articles={articles}
            events={events}
            leftLabel={tx.education.hub.sections.articles}
            rightLabel={tx.education.hub.sections.events}
            readMoreLabel={tx.ui.readMore}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. CLOSING STATEMENT
          Centered commitment text
         ═══════════════════════════════════════════════════════════════ */}
      <ClosingStatement text={tx.home.closing.body} />

      <Footer />
    </div>
  );
}
