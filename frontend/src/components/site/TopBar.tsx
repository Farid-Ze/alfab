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
import { topBarData, socialLinks } from "./header";

const TOPBAR_DISMISSED_KEY = "alfa-topbar-dismissed";

// Find the Shopee link from navigation data
const shopeeLink = socialLinks.find((s) => s.id === "shopee");

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
            className="topbar w-full print:hidden"
            role="complementary"
            aria-label={translations.nav?.announcements || "Announcements"}
        >
            <div className="flex items-center justify-between h-full px-4 sm:px-10">
                {/* Left spacer for centering on desktop */}
                <div className="hidden lg:flex items-center min-w-[120px]" />

                {/* Center: promo text */}
                <p className="text-[11px] sm:text-xs tracking-wide text-center flex-1 lg:flex-none">{promoText}</p>

                {/* Right: Shopee link + dismiss */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-[120px] justify-end">
                    {shopeeLink && (
                        <a
                            href={shopeeLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-block text-[11px] sm:text-xs font-medium tracking-wide text-[var(--topbar-shopee-text)] hover:text-white transition-colors duration-150 uppercase whitespace-nowrap"
                        >
                            {getTranslation(translations as Record<string, unknown>, "topbar.shopeeLabel")}
                        </a>
                    )}
                    <button
                        onClick={handleDismiss}
                        className="p-1 text-neutral-500 hover:text-neutral-200 transition-colors duration-200 shrink-0"
                        aria-label={translations.nav?.dismissAnnouncement || "Dismiss announcement"}
                    >
                        <X size={14} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
