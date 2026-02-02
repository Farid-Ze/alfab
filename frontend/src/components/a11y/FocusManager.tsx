"use client";

import { useEffect } from "react";

/**
 * FocusManager: Ensures focus is properly managed with Lenis scroll.
 * Design V2 accessibility pattern - syncs focus with smooth scroll.
 */
export default function FocusManager() {
    useEffect(() => {
        // Handle hash navigation focus
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    // Wait for Lenis to complete scroll
                    setTimeout(() => {
                        (element as HTMLElement).focus({ preventScroll: true });
                    }, 600); // Match Lenis duration
                }
            }
        };

        window.addEventListener("hashchange", handleHashChange);

        // Initial hash check
        handleHashChange();

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return null;
}
