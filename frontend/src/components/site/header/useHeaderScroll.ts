/**
 * useHeaderScroll — Enterprise-grade scroll behavior
 *
 * State machine:
 * - full:    At top of page → show utility row + nav row
 * - hidden:  Scrolling down past threshold → slide header up
 * - compact: Scrolling up while below threshold → show nav-only row
 * - full:    Back to top → restore full header
 *
 * Enterprise features:
 * - Scroll progress tracking (0–100) for progress bar
 * - Viewport resize handler: auto-close mobile nav on desktop
 * - Batched dispatch via useReducer (1 dispatch = 1 render max)
 * - Volatile state in refs for stable scroll handler (no stale closures)
 */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, type HeaderMode } from "./ScrollContext";
import { useMenu } from "./MenuContext";

interface UseHeaderScrollOptions {
    /** Scroll threshold to trigger state changes */
    threshold?: number;
    /** Minimum scroll delta to trigger hide/show (prevents jitter) */
    scrollDelta?: number;
}

export function useHeaderScroll(options: UseHeaderScrollOptions = {}) {
    const { threshold = 20, scrollDelta = 5 } = options;
    const { dispatch } = useScroll();
    const { isMobileOpen, activeMenu, setMobileOpen } = useMenu();

    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    // Store volatile values in refs so handleScroll deps stay stable
    const isMobileOpenRef = useRef(isMobileOpen);
    const activeMenuRef = useRef(activeMenu);
    useEffect(() => { isMobileOpenRef.current = isMobileOpen; }, [isMobileOpen]);
    useEffect(() => { activeMenuRef.current = activeMenu; }, [activeMenu]);

    // Track last dispatched values — skip no-op dispatches
    const last = useRef<{ isScrolled: boolean; isVisible: boolean; headerMode: HeaderMode; scrollProgress: number }>({
        isScrolled: false,
        isVisible: true,
        headerMode: "full",
        scrollProgress: 0,
    });

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY.current;
        const isScrolled = scrollY > threshold;

        // Calculate scroll progress (0–100)
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = docHeight > 0 ? Math.min(100, Math.round((scrollY / docHeight) * 100)) : 0;

        // Start from current state (deadzone preserves these)
        let isVisible = last.current.isVisible;
        let headerMode = last.current.headerMode;

        if (isMobileOpenRef.current || activeMenuRef.current) {
            isVisible = true;
            headerMode = scrollY <= threshold ? "full" : "compact";
        } else if (scrollY <= threshold) {
            isVisible = true;
            headerMode = "full";
        } else if (delta > scrollDelta) {
            isVisible = false;
            headerMode = "hidden";
        } else if (delta < -scrollDelta) {
            isVisible = true;
            headerMode = "compact";
        }
        // else: deadzone — keep current isVisible and headerMode

        const prev = last.current;
        if (
            prev.isScrolled !== isScrolled ||
            prev.isVisible !== isVisible ||
            prev.headerMode !== headerMode ||
            prev.scrollProgress !== scrollProgress
        ) {
            last.current = { isScrolled, isVisible, headerMode, scrollProgress };
            dispatch({ type: "SCROLL_UPDATE", isScrolled, isVisible, headerMode, scrollProgress });
        }

        lastScrollY.current = scrollY;
        ticking.current = false;
    }, [threshold, scrollDelta, dispatch]);

    // Throttled scroll handler via rAF
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

    // ─── Resize handler: auto-close mobile nav when viewport exceeds lg breakpoint ───
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMobileOpenRef.current) {
                setMobileOpen(false);
            }
        };
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, [setMobileOpen]);
}
