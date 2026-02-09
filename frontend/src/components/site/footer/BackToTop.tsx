/**
 * BackToTop — Enterprise-grade scroll-to-top button
 *
 * Features:
 * - Appears after scrolling past threshold
 * - Smooth scroll with reduced-motion respect
 * - Accessible: aria-label, focus management after scroll
 * - Animation via framer-motion with reduced-motion detection
 * - Keyboard operable: Enter/Space
 */
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
    /** Scroll distance (px) before button appears */
    threshold?: number;
    /** Accessible label */
    label?: string;
}

export function BackToTop({ threshold = 400, label = "Back to top" }: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsVisible(window.scrollY > threshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    const scrollToTop = useCallback(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "instant" : "smooth",
        });

        // Return focus to skip-nav or first focusable element
        requestAnimationFrame(() => {
            const skipNav = document.querySelector<HTMLElement>(".skip-nav-link");
            const header = document.getElementById("site-header");
            const target = skipNav || header?.querySelector<HTMLElement>("a, button");
            target?.focus({ preventScroll: true });
        });
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={scrollToTop}
                    className="back-to-top-btn"
                    aria-label={label}
                    type="button"
                >
                    <ArrowUp size={20} strokeWidth={1.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
