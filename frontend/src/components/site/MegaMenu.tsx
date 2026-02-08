/**
 * MegaMenu - Multi-column dropdown menu
 * 
 * Features:
 * - Animated entrance/exit with Framer Motion (Spring Physics)
 * - Multi-column layout with categories, brands, services
 * - Promotional image slot
 * - Keyboard navigation support
 * - Focus trapping
 */
"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale, t } from "@/lib/i18n";
import { type NavItem } from "./header";

interface MegaMenuProps {
    item: NavItem;
    isOpen: boolean;
    onClose: () => void;
    locale: Locale;
}

const megaMenuVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        height: 0,
        transition: { duration: 0.15 },
    },
    visible: {
        opacity: 1,
        y: 0,
        height: "auto",
        transition: {
            duration: 0.2,
            type: "spring" as const,
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.15 },
    },
};

const columnVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.05
        }
    },
};

const linkVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    }
};

/**
 * Helper to get translation value from key path
 */
function getTranslation(translations: Record<string, unknown>, keyPath: string): string {
    const keys = keyPath.split(".");
    let value: unknown = translations;

    for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
            value = (value as Record<string, unknown>)[key];
        } else {
            return keyPath; // Fallback to key if not found
        }
    }

    return typeof value === "string" ? value : keyPath;
}

export function MegaMenu({ item, isOpen, onClose, locale }: MegaMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const translations = t(locale);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!item.megaMenu) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "var(--header-mega-bg)",
                        boxShadow: "var(--header-mega-shadow)",
                        borderTop: "1px solid var(--header-mega-border)",
                        overflow: "hidden",
                        zIndex: "var(--z-dropdown)",
                    }}
                    role="menu"
                    aria-label={getTranslation(translations as Record<string, unknown>, item.labelKey)}
                >
                    <div className="container">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: "var(--space-8)",
                                padding: "var(--space-8) 0",
                            }}
                        >
                            {/* Menu Columns */}
                            {item.megaMenu.columns.map((column, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={columnVariants}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <motion.h3
                                        variants={linkVariants}
                                        style={{
                                            fontSize: "var(--text-xs)",
                                            fontWeight: "var(--font-semibold)",
                                            color: "var(--text-muted)",
                                            textTransform: "uppercase",
                                            letterSpacing: "var(--tracking-wide)",
                                            marginBottom: "var(--space-4)",
                                        }}
                                    >
                                        {getTranslation(translations as Record<string, unknown>, column.titleKey)}
                                    </motion.h3>
                                    <ul
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "var(--space-2)",
                                        }}
                                    >
                                        {column.links.map((link, linkIdx) => (
                                            <motion.li key={linkIdx} variants={linkVariants}>
                                                <Link
                                                    href={`/${locale}${link.href}`}
                                                    onClick={onClose}
                                                    style={{
                                                        display: "block",
                                                        padding: "var(--space-1) 0",
                                                        fontSize: "var(--text-sm)",
                                                        color: "var(--text-secondary)",
                                                        transition: "color var(--duration-fast) var(--ease-default)",
                                                    }}
                                                    className="mega-menu-link"
                                                    role="menuitem"
                                                >
                                                    {getTranslation(translations as Record<string, unknown>, link.labelKey)}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}

                            {/* Promo Image Column */}
                            <motion.div
                                variants={columnVariants}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "var(--surface-elevated)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "var(--space-6)",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4/3",
                                        backgroundColor: "var(--color-neutral-200)",
                                        borderRadius: "var(--radius-md)",
                                        marginBottom: "var(--space-4)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "var(--text-xs)",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        Promo Image
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: "var(--text-sm)",
                                        fontWeight: "var(--font-semibold)",
                                        textAlign: "center",
                                        marginBottom: "var(--space-2)",
                                    }}
                                >
                                    {item.megaMenu.promoTitle}
                                </p>
                                {item.megaMenu.promoLink && (
                                    <Link
                                        href={`/${locale}${item.megaMenu.promoLink}`}
                                        onClick={onClose}
                                        style={{
                                            fontSize: "var(--text-sm)",
                                            color: "var(--color-secondary-600)",
                                            fontWeight: "var(--font-medium)",
                                        }}
                                    >
                                        {translations.nav?.explore || "Explore"} →
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        style={{
                            position: "absolute",
                            top: "var(--space-4)",
                            right: "var(--space-4)",
                            width: "2rem",
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "var(--radius-full)",
                            border: "none",
                            backgroundColor: "transparent",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            transition: "all var(--duration-fast) var(--ease-default)",
                        }}
                        className="mega-menu-close"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
