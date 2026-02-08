/**
 * MobileNav - Mobile slide-in navigation
 * 
 * Features:
 * - Slide-in drawer from right
 * - Accordion menu for nested items
 * - Body scroll lock when open
 * - Focus trapping
 * - Animated with Framer Motion
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { type Locale, t } from "@/lib/i18n";
import { navigationItems } from "./header";

interface MobileNavProps {
    locale: Locale;
    isOpen: boolean;
    onClose: () => void;
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
        x: 0,
        transition: {
            type: "spring" as const,
            damping: 30,
            stiffness: 300,
        },
    },
    exit: {
        x: "100%",
        transition: {
            type: "spring" as const,
            damping: 30,
            stiffness: 300,
        },
    },
};

const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};

export function MobileNav({ locale, isOpen, onClose }: MobileNavProps) {
    const translations = t(locale);
    const drawerRef = useRef<HTMLDivElement>(null);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

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

    // Focus trap
    useEffect(() => {
        if (isOpen && drawerRef.current) {
            const firstFocusable = drawerRef.current.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) as HTMLElement;
            firstFocusable?.focus();
        }
    }, [isOpen]);

    const toggleExpanded = (itemId: string) => {
        setExpandedItem(expandedItem === itemId ? null : itemId);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: "var(--z-modal-backdrop)",
                        }}
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: "min(320px, 85vw)",
                            backgroundColor: "var(--surface-background)",
                            boxShadow: "var(--shadow-xl)",
                            zIndex: "var(--z-modal)",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "var(--space-4)",
                                borderBottom: "1px solid var(--border-default)",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "var(--text-lg)",
                                    fontWeight: "var(--font-bold)",
                                }}
                            >
                                Menu
                            </span>
                            <button
                                onClick={onClose}
                                aria-label="Close menu"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    borderRadius: "var(--radius-full)",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Items */}
                        <motion.nav
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "var(--space-4)",
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
                        >
                            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                                {navigationItems.map((item) => (
                                    <motion.li key={item.id} variants={menuItemVariants}>
                                        {item.megaMenu ? (
                                            <>
                                                <button
                                                    onClick={() => toggleExpanded(item.id)}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        width: "100%",
                                                        padding: "var(--space-3) var(--space-4)",
                                                        fontSize: "var(--text-base)",
                                                        fontWeight: "var(--font-medium)",
                                                        color: "var(--text-primary)",
                                                        backgroundColor: "transparent",
                                                        border: "none",
                                                        borderRadius: "var(--radius-md)",
                                                        cursor: "pointer",
                                                        textAlign: "left",
                                                    }}
                                                    aria-expanded={expandedItem === item.id}
                                                >
                                                    {translations.nav?.[item.id as keyof typeof translations.nav] ||
                                                        item.labelKey}
                                                    <ChevronDown
                                                        size={18}
                                                        style={{
                                                            transform:
                                                                expandedItem === item.id
                                                                    ? "rotate(180deg)"
                                                                    : "rotate(0deg)",
                                                            transition: "transform var(--duration-fast)",
                                                        }}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {expandedItem === item.id && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            style={{
                                                                overflow: "hidden",
                                                                paddingLeft: "var(--space-4)",
                                                            }}
                                                        >
                                                            {item.megaMenu.columns.map((column) =>
                                                                column.links.map((link, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={`/${locale}${link.href}`}
                                                                            onClick={onClose}
                                                                            style={{
                                                                                display: "block",
                                                                                padding: "var(--space-2) var(--space-4)",
                                                                                fontSize: "var(--text-sm)",
                                                                                color: "var(--text-secondary)",
                                                                            }}
                                                                        >
                                                                            {link.labelKey}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            )}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link
                                                href={`/${locale}${item.href || ""}`}
                                                onClick={onClose}
                                                style={{
                                                    display: "block",
                                                    padding: "var(--space-3) var(--space-4)",
                                                    fontSize: "var(--text-base)",
                                                    fontWeight: "var(--font-medium)",
                                                    color: "var(--text-primary)",
                                                    borderRadius: "var(--radius-md)",
                                                }}
                                            >
                                                {translations.nav?.[item.id as keyof typeof translations.nav] ||
                                                    item.labelKey}
                                            </Link>
                                        )}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.nav>

                        {/* Footer Actions */}
                        <div
                            style={{
                                padding: "var(--space-4)",
                                borderTop: "1px solid var(--border-default)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--space-3)",
                            }}
                        >
                            {/* Language Switcher */}
                            <Link
                                href={locale === "id" ? "/en" : "/id"}
                                onClick={onClose}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "var(--space-2)",
                                    padding: "var(--space-3)",
                                    fontSize: "var(--text-sm)",
                                    fontWeight: "var(--font-medium)",
                                    color: "var(--text-secondary)",
                                    border: "1px solid var(--border-default)",
                                    borderRadius: "var(--radius-md)",
                                }}
                            >
                                🌐 {locale === "id" ? "English" : "Bahasa Indonesia"}
                            </Link>

                            {/* Contact CTA */}
                            <Link
                                href={`/${locale}/contact`}
                                onClick={onClose}
                                className="btn btn-primary"
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                }}
                            >
                                {translations.nav?.contact || "Contact"}
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
