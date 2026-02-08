/**
 * MainNav - Main navigation bar
 * 
 * Features:
 * - Smart Sticky behavior (handled by parent)
 * - Glassmorphism effect
 * - Gliding pill hover animation
 * - Simplified Language Switcher
 */
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { type Locale, t } from "@/lib/i18n";
import { useHeader } from "./header";
import { MegaMenu } from "./MegaMenu";
import { navigationItems } from "./header";

interface MainNavProps {
    locale: Locale;
}

export function MainNav({ locale }: MainNavProps) {
    const translations = t(locale);
    const { activeMenu, setActiveMenu, isScrolled } = useHeader();

    const handleMenuEnter = (menuId: string) => {
        setActiveMenu(menuId);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
    };

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                width: "100%",
                height: "var(--header-main-height)",
                backgroundColor: isScrolled
                    ? "rgba(255, 255, 255, 0.9)" // Glassmorphism base
                    : "transparent",
                backdropFilter: isScrolled ? "blur(12px)" : "none",
                WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
                borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
                boxShadow: isScrolled ? "var(--shadow-sm)" : "none",
                transition: "all var(--duration-normal) var(--ease-default)",
                zIndex: "var(--z-sticky)",
            }}
            aria-label="Main navigation"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    padding: "0 var(--space-6)",
                    gap: "var(--space-8)",
                }}
            >
                {/* Logo */}
                <Link
                    href={`/${locale}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            fontSize: "var(--text-xl)",
                            fontWeight: "var(--font-bold)",
                            color: "var(--text-primary)",
                            letterSpacing: "var(--tracking-tight)",
                        }}
                    >
                        ALFA BEAUTY
                    </span>
                    <span
                        style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "var(--tracking-wide)",
                        }}
                    >
                        Professional
                    </span>
                </Link>

                {/* Navigation Items - Desktop */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        flex: 1,
                        justifyContent: "center",
                    }}
                    className="nav-desktop"
                >
                    {navigationItems.map((item) => {
                        const isActive = activeMenu === item.id;
                        return (
                            <div
                                key={item.id}
                                onMouseEnter={() => item.megaMenu && handleMenuEnter(item.id)}
                                onMouseLeave={handleMenuLeave}
                                style={{ position: "relative" }}
                            >
                                <Link
                                    href={`/${locale}${item.href || ""}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--space-1)",
                                        padding: "var(--space-2) var(--space-3)",
                                        fontSize: "var(--text-sm)",
                                        fontWeight: "var(--font-medium)",
                                        color: isActive
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                        position: "relative",
                                        zIndex: 1,
                                        transition: "color var(--duration-fast)",
                                    }}
                                    className="nav-link"
                                    aria-expanded={item.megaMenu ? activeMenu === item.id : undefined}
                                    aria-haspopup={item.megaMenu ? "menu" : undefined}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                backgroundColor: "var(--surface-elevated)",
                                                borderRadius: "var(--radius-md)",
                                                zIndex: -1,
                                            }}
                                            transition={{
                                                type: "spring" as const,
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    {translations.nav?.[item.id as keyof typeof translations.nav] ||
                                        item.labelKey}
                                    {item.megaMenu && (
                                        <ChevronDown
                                            size={14}
                                            style={{
                                                transform: isActive
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                                transition: "transform var(--duration-fast) var(--ease-default)",
                                            }}
                                        />
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Right Actions */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-4)",
                        flexShrink: 0,
                    }}
                >
                    {/* Language Switcher - Simplified ID / EN */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            fontSize: "var(--text-sm)",
                            fontWeight: "var(--font-medium)",
                        }}
                    >
                        <Link
                            href="/id"
                            style={{
                                color: locale === "id" ? "var(--text-primary)" : "var(--text-muted)",
                                transition: "color var(--duration-fast) var(--ease-default)",
                            }}
                        >
                            ID
                        </Link>
                        <span style={{ color: "var(--text-muted)" }}>/</span>
                        <Link
                            href="/en"
                            style={{
                                color: locale === "en" ? "var(--text-primary)" : "var(--text-muted)",
                                transition: "color var(--duration-fast) var(--ease-default)",
                            }}
                        >
                            EN
                        </Link>
                    </div>

                    {/* Contact CTA */}
                    <Link
                        href={`/${locale}/contact`}
                        className="btn btn-primary"
                        style={{
                            padding: "var(--space-2) var(--space-5)",
                            fontSize: "var(--text-sm)",
                        }}
                    >
                        {translations.nav?.contact || "Contact"}
                    </Link>
                </div>
            </div>

            {/* Mega Menu */}
            {navigationItems.map(
                (item) =>
                    item.megaMenu && (
                        <MegaMenu
                            key={item.id}
                            item={item}
                            isOpen={activeMenu === item.id}
                            onClose={() => setActiveMenu(null)}
                            locale={locale}
                        />
                    )
            )}
        </nav>
    );
}

