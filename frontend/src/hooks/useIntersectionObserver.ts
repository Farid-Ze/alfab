"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
    ref: RefObject<HTMLElement | null>;
    isIntersecting: boolean;
    entry: IntersectionObserverEntry | null;
}

/**
 * useIntersectionObserver
 * 
 * Detects when an element enters/exits the viewport.
 * Useful for scroll animations, lazy loading, infinite scroll.
 */
export function useIntersectionObserver(
    options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
    const {
        threshold = 0,
        root = null,
        rootMargin = "0px",
        freezeOnceVisible = false,
    } = options;

    const ref = useRef<HTMLElement | null>(null);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const frozen = isIntersecting && freezeOnceVisible;

    useEffect(() => {
        const node = ref.current;
        if (!node || frozen) return;

        const observer = new IntersectionObserver(
            ([observerEntry]) => {
                setEntry(observerEntry);
                setIsIntersecting(observerEntry.isIntersecting);
            },
            { threshold, root, rootMargin }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, frozen]);

    return { ref, isIntersecting, entry };
}

export default useIntersectionObserver;
