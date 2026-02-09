/**
 * useHoverIntent — Debounced hover for mega menus
 *
 * Prevents accidental triggers when the cursor crosses a nav link
 * and provides a grace period when moving from the trigger to the
 * mega menu panel (safe-triangle pattern).
 *
 * Returns handlers for both the nav item AND the mega menu panel.
 */
"use client";

import { useRef, useCallback } from "react";

interface UseHoverIntentOptions {
    /** Called with the item id when a menu should open */
    onOpen: (id: string) => void;
    /** Called when all menus should close */
    onClose: () => void;
    /** Delay before opening on hover (ms) — prevents fly-through triggers */
    openDelay?: number;
    /** Grace period after mouse leaves before closing (ms) — safe triangle */
    closeDelay?: number;
}

export function useHoverIntent({
    onOpen,
    onClose,
    openDelay = 60,
    closeDelay = 200,
}: UseHoverIntentOptions) {
    const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelTimers = useCallback(() => {
        if (openTimer.current) {
            clearTimeout(openTimer.current);
            openTimer.current = null;
        }
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    }, []);

    /** Attach to nav item onMouseEnter */
    const handleNavEnter = useCallback(
        (id: string) => {
            cancelTimers();
            openTimer.current = setTimeout(() => {
                onOpen(id);
                openTimer.current = null;
            }, openDelay);
        },
        [onOpen, openDelay, cancelTimers]
    );

    /** Attach to nav item onMouseLeave */
    const handleNavLeave = useCallback(() => {
        cancelTimers();
        closeTimer.current = setTimeout(() => {
            onClose();
            closeTimer.current = null;
        }, closeDelay);
    }, [onClose, closeDelay, cancelTimers]);

    /** Attach to mega menu panel onMouseEnter — cancels close countdown */
    const handlePanelEnter = useCallback(() => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        if (openTimer.current) {
            clearTimeout(openTimer.current);
            openTimer.current = null;
        }
    }, []);

    /** Attach to mega menu panel onMouseLeave — starts close countdown */
    const handlePanelLeave = useCallback(() => {
        cancelTimers();
        closeTimer.current = setTimeout(() => {
            onClose();
            closeTimer.current = null;
        }, closeDelay);
    }, [onClose, closeDelay, cancelTimers]);

    /** Immediate close (keyboard Escape, link click, etc.) */
    const closeImmediate = useCallback(() => {
        cancelTimers();
        onClose();
    }, [onClose, cancelTimers]);

    return {
        handleNavEnter,
        handleNavLeave,
        handlePanelEnter,
        handlePanelLeave,
        closeImmediate,
    };
}
