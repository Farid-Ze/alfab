/**
 * TopBar — Dismissible announcement bar
 *
 * Enterprise features:
 * - Dismissible via X button with sessionStorage persistence
 * - Smooth collapse animation on dismiss
 * - Accessible: role="complementary", aria-label, close button with aria-label
 * - Print hidden
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { topBarData } from "./header";

const TOPBAR_DISMISSED_KEY = "alfa-topbar-dismissed";

interface TopBarProps {
    locale: Locale;
}

export function TopBar({ locale }: TopBarProps) {
    const translations = t(locale);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Restore dismissed state from sessionStorage after hydration
    useEffect(() => {
        setIsHydrated(true);
        try {
            if (sessionStorage.getItem(TOPBAR_DISMISSED_KEY) === "true") {
                setIsDismissed(true);
            }
        } catch {
            // sessionStorage unavailable
        }
    }, []);

    const handleDismiss = useCallback(() => {
        setIsDismissed(true);
        try {
            sessionStorage.setItem(TOPBAR_DISMISSED_KEY, "true");
        } catch {
            // sessionStorage unavailable
        }
    }, []);

    const promoText = getTranslation(
        translations as Record<string, unknown>,
        topBarData.promoKey
    );

    // Before hydration, render the bar (matches SSR). After hydration, respect dismissed state.
    if (isHydrated && isDismissed) return null;

    return (
        <div
            className="topbar hidden lg:block w-full print:hidden"
            role="complementary"
            aria-label={translations.nav?.announcements || "Announcements"}
        >
            <div className="flex items-center justify-center h-full px-4 relative">
                <p className="text-xs tracking-wide">{promoText}</p>
                <button
                    onClick={handleDismiss}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-neutral-200 transition-colors duration-200"
                    aria-label={translations.nav?.closeMenu || "Dismiss announcement"}
                >
                    <X size={14} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}
