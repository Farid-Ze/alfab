/**
 * useHeaderScroll - Scroll behavior hook for header
 * 
 * Handles:
 * - Background change on scroll
 * - Smart visibility (hide on down, show on up)
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useHeader } from "./HeaderContext";

interface UseHeaderScrollOptions {
    /** Scroll threshold to trigger background change */
    threshold?: number;
    /** Whether to enable smart hide/show behavior */
    enableSmartScroll?: boolean;
}

export function useHeaderScroll(options: UseHeaderScrollOptions = {}) {
    const { threshold = 50, enableSmartScroll = true } = options;
    const { setScrolled, setVisible, isMobileOpen, activeMenu } = useHeader();
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;

        // 1. Handle Background State
        setScrolled(scrollY > threshold);

        // 2. Handle Smart Visibility
        if (enableSmartScroll) {
            // Always show if at top, navigation is open, or mobile menu is open
            if (scrollY < threshold || isMobileOpen || activeMenu) {
                setVisible(true);
            } else {
                // Determine direction
                const direction = scrollY > lastScrollY.current ? "down" : "up";
                const isScrollingUp = direction === "up";

                // Show when scrolling up, hide when scrolling down
                setVisible(isScrollingUp);
            }
        }

        lastScrollY.current = scrollY;
        ticking.current = false;
    }, [threshold, enableSmartScroll, setScrolled, setVisible, isMobileOpen, activeMenu]);

    // Throttled scroll handler
    const onScroll = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(handleScroll);
            ticking.current = true;
        }
    }, [handleScroll]);

    useEffect(() => {
        handleScroll(); // Initial check
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll, handleScroll]);
}
