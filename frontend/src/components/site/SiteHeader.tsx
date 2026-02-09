"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
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

function SiteHeaderInner({ locale }: { locale: Locale }) {
    const { isScrolled, isVisible, headerMode } = useScroll();
    const { isMobileOpen, setMobileOpen, activeMenu, setActiveMenu } = useMenu();
    const translations = t(locale);
    const pathname = usePathname();
    const pathWithoutLocale = pathname.replace(/^\/(en|id)/, "") || "/";

    useHeaderScroll({ threshold: 20, scrollDelta: 5 });

    const isCompact = headerMode === "compact";

    // Stable close callback for hover intent
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

    // Keyboard handler for mega-menu nav links
    const handleNavKeyDown = useCallback(
        (e: React.KeyboardEvent, itemId: string, hasMegaMenu: boolean) => {
            if (!hasMegaMenu) return;
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault();
                setActiveMenu(itemId);
            } else if (e.key === "Escape") {
                closeImmediate();
            }
        },
        [setActiveMenu, closeImmediate]
    );

    // Resolve active nav item for the single MegaMenu instance
    const activeNavItem = useMemo(
        () => navigationItems.find((n) => n.id === activeMenu && n.megaMenu) ?? null,
        [activeMenu]
    );

    return (
        <>
            <TopBar locale={locale} />

            <header
                id="site-header"
                className="sticky top-0 w-full bg-white border-b border-b-transparent"
                data-scrolled={isScrolled}
                data-visible={isVisible}
                data-mode={headerMode}
            >
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
                    >
                        {isCompact && (
                            <div className="absolute left-6 lg:left-10">
                                <BrandLogo locale={locale} size="sm" variant="dark" />
                            </div>
                        )}

                        {navigationItems.map((item) => {
                            const itemPath = item.href ? `/${locale}${item.href}` : "";
                            const isCurrent = !!(itemPath && pathname.startsWith(itemPath));
                            const hasMega = !!item.megaMenu;

                            return (
                                <div
                                    key={item.id}
                                    className="relative"
                                    onMouseEnter={hasMega ? () => handleNavEnter(item.id) : undefined}
                                    onMouseLeave={hasMega ? handleNavLeave : undefined}
                                >
                                    <Link
                                        href={itemPath || `/${locale}`}
                                        className="nav-link-underline relative block py-3 px-5 text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
                                        aria-expanded={hasMega ? activeMenu === item.id : undefined}
                                        aria-haspopup={hasMega ? "menu" : undefined}
                                        aria-current={isCurrent ? "page" : undefined}
                                        onKeyDown={(e) => handleNavKeyDown(e, item.id, hasMega)}
                                    >
                                        {translations.nav?.[
                                            item.id as keyof typeof translations.nav
                                        ] || item.labelKey}
                                    </Link>
                                </div>
                            );
                        })}

                        {isCompact && (
                            <div className="absolute right-6 lg:right-10">
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
                        className="p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
                    >
                        <Menu size={22} strokeWidth={1.5} />
                    </button>
                </div>
            </header>

            {/* Single MegaMenu instance — outside nav loop for hover continuity */}
            <MegaMenu
                item={activeNavItem}
                isOpen={!!activeNavItem}
                onClose={closeImmediate}
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
