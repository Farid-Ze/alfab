"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "./SectionHeader";
import type { BrandShowcaseProps } from "@/types/home";

/**
 * BrandShowcase - ineo-sense style card grid
 *
 * Uses CSS design tokens for consistent styling:
 * - ui-brand-card class for card styling
 * - ui-scrollbar-hidden for scroll hiding
 * - type-* classes for typography
 */

export default function BrandShowcase({
    title,
    body,
    brands,
    ctaLabel,
    ctaHref,
}: BrandShowcaseProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    // Check viewport
    useEffect(() => {
        const mq = window.matchMedia?.("(min-width: 1024px)");
        if (!mq) return;
        const update = () => setIsDesktop(Boolean(mq.matches));
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // Navigation handlers
    const scrollTo = (direction: "prev" | "next") => {
        if (!trackRef.current) return;
        const container = trackRef.current;
        const cardWidth = container.firstElementChild?.clientWidth ?? 300;
        const gap = 24;
        const scrollAmount = direction === "next" ? cardWidth + gap : -(cardWidth + gap);
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Track scroll position for pagination
    useEffect(() => {
        const container = trackRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = container.firstElementChild?.clientWidth ?? 300;
            const gap = 24;
            const index = Math.round(scrollLeft / (cardWidth + gap));
            setActiveIndex(Math.max(0, Math.min(index, brands.length - 1)));
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [brands.length]);

    // Brand illustrations (fallback to generic)
    const illustrations = [
        "/images/solutions/connect-line.svg",
        "/images/solutions/build-line.svg",
        "/images/solutions/support-line.svg",
        "/images/solutions/connect-line.svg",
    ];

    return (
        <section className="py-24 lg:py-32 bg-panel overflow-hidden">
            <div className="ui-container">
                <ScrollReveal>
                    <SectionHeader
                        title={title}
                        body={body}
                        currentPage={activeIndex + 1}
                        totalPages={brands.length}
                        showPagination={!isDesktop}
                    />
                </ScrollReveal>

                {/* Card Grid (mobile: horizontal scroll, desktop: grid) */}
                <div className="relative">
                    <ScrollReveal stagger>
                        <div
                            ref={trackRef}
                            className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 lg:pb-0 cursor-grab lg:cursor-default active:cursor-grabbing ui-scrollbar-hidden"
                        >
                            {brands.map((brand, idx) => (
                                <div
                                    key={brand.name}
                                    className="shrink-0 snap-start snap-card-brand sm:snap-card-sm lg:min-w-0"
                                >
                                    <div className="ui-brand-card relative overflow-hidden h-full transition-all-elegant group">
                                        {/* Decorative number */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute top-3 left-4 type-watermark-md text-foreground/[0.03]"
                                        >
                                            0{idx + 1}
                                        </div>

                                        {/* Line art illustration (background) */}
                                        <Image
                                            src={brand.illustration || illustrations[idx % illustrations.length] || ""}
                                            alt=""
                                            aria-hidden="true"
                                            width={180}
                                            height={180}
                                            className="absolute -bottom-8 -right-8 w-[80%] max-w-[180px] opacity-15 group-hover:opacity-25 transition-opacity-elegant"
                                        />

                                        {/* Content */}
                                        <div className="relative">
                                            {/* Flag */}
                                            <div className="text-4xl mb-4">{brand.flag}</div>

                                            {/* Brand Name */}
                                            <h3 className="type-h3 text-foreground mb-1">
                                                {brand.name}
                                            </h3>

                                            {/* Country */}
                                            <p className="type-ui-xs text-muted mb-6">{brand.country}</p>

                                            {/* Know more CTA (ineo-sense style) */}
                                            <div className="flex items-center gap-2 type-ui-xs font-medium text-foreground-muted group-hover:text-foreground transition-colors-elegant">
                                                <span className="text-ineo-teal">•</span>
                                                <span>Know more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Navigation Arrows (desktop only) */}
                    <div className="hidden lg:flex mt-8 gap-3">
                        <button
                            onClick={() => scrollTo("prev")}
                            disabled={activeIndex === 0}
                            className="w-12 h-12 ui-radius-pill border border-border bg-background flex items-center justify-center transition-all duration-[var(--transition-base)] hover:border-foreground hover:shadow-[var(--shadow-sm)] disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Previous"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollTo("next")}
                            disabled={activeIndex >= brands.length - 1}
                            className="w-12 h-12 ui-radius-pill border border-border bg-background flex items-center justify-center transition-all duration-[var(--transition-base)] hover:border-foreground hover:shadow-[var(--shadow-sm)] disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Next"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Section CTA */}
                {ctaLabel && ctaHref && (
                    <ScrollReveal>
                        <div className="mt-12 lg:mt-16">
                            <a
                                href={ctaHref}
                                className="group inline-flex items-center gap-3 type-ui text-foreground-muted hover:text-foreground transition-colors duration-[var(--transition-base)]"
                            >
                                <span className="transition-transform duration-[var(--transition-base)] group-hover:translate-x-1 text-ineo-teal">
                                    →
                                </span>
                                {ctaLabel}
                            </a>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </section>
    );
}
