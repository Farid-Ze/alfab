"use client";

/**
 * SiteHeader — Enterprise-grade header component
 *
 * Features beyond standard UI libraries:
 * ─── Accessibility (WCAG 2.1 AA) ────────────────────────────
 * - Skip navigation link (bypass to #main-content)
 * - Roving tabindex: ArrowLeft/Right/Home/End across nav items
 * - Focus management: returns focus to trigger on mega menu close
 * - Screen reader live region announcements
 * - aria-current="page" for active route
 * - aria-expanded, aria-haspopup, role="menubar" / role="menuitem"
 * - Print: hidden via print:hidden CSS class
 *
 * ─── Performance ─────────────────────────────────────────────
 * - Separated ScrollContext/MenuContext (only the slice that changed re-renders)
 * - useReducer with referential-equality bailout in ScrollContext
 * - Volatile state in refs for zero-dep scroll handler
 * - Dynamic import for MobileNav (no SSR, code-split)
 * - CSS data-attribute driven transitions (no inline style churn)
 *
 * ─── UX ──────────────────────────────────────────────────────
 * - Scroll progress bar indicator
 * - Hover intent with safe-triangle grace period
 * - Mega menu backdrop overlay
 * - Auto-close mobile nav on viewport resize to desktop
 * - Reduced motion automatic detection
 */

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { type Locale, t } from "@/lib/i18n";
import {
    HeaderProvider,
    useScroll,
    useMenu,
    useHeaderScroll,
    useHoverIntent,
    navigationItems,
} from "./header";
import { MegaMenu } from "./MegaMenu";
import { TopBar } from "./TopBar";
import { BrandLogo } from "./BrandLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const MobileNav = dynamic(
    () => import("./MobileNav").then((m) => ({ default: m.MobileNav })),
    { ssr: false }
);

/* ─── Skip Navigation Link ─────────────────────────────────── */
function SkipNavLink() {
    return (
        <a href="#main-content" className="skip-nav-link">
            Skip to main content
        </a>
    );
}

/* ─── Scroll Progress Bar ──────────────────────────────────── */
function ScrollProgressBar() {
    const { scrollProgress } = useScroll();

    return (
        <div
            className="scroll-progress-track"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        >
            <div
                className="scroll-progress-bar"
                style={{ transform: `scaleX(${scrollProgress / 100})` }}
            />
        </div>
    );
}

/* ─── Screen Reader Live Region ────────────────────────────── */
function SrAnnouncement({ message }: { message: string }) {
    return (
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {message}
        </div>
    );
}

/* ─── Inner Header (consumes context) ──────────────────────── */
function SiteHeaderInner({ locale }: { locale: Locale }) {
    const { isScrolled, isVisible, headerMode } = useScroll();
    const { isMobileOpen, setMobileOpen, activeMenu, setActiveMenu } = useMenu();
    const translations = t(locale);
    const pathname = usePathname();
    const pathWithoutLocale = pathname.replace(/^\/(en|id)/, "") || "/";

    // Refs for roving tabindex keyboard navigation
    const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const triggerRef = useRef<HTMLAnchorElement | null>(null);

    useHeaderScroll({ threshold: 20, scrollDelta: 5 });

    const isCompact = headerMode === "compact";

    // Stable close callback
    const closeMenu = useCallback(() => setActiveMenu(null), [setActiveMenu]);

    // Hover intent — debounced open + grace period close
    const {
        handleNavEnter,
        handleNavLeave,
        handlePanelEnter,
        handlePanelLeave,
        closeImmediate,
    } = useHoverIntent({
        onOpen: setActiveMenu,
        onClose: closeMenu,
    });

    /* ─── Roving Tabindex Keyboard Handler ─────────────────── */
    const handleNavKeyDown = useCallback(
        (e: React.KeyboardEvent, index: number, itemId: string, hasMegaMenu: boolean) => {
            const items = navItemRefs.current.filter(Boolean) as HTMLAnchorElement[];
            const count = items.length;

            switch (e.key) {
                case "ArrowRight": {
                    e.preventDefault();
                    const next = (index + 1) % count;
                    items[next]?.focus();
                    break;
                }
                case "ArrowLeft": {
                    e.preventDefault();
                    const prev = (index - 1 + count) % count;
                    items[prev]?.focus();
                    break;
                }
                case "Home": {
                    e.preventDefault();
                    items[0]?.focus();
                    break;
                }
                case "End": {
                    e.preventDefault();
                    items[count - 1]?.focus();
                    break;
                }
                case "ArrowDown":
                case "Enter":
                case " ": {
                    if (hasMegaMenu) {
                        e.preventDefault();
                        triggerRef.current = items[index] ?? null;
                        setActiveMenu(itemId);
                    }
                    break;
                }
                case "Escape": {
                    closeImmediate();
                    triggerRef.current?.focus();
                    break;
                }
            }
        },
        [setActiveMenu, closeImmediate]
    );

    /* ─── Focus-return on mega menu close ──────────────────── */
    const handleMegaMenuClose = useCallback(() => {
        closeImmediate();
        requestAnimationFrame(() => {
            triggerRef.current?.focus();
        });
    }, [closeImmediate]);

    // Resolve active nav item for the single MegaMenu instance
    const activeNavItem = useMemo(
        () => navigationItems.find((n) => n.id === activeMenu && n.megaMenu) ?? null,
        [activeMenu]
    );

    // Screen reader announcement for menu state
    const srMessage = activeMenu
        ? `${translations.nav?.[activeMenu as keyof typeof translations.nav] || activeMenu} menu expanded`
        : "";

    // Close mega menu when route changes
    useEffect(() => {
        setActiveMenu(null);
    }, [pathname, setActiveMenu]);

    return (
        <>
            <SkipNavLink />
            <SrAnnouncement message={srMessage} />

            <TopBar locale={locale} />

            <header
                id="site-header"
                className="sticky top-0 w-full bg-white border-b border-b-transparent print:hidden"
                data-scrolled={isScrolled}
                data-visible={isVisible}
                data-mode={headerMode}
                role="banner"
            >
                {/* Scroll Progress Bar */}
                <ScrollProgressBar />

                {/* Utility Row — Desktop only, collapses in compact mode via CSS */}
                <div className="header-utility-row hidden lg:block border-b border-neutral-100 overflow-hidden">
                    <div className="grid grid-cols-3 items-center h-12 px-6 lg:px-10">
                        <div className="flex items-center gap-6">
                            <Link
                                href={`/${locale}/contact`}
                                className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                                {translations.nav?.contact || "Contact"}
                            </Link>
                        </div>

                        <div className="flex justify-center">
                            <BrandLogo locale={locale} size="lg" variant="dark" />
                        </div>

                        <div className="flex items-center justify-end gap-6">
                            <LanguageSwitcher
                                locale={locale}
                                pathWithoutLocale={pathWithoutLocale}
                                variant="full"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Row — height controlled by CSS via data-mode */}
                <div className="header-nav-row hidden lg:block">
                    <nav
                        className="relative flex items-center justify-center px-6 lg:px-10"
                        aria-label={translations.nav?.mainNav || "Main navigation"}
                        role="menubar"
                    >
                        {isCompact && (
                            <div className="absolute left-6 lg:left-10">
                                <BrandLogo locale={locale} size="sm" variant="dark" />
                            </div>
                        )}

                        {navigationItems.map((item, index) => {
                            const itemPath = item.href ? `/${locale}${item.href}` : "";
                            const isCurrent = !!(itemPath && pathname.startsWith(itemPath));
                            const hasMega = !!item.megaMenu;

                            return (
                                <div
                                    key={item.id}
                                    className="relative"
                                    role="none"
                                    onMouseEnter={
                                        hasMega
                                            ? () => {
                                                  triggerRef.current = navItemRefs.current[index] ?? null;
                                                  handleNavEnter(item.id);
                                              }
                                            : undefined
                                    }
                                    onMouseLeave={hasMega ? handleNavLeave : undefined}
                                >
                                    <Link
                                        ref={(el) => {
                                            navItemRefs.current[index] = el;
                                        }}
                                        href={itemPath || `/${locale}`}
                                        className="nav-link-underline relative block py-3 px-5 text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
                                        role="menuitem"
                                        tabIndex={index === 0 ? 0 : -1}
                                        aria-expanded={hasMega ? activeMenu === item.id : undefined}
                                        aria-haspopup={hasMega ? "menu" : undefined}
                                        aria-current={isCurrent ? "page" : undefined}
                                        onKeyDown={(e) => handleNavKeyDown(e, index, item.id, hasMega)}
                                        onFocus={() => {
                                            // Update roving tabindex when focus moves
                                            navItemRefs.current.forEach((ref, i) => {
                                                if (ref) ref.tabIndex = i === index ? 0 : -1;
                                            });
                                        }}
                                    >
                                        {translations.nav?.[
                                            item.id as keyof typeof translations.nav
                                        ] || item.labelKey}
                                    </Link>
                                </div>
                            );
                        })}

                        {isCompact && (
                            <div className="absolute right-6 lg:right-10 flex items-center gap-4">
                                <LanguageSwitcher
                                    locale={locale}
                                    pathWithoutLocale={pathWithoutLocale}
                                    variant="compact"
                                />
                            </div>
                        )}
                    </nav>
                </div>

                {/* Mobile header bar */}
                <div className="flex lg:hidden items-center justify-between h-14 px-4 sm:px-6">
                    <BrandLogo locale={locale} size="sm" variant="dark" />
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label={translations.nav?.openMenu || "Open menu"}
                        aria-expanded={isMobileOpen}
                        aria-controls="mobile-nav-drawer"
                        className="p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
                    >
                        <Menu size={22} strokeWidth={1.5} />
                    </button>
                </div>
            </header>

            {/* Mega Menu Backdrop Overlay — click to close */}
            {activeNavItem && (
                <div
                    className="mega-menu-backdrop"
                    aria-hidden="true"
                    onClick={handleMegaMenuClose}
                />
            )}

            {/* Single MegaMenu instance — outside nav loop for hover continuity */}
            <MegaMenu
                item={activeNavItem}
                isOpen={!!activeNavItem}
                onClose={handleMegaMenuClose}
                onPanelEnter={handlePanelEnter}
                onPanelLeave={handlePanelLeave}
                locale={locale}
            />

            <MobileNav
                locale={locale}
                isOpen={isMobileOpen}
                onClose={() => setMobileOpen(false)}
            />
        </>
    );
}

export function SiteHeader({ locale }: { locale: Locale }) {
    return (
        <HeaderProvider>
            <SiteHeaderInner locale={locale} />
        </HeaderProvider>
    );
}
