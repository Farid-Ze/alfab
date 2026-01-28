import { useRef, useState, useEffect, useCallback } from "react";

// =============================================================================
// Constants (Reference: Lekker Home specs)
// =============================================================================

const SPECS = {
    productGap: 16, // Gap between product cards (matches Tailwind gap-4)
} as const;


/**
 * useCarousel - Manages carousel scroll state and navigation
 * Extracted for reusability and testability
 */
export function useCarousel(itemCount: number) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [progress, setProgress] = useState(0);
    const [thumbRatio, setThumbRatio] = useState(1);

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;

        if (itemCount <= 1) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }

        const scrollLeft = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;

        const ratio = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
        const p = maxScroll > 0 ? scrollLeft / maxScroll : 0;

        setThumbRatio(Math.min(1, Math.max(0, ratio)));
        setProgress(Math.min(1, Math.max(0, p)));

        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(maxScroll > 10 && scrollLeft < maxScroll - 10);
    }, [itemCount]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        updateScrollState();
        window.addEventListener("resize", updateScrollState);
        el.addEventListener("scroll", updateScrollState, { passive: true });

        return () => {
            window.removeEventListener("resize", updateScrollState);
            el.removeEventListener("scroll", updateScrollState);
        };
    }, [updateScrollState]);

    const scroll = useCallback((direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;

        // Get actual card width from first card element (CSS-controlled)
        const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");
        const cardWidth = firstCard?.offsetWidth ?? 260;
        const scrollAmount = cardWidth + SPECS.productGap;
        el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    }, []);

    return {
        scrollRef,
        canScrollLeft,
        canScrollRight,
        progress,
        thumbRatio,
        scroll,
    };
}
