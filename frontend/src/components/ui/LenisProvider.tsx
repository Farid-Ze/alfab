"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/components/a11y/ReducedMotionProvider";

/**
 * LenisProvider: Smooth scroll wrapper for Design V2.
 * Uses Lenis for butter-smooth scrolling with elegant easing.
 * 
 * Usage: Wrap your layout content with this component.
 * Add data-lenis-prevent attribute to elements that should not be affected.
 */
export default function LenisProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);
    const { prefersReducedMotion } = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Elegant easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [prefersReducedMotion]);

    return <>{children}</>;
}
