"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollPosition {
    x: number;
    y: number;
    direction: "up" | "down" | null;
    isAtTop: boolean;
    isAtBottom: boolean;
}

/**
 * useScrollPosition Hook
 * 
 * Tracks scroll position with direction detection.
 * Useful for hide-on-scroll headers, progress bars, etc.
 * 
 * @example
 * const { y, direction, isAtTop } = useScrollPosition();
 * 
 * // Hide header on scroll down
 * const showHeader = direction === "up" || isAtTop;
 */
export function useScrollPosition(threshold = 10): ScrollPosition {
    const [position, setPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        direction: null,
        isAtTop: true,
        isAtBottom: false,
    });

    const handleScroll = useCallback(() => {
        const x = window.scrollX;
        const y = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        setPosition((prev) => {
            const diff = y - prev.y;

            // Only change direction if scroll exceeds threshold
            let direction = prev.direction;
            if (Math.abs(diff) >= threshold) {
                direction = diff > 0 ? "down" : "up";
            }

            return {
                x,
                y,
                direction,
                isAtTop: y <= 0,
                isAtBottom: y + windowHeight >= documentHeight - 10,
            };
        });
    }, [threshold]);

    useEffect(() => {
        // Set initial position
        handleScroll();

        // Add scroll listener with passive option for performance
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return position;
}

/**
 * useScrollProgress Hook
 * 
 * Returns scroll progress as percentage (0-100).
 */
export function useScrollProgress(): number {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;

            const scrollable = documentHeight - windowHeight;
            const scrolled = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;

            setProgress(Math.min(100, Math.max(0, scrolled)));
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return progress;
}

export default useScrollPosition;
