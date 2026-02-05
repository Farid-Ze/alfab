"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { Sector } from "@/types/sector";
import SectorCard from "./SectorCard";
import SectorNavigation from "./SectorNavigation";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface SectorsSectionProps {
    headline: string;
    ctaText: string;
    ctaHref: string;
    sectors: Sector[];
}

/**
 * SectorsSection - Business Sectors grid with ineo-sense styling
 *
 * Uses CSS design tokens for consistent styling:
 * - Background: bg-sectors class
 * - Text colors: text-sectors-accent utility class
 * - Scrollbar hiding: ui-scrollbar-hidden
 * - Transitions: transition-all-elegant utility class
 */
export default function SectorsSection({
    headline,
    ctaText,
    ctaHref,
    sectors,
}: SectorsSectionProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sectors.length / 3) || 1;

    // Track scroll position for pagination
    useEffect(() => {
        const container = trackRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = container.firstElementChild?.clientWidth ?? 300;
            const gap = 24;
            const index = Math.round(scrollLeft / (cardWidth + gap));
            const page = Math.floor(index / 3) + 1;
            setCurrentPage(Math.max(1, Math.min(page, totalPages)));
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [totalPages]);

    const scrollTo = (direction: "prev" | "next") => {
        if (!trackRef.current) return;
        const container = trackRef.current;
        const cardWidth = container.firstElementChild?.clientWidth ?? 300;
        const gap = 24;
        const cardsToScroll = 3;
        const scrollAmount =
            direction === "next"
                ? (cardWidth + gap) * cardsToScroll
                : -(cardWidth + gap) * cardsToScroll;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    if (!sectors.length) return null;

    return (
        <section className="py-24 lg:py-32 overflow-hidden bg-sectors">
            <div className="ui-container">
                {/* Header: Headline + CTA */}
                <ScrollReveal>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12 mb-12 lg:mb-16">
                        {/* Headline */}
                        <h2 className="type-h1 text-sectors-accent max-w-section-header leading-tight">
                            {headline}
                        </h2>

                        {/* CTA Button */}
                        <Link
                            href={ctaHref}
                            className="group shrink-0 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border-2 border-sectors-accent text-sectors-accent type-ui-strong transition-all-elegant hover:bg-sectors-accent hover:text-white"
                        >
                            <span className="transition-transform transition-base group-hover:translate-x-1">
                                •
                            </span>
                            {ctaText}
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Cards Grid with Navigation */}
                <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
                    {/* Navigation (left side on desktop) */}
                    <div className="hidden lg:block">
                        <SectorNavigation
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrev={() => scrollTo("prev")}
                            onNext={() => scrollTo("next")}
                            showOnMobile={false}
                        />
                    </div>

                    {/* Cards */}
                    <ScrollReveal stagger>
                        <div
                            ref={trackRef}
                            className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 lg:pb-0 cursor-grab lg:cursor-default active:cursor-grabbing ui-scrollbar-hidden"
                        >
                            {sectors.map((sector, idx) => (
                                <div
                                    key={sector.id}
                                    className="shrink-0 snap-start snap-card-mobile sm:snap-card-sm lg:min-w-0"
                                >
                                    <SectorCard sector={sector} index={idx} />
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
