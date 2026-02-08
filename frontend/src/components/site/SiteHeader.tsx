/**
 * SiteHeader - Enterprise header container
 * 
 * Orchestrates:
 * - TopBar (social, CTA)
 * - MainNav (logo, menu, search, language, CTA)
 * - MobileNav (hamburger + drawer)
 * - Scroll behavior (background change)
 * 
 * Uses HeaderProvider for shared state management
 */
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { HeaderProvider, useHeader } from "./header";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";

interface SiteHeaderProps {
    locale: Locale;
}

/**
 * Inner header component that uses context
 */
function SiteHeaderInner({ locale }: SiteHeaderProps) {
    const { isMobileOpen, setMobileOpen, setScrolled, isVisible } = useHeader();

    // Spring physics configuration
    const headerVariants = {
        visible: {
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        },
        hidden: {
            y: "-100%",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        }
    };

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        handleScroll(); // Initial check
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setScrolled]);

    return (
        <motion.header
            variants={headerVariants}
            animate={isVisible ? "visible" : "hidden"}
            initial="visible"
            style={{
                position: "sticky",
                top: 0,
                zIndex: "var(--z-sticky)",
            }}
        >
            {/* Top Bar - Hidden on mobile */}
            <div className="topbar-wrapper" style={{ display: "block" }}>
                <TopBar />
            </div>

            {/* Main Navigation */}
            <div className="mainnav-wrapper">
                {/* Desktop Navigation */}
                <div className="desktop-nav">
                    <MainNav locale={locale} />
                </div>

                {/* Mobile Header Bar */}
                <div
                    className="mobile-header"
                    style={{
                        display: "none",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "var(--header-main-height)",
                        padding: "0 var(--space-4)",
                        backgroundColor: "var(--header-bg)",
                        borderBottom: "1px solid var(--border-default)",
                    }}
                >
                    {/* Logo */}
                    <a
                        href={`/${locale}`}
                        style={{
                            fontSize: "var(--text-lg)",
                            fontWeight: "var(--font-bold)",
                            color: "var(--text-primary)",
                        }}
                    >
                        ALFA BEAUTY
                    </a>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isMobileOpen}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "var(--radius-md)",
                            border: "none",
                            backgroundColor: "transparent",
                            color: "var(--text-primary)",
                            cursor: "pointer",
                        }}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <MobileNav
                locale={locale}
                isOpen={isMobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            {/* Responsive CSS */}
            <style jsx global>{`
                /* Desktop: show desktop nav, hide mobile */
                @media (min-width: 1024px) {
                    .desktop-nav {
                        display: block;
                    }
                    .mobile-header {
                        display: none !important;
                    }
                    .topbar-wrapper {
                        display: block;
                    }
                }

                /* Mobile/Tablet: hide desktop nav, show mobile */
                @media (max-width: 1023px) {
                    .desktop-nav {
                        display: none;
                    }
                    .mobile-header {
                        display: flex !important;
                    }
                    .topbar-wrapper {
                        display: none;
                    }
                    .nav-desktop {
                        display: none;
                    }
                }

                /* TopBar hover effects */
                .topbar-link:hover {
                    opacity: 1 !important;
                }
                .topbar-social:hover {
                    opacity: 1 !important;
                    background-color: rgba(255, 255, 255, 0.1);
                }

                /* Nav link hover effects */
                .nav-link:hover {
                    color: var(--text-primary) !important;
                    background-color: var(--surface-elevated);
                }

                /* Nav icon button hover */
                .nav-icon-btn:hover {
                    background-color: var(--surface-elevated);
                    color: var(--text-primary) !important;
                }

                /* Mega menu link hover */
                .mega-menu-link:hover {
                    color: var(--text-primary) !important;
                }

                /* Mega menu close hover */
                .mega-menu-close:hover {
                    background-color: var(--surface-elevated);
                    color: var(--text-primary);
                }
            `}</style>
        </motion.header>
    );
}

/**
 * SiteHeader - Wrapped with HeaderProvider
 */
export function SiteHeader({ locale }: SiteHeaderProps) {
    return (
        <HeaderProvider>
            <SiteHeaderInner locale={locale} />
        </HeaderProvider>
    );
}
