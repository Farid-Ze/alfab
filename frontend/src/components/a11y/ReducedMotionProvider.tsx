"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ReducedMotionContextType = {
    prefersReducedMotion: boolean;
};

const ReducedMotionContext = createContext<ReducedMotionContextType>({
    prefersReducedMotion: false,
});

/**
 * ReducedMotionProvider: Respects user's motion preferences.
 * Design V2 accessibility pattern - WCAG 2.2 AA compliance.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
            {children}
        </ReducedMotionContext.Provider>
    );
}

/**
 * Hook to check if user prefers reduced motion.
 */
export function useReducedMotion() {
    return useContext(ReducedMotionContext);
}

