"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { navigationItems } from "./header";
import { BrandLogo } from "./BrandLogo";

interface MobileNavProps {
    locale: Locale;
    isOpen: boolean;
    onClose: () => void;
}

const FOCUSABLE_SELECTOR =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileNav({ locale, isOpen, onClose }: MobileNavProps) {
    const translations = t(locale);
    const drawerRef = useRef<HTMLDivElement>(null);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const pathname = usePathname();
    const pathWithoutLocale = pathname.replace(/^\/(en|id)/, "") || "/";

    // Body scroll lock with proper cleanup
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Real focus trap: cycle Tab/Shift+Tab within drawer
    const handleFocusTrap = useCallback((e: KeyboardEvent) => {
        if (e.key !== "Tab" || !drawerRef.current) return;

        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }, []);

    // Set initial focus + attach focus trap
    useEffect(() => {
        if (!isOpen || !drawerRef.current) return;

        const firstFocusable = drawerRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        firstFocusable?.focus();

        document.addEventListener("keydown", handleFocusTrap);
        return () => document.removeEventListener("keydown", handleFocusTrap);
    }, [isOpen, handleFocusTrap]);

    const toggleExpanded = (itemId: string) => {
        setExpandedItem(expandedItem === itemId ? null : itemId);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/30"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col shadow-xl"
                        role="dialog"
                        aria-modal="true"
                        aria-label={translations.nav?.menu || "Navigation menu"}
                    >
                        {/* Top bar: logo left, close right */}
                        <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-100">
                            <BrandLogo locale={locale} size="sm" variant="dark" onClick={onClose} />
                            <button
                                onClick={onClose}
                                aria-label={translations.nav?.closeMenu || "Close menu"}
                                className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto py-8 px-6">
                            <ul className="space-y-1">
                                {navigationItems.map((item) => {
                                    const panelId = `mobile-panel-${item.id}`;
                                    const isExpanded = expandedItem === item.id;

                                    return (
                                        <li key={item.id}>
                                            {item.megaMenu ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleExpanded(item.id)}
                                                        className="flex items-center justify-between w-full py-4 text-lg font-normal text-neutral-900"
                                                        aria-expanded={isExpanded}
                                                        aria-controls={panelId}
                                                    >
                                                        {translations.nav?.[item.id as keyof typeof translations.nav] || item.labelKey}
                                                        <ChevronDown
                                                            size={18}
                                                            strokeWidth={1.5}
                                                            className={`transition-transform duration-200 text-neutral-400 ${isExpanded ? "rotate-180" : ""}`}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.ul
                                                                id={panelId}
                                                                role="region"
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                                className="overflow-hidden pl-4 border-l border-neutral-200"
                                                            >
                                                                {item.megaMenu.columns.flatMap(col => col.links).map((link, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={`/${locale}${link.href}`}
                                                                            onClick={onClose}
                                                                            className="block py-3 text-base font-normal text-neutral-500 hover:text-neutral-900 transition-colors"
                                                                        >
                                                                            {getTranslation(translations as Record<string, unknown>, link.labelKey)}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </motion.ul>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    href={`/${locale}${item.href || ""}`}
                                                    onClick={onClose}
                                                    className={`block py-4 text-lg font-normal ${
                                                        item.href && pathname.startsWith(`/${locale}${item.href}`)
                                                            ? "text-neutral-900 font-medium"
                                                            : "text-neutral-700"
                                                    }`}
                                                    aria-current={item.href && pathname.startsWith(`/${locale}${item.href}`) ? "page" : undefined}
                                                >
                                                    {translations.nav?.[item.id as keyof typeof translations.nav] || item.labelKey}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Bottom: language + contact */}
                        <div className="px-6 py-6 border-t border-neutral-100 space-y-4">
                            <Link
                                href={locale === "id" ? `/en${pathWithoutLocale}` : `/id${pathWithoutLocale}`}
                                onClick={onClose}
                                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                                {locale === "id" ? "English" : "Bahasa Indonesia"}
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                onClick={onClose}
                                className="block text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
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
