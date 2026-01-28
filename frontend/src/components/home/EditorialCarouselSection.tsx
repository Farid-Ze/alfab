"use client";

import { useRef, useState, useEffect, useCallback, useId } from "react";
import Image from "next/image";
import AppLink from "@/components/ui/AppLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { listProducts } from "@/lib/catalog";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { ScrollDots, ScrollProgressBar } from "@/components/ui/ScrollIndicators";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { ProductCard } from "@/components/home/ProductCard";
import { useCarousel } from "@/hooks/useCarousel";

// =============================================================================
// Types
// =============================================================================

interface EditorialCarouselSectionProps {
    heroImage?: string;
    heroImages?: string[];
    heroAlt?: string;
    kicker?: string;
    title: string;
    description?: string;
    badge?: string; // Optional badge text (e.g., "Free for Partners")
    variant?: "light" | "dark";
    maxItems?: number;
    ctaHref?: string;
    ctaLabel?: string;
}

// =============================================================================
// Sub-components
// =============================================================================

/**
 * SectionHeader - Kicker, title, and description
 */
function SectionHeader({
    kicker,
    title,
    description,
    badge,
    isDark,
    titleId,
    ctaHref,
    ctaLabel,
}: {
    kicker?: string;
    title: string;
    description?: string;
    badge?: string;
    isDark: boolean;
    titleId?: string;
    ctaHref?: string;
    ctaLabel?: string;
}) {
    return (
        <div className="text-center" style={{ marginBottom: "var(--card-padding)" }}>
            {/* Badge (e.g., "Free for Partners") */}
            {badge && (
                <span
                    className={`inline-block mb-3 px-3 py-1 type-data-strong ui-radius-tight ${isDark
                        ? "bg-background text-foreground"
                        : "bg-foreground text-background"
                        }`}
                >
                    {badge}
                </span>
            )}

            {kicker && <p className="type-kicker mb-2 sm:mb-3">{kicker}</p>}
            <h2
                id={titleId}
                className={`type-h2 mb-2 sm:mb-3 ${isDark ? "text-background" : "text-foreground"}`}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={`type-body mx-auto px-4 sm:px-0 max-w-[42rem] ${isDark ? "text-background/75" : ""}`}
                >
                    {description}
                </p>
            )}

            {ctaHref && ctaLabel ? (
                <div className="mt-4 sm:mt-5 flex justify-center">
                    <AppLink
                        href={ctaHref}
                        underline="none"
                        className={`type-ui-strong inline-flex items-center justify-center border border-border px-5 h-12 ui-radius-tight ui-focus-ring ${isDark
                            ? "bg-background text-foreground hover:bg-subtle"
                            : "bg-foreground text-background hover:bg-foreground/90"
                            }`}
                    >
                        {ctaLabel}
                    </AppLink>
                </div>
            ) : null}
        </div>
    );
}

// =============================================================================
// Main Component
// =============================================================================

/**
 * EditorialCarouselSection
 *
 * Editorial hero image with overlapping product carousel.
 * Reference: Lekker Home "Bestsellers of 2025" section.
 *
 * Features:
 * - Contained hero image (not full-bleed)
 * - Overlapping content card
 * - Linear scroll carousel with conditional arrows
 * - Mobile-first responsive design
 *
 * Clean Code:
 * - Uses shared icons from @/components/ui/icons
 * - Carousel logic extracted to useCarousel hook
 * - Sub-components for single responsibility
 */
export default function EditorialCarouselSection({
    heroImage,
    heroImages,
    heroAlt = "Lifestyle editorial",
    kicker,
    title,
    description,
    badge,
    variant = "dark",
    maxItems = 8,
    ctaHref,
    ctaLabel,
}: EditorialCarouselSectionProps) {
    const { locale } = useLocale();
    const prefersReducedMotion = usePrefersReducedMotion();
    const baseUrl = `/${locale}`;
    const sectionId = useId().replace(/:/g, "");
    const titleId = `section-title-${sectionId}`;

    const allProducts = listProducts();
    const products = allProducts.slice(0, maxItems);

    const isDark = variant === "dark";

    const {
        scrollRef,
        canScrollLeft,
        canScrollRight,
        progress: productProgress,
        thumbRatio: productThumbRatio,
        scroll,
    } = useCarousel(products.length);

    // Dependency: ProductCard must have [data-carousel-card] for useCarousel width calculation.


    // Determine if we should show the hero gallery
    const hasHeroImage = heroImage || (heroImages && heroImages.length > 0);

    const galleryImages = (() => {
        if (heroImages && heroImages.length > 0) return heroImages;
        if (heroImage) {
            const defaults = [heroImage, "/images/partnership/partner-lifestyle.jpg"];
            return Array.from(new Set(defaults));
        }
        return [];
    })();

    const heroScrollRef = useRef<HTMLDivElement>(null);
    const [canHeroScrollLeft, setCanHeroScrollLeft] = useState(false);
    const [canHeroScrollRight, setCanHeroScrollRight] = useState(galleryImages.length > 1);
    const [heroActiveIndex, setHeroActiveIndex] = useState(0);

    const updateHeroScrollState = useCallback(() => {
        const el = heroScrollRef.current;
        if (!el) return;

        if (galleryImages.length <= 1) {
            setCanHeroScrollLeft(false);
            setCanHeroScrollRight(false);
            return;
        }

        const scrollLeft = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;

        setCanHeroScrollLeft(scrollLeft > 10);
        setCanHeroScrollRight(maxScroll > 10 && scrollLeft < maxScroll - 10);

        // Active slide index for dot indicators.
        const firstSlide = el.querySelector<HTMLElement>("[data-hero-slide='true']");
        const slideWidth = firstSlide?.offsetWidth ?? el.clientWidth;
        const gap = Number.parseFloat(window.getComputedStyle(el).columnGap || "0") || 0;
        const step = slideWidth + gap;
        const idx = step > 0 ? Math.round(scrollLeft / step) : 0;

        const clampedIdx = Math.min(galleryImages.length - 1, Math.max(0, idx));
        setHeroActiveIndex((prev) => (prev === clampedIdx ? prev : clampedIdx));
    }, [galleryImages.length]);

    useEffect(() => {
        const el = heroScrollRef.current;
        if (!el) return;

        // Defer initial measurement to the next paint so scrollWidth/clientWidth are accurate.
        const raf = window.requestAnimationFrame(() => {
            updateHeroScrollState();
        });

        el.addEventListener("scroll", updateHeroScrollState, { passive: true });
        window.addEventListener("resize", updateHeroScrollState);

        return () => {
            window.cancelAnimationFrame(raf);
            el.removeEventListener("scroll", updateHeroScrollState);
            window.removeEventListener("resize", updateHeroScrollState);
        };
    }, [updateHeroScrollState]);

    const scrollHero = useCallback(
        (direction: "left" | "right") => {
            const el = heroScrollRef.current;
            if (!el) return;

            const firstSlide = el.querySelector<HTMLElement>("[data-hero-slide='true']");
            const slideWidth = firstSlide?.offsetWidth ?? el.clientWidth;
            const gap = Number.parseFloat(window.getComputedStyle(el).columnGap || "0") || 0;
            const scrollAmount = slideWidth + gap;
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        },
        [prefersReducedMotion]
    );

    const scrollHeroToIndex = useCallback(
        (index: number) => {
            const el = heroScrollRef.current;
            if (!el) return;

            const firstSlide = el.querySelector<HTMLElement>("[data-hero-slide='true']");
            const slideWidth = firstSlide?.offsetWidth ?? el.clientWidth;
            const gap = Number.parseFloat(window.getComputedStyle(el).columnGap || "0") || 0;
            const step = slideWidth + gap;
            const target = Math.min(galleryImages.length - 1, Math.max(0, index)) * step;

            el.scrollTo({
                left: target,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        },
        [galleryImages.length, prefersReducedMotion]
    );

    if (products.length === 0) {
        return null;
    }

    return (
        <section
            className={`relative ${hasHeroImage ? "py-12 sm:py-16 lg:py-20" : "lg:-mt-24 pt-0 pb-12 sm:pb-16 lg:pb-20"
                }`}
            aria-labelledby={titleId}
        >
            {/* Hero Image - Only render if heroImage is provided */}
            {hasHeroImage && (
                <div className="px-4 sm:px-6 lg:px-10">
                    <div className="relative mx-auto overflow-hidden ui-radius-tight max-w-[120rem] aspect-[1.6/1] lg:aspect-[2.5/1]">
                        {/* Horizontally scrollable hero gallery (snap) */}
                        <div
                            ref={heroScrollRef}
                            className="flex h-full w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
                            role="list"
                            aria-label={locale === "id" ? "Galeri editorial" : "Editorial gallery"}
                            tabIndex={galleryImages.length > 1 ? 0 : -1}
                            onKeyDown={(event) => {
                                if (galleryImages.length <= 1) return;
                                if (event.key === "ArrowLeft") {
                                    event.preventDefault();
                                    scrollHero("left");
                                }
                                if (event.key === "ArrowRight") {
                                    event.preventDefault();
                                    scrollHero("right");
                                }
                            }}
                        >
                            {galleryImages.map((src, idx) => (
                                <div
                                    key={`${src}-${idx}`}
                                    role="listitem"
                                    data-hero-slide="true"
                                    className="relative h-full w-full flex-shrink-0 snap-start"
                                    aria-label={`${idx + 1} / ${galleryImages.length}`}
                                >
                                    <Image
                                        src={src}
                                        alt={heroAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1920px) 96vw, 1920px"
                                        priority={idx === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Hero navigation arrows (desktop only; swipe on mobile) */}
                        <CarouselArrow
                            direction="left"
                            onClick={() => scrollHero("left")}
                            visible={canHeroScrollLeft}
                            ariaLabel={locale === "id" ? "Sebelumnya" : "Previous"}
                            topClassName="top-1/2 -translate-y-1/2"
                            className="hidden sm:flex"
                        />
                        <CarouselArrow
                            direction="right"
                            onClick={() => scrollHero("right")}
                            visible={canHeroScrollRight}
                            ariaLabel={locale === "id" ? "Berikutnya" : "Next"}
                            topClassName="top-1/2 -translate-y-1/2"
                            className="hidden sm:flex"
                        />

                        {/* Dot indicators - positioned above overlap zone */}
                        <ScrollDots
                            count={galleryImages.length}
                            activeIndex={heroActiveIndex}
                            onSelect={scrollHeroToIndex}
                            tone="onImage"
                            ariaLabel={locale === "id" ? "Navigasi galeri" : "Gallery navigation"}
                            className="absolute bottom-[calc(var(--section-overlap)+1rem)] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
                        />
                    </div>
                </div>
            )}

            {/* Content Card - Overlaps hero */}
            <div className="relative px-4 sm:px-6 lg:px-10">
                <div
                    className={`relative mx-auto ui-radius-tight max-w-[68.75rem] shadow-sm border-t border-border/20 ${isDark ? "ui-section-dark" : "bg-subtle"
                        }`}
                    style={hasHeroImage ? { marginTop: "calc(-1 * var(--section-overlap))" } : undefined}
                >
                    <div style={{ padding: "var(--card-padding)" }}>
                        {/* Section Header */}
                        <SectionHeader
                            kicker={kicker}
                            title={title}
                            description={description}
                            badge={badge}
                            isDark={isDark}
                            titleId={titleId}
                            ctaHref={ctaHref}
                            ctaLabel={ctaLabel}
                        />

                        {/* Product Carousel */}
                        <div
                            className="relative"
                            role="region"
                            aria-label={locale === "id" ? "Produk pilihan" : "Featured products"}
                        >
                            {/* Navigation Arrows - positioned at 1/4 height (center of card image) */}
                            <CarouselArrow
                                direction="left"
                                onClick={() => scroll("left")}
                                visible={canScrollLeft}
                                topClassName="top-1/4"
                                className="hidden sm:flex"
                            />
                            <CarouselArrow
                                direction="right"
                                onClick={() => scroll("right")}
                                visible={canScrollRight}
                                topClassName="top-1/4"
                                className="hidden sm:flex"
                            />

                            {/* Scrollable Product List */}
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-4"
                                role="list"
                                tabIndex={0}
                                aria-describedby={titleId}
                                onKeyDown={(event) => {
                                    if (event.key === "ArrowLeft") {
                                        event.preventDefault();
                                        scroll("left");
                                    }
                                    if (event.key === "ArrowRight") {
                                        event.preventDefault();
                                        scroll("right");
                                    }
                                }}
                            >
                                {products.map((product, idx) => (
                                    <div key={`${product.slug}-${idx}`} role="listitem">
                                        <ProductCard product={product} baseUrl={baseUrl} isDark={isDark} />
                                    </div>
                                ))}
                            </div>

                            {/* Scroll indicator */}
                            {productThumbRatio < 1 ? (
                                <ScrollProgressBar
                                    progress={productProgress}
                                    thumbRatio={productThumbRatio}
                                    tone={isDark ? "dark" : "light"}
                                    ariaLabel={locale === "id" ? "Posisi gulir" : "Scroll position"}
                                    className={isDark ? "mt-4" : "mt-4 bg-foreground/[0.85] p-3"}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
