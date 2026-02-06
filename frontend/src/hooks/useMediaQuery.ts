"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants";

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * useMediaQuery Hook
 * 
 * Detects if viewport matches a media query.
 * 
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDesktop = useMediaQuery("md"); // Uses breakpoint shorthand
 */
export function useMediaQuery(query: string | Breakpoint): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Convert breakpoint shorthand to media query
        const mediaQuery =
            query in BREAKPOINTS
                ? `(min-width: ${BREAKPOINTS[query as Breakpoint]}px)`
                : query;

        const media = window.matchMedia(mediaQuery);

        // Set initial value
        setMatches(media.matches);

        // Create listener
        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Add listener
        media.addEventListener("change", listener);

        // Cleanup
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

/**
 * Convenience hooks for common breakpoints
 */
export function useIsMobile(): boolean {
    return !useMediaQuery("md");
}

export function useIsTablet(): boolean {
    const isMd = useMediaQuery("md");
    const isLg = useMediaQuery("lg");
    return isMd && !isLg;
}

export function useIsDesktop(): boolean {
    return useMediaQuery("lg");
}

export default useMediaQuery;
