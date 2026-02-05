"use client";

import { useState, useEffect } from "react";

interface SectorNavigationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    showOnMobile?: boolean;
}

/**
 * SectorNavigation - Pagination + arrow controls for Sectors Section
 * 
 * Features (from ineo-sense):
 * - Page indicator: "1 • 2" format
 * - Arrow buttons with touch-target sizing
 * - Mobile: hidden by default (uses swipe)
 * - Desktop: always visible
 * - Uses CSS utility classes for transitions and colors
 */
export default function SectorNavigation({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    showOnMobile = false,
}: SectorNavigationProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia?.("(min-width: 1024px)");
        if (!mq) return;
        const update = () => setIsDesktop(Boolean(mq.matches));
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const shouldShow = showOnMobile || isDesktop;
    if (!shouldShow) return null;

    return (
        <nav
            aria-label="Sector navigation"
            className="flex flex-col items-start gap-4"
        >
            {/* Pagination indicator */}
            <div className="type-data text-sectors-accent">
                {Array.from({ length: totalPages }, (_, i) => (
                    <span key={i}>
                        <span
                            className={
                                i + 1 === currentPage
                                    ? "font-semibold"
                                    : "opacity-50"
                            }
                        >
                            {i + 1}
                        </span>
                        {i < totalPages - 1 && (
                            <span className="mx-1.5 opacity-40">•</span>
                        )}
                    </span>
                ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex flex-col gap-2">
                <button
                    onClick={onPrev}
                    disabled={currentPage <= 1}
                    className="touch-target w-11 h-11 ui-radius-pill border border-sectors-accent-20 bg-transparent flex items-center justify-center transition-all-elegant hover:border-sectors-accent hover:bg-sectors-accent-5 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous sector"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-sectors-accent"
                        strokeWidth="2"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={onNext}
                    disabled={currentPage >= totalPages}
                    className="touch-target w-11 h-11 ui-radius-pill border border-sectors-accent-20 bg-transparent flex items-center justify-center transition-all-elegant hover:border-sectors-accent hover:bg-sectors-accent-5 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next sector"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="stroke-sectors-accent"
                        strokeWidth="2"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
