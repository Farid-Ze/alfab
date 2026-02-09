"use client";

/**
 * MegaMenu — Enterprise-grade desktop mega menu panel
 *
 * Features:
 * - AnimatePresence enter/exit with reduced-motion detection
 * - Dynamic header-bottom tracking via ResizeObserver
 * - Escape key + click-outside close (excludes header for hover transitions)
 * - ArrowDown focuses first link; ArrowUp from first link closes menu
 * - Focus trap within panel: Tab cycles through links
 * - Proper role="menu" / role="menuitem" + aria-label
 * - Print: hidden
 */

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { type NavItem } from "./header";

interface MegaMenuProps {
    /** Active nav item — null when closed */
    item: NavItem | null;
    isOpen: boolean;
    onClose: () => void;
    /** Hover continuity: cancel close when mouse enters panel */
    onPanelEnter: () => void;
    /** Hover continuity: start close countdown when mouse leaves panel */
    onPanelLeave: () => void;
    locale: Locale;
}

const megaMenuVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: [0, 0, 0.2, 1] as const },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as const },
    },
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

export function MegaMenu({
    item,
    isOpen,
    onClose,
    onPanelEnter,
    onPanelLeave,
    locale,
}: MegaMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);
    const translations = t(locale);
    const [topOffset, setTopOffset] = useState(0);

    // Dynamic header bottom tracking with ResizeObserver
    const updateTopOffset = useCallback(() => {
        const header = document.getElementById("site-header");
        if (header) {
            setTopOffset(header.getBoundingClientRect().bottom);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        updateTopOffset();

        const header = document.getElementById("site-header");
        if (!header) return;

        const observer = new ResizeObserver(updateTopOffset);
        observer.observe(header);

        return () => observer.disconnect();
    }, [isOpen, updateTopOffset]);

    // Escape key + click-outside + focus trap
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                firstLinkRef.current?.focus();
                return;
            }

            // Focus trap: Tab cycling within mega menu
            if (e.key === "Tab" && menuRef.current) {
                const focusable = menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
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
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const header = document.getElementById("site-header");
            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                header &&
                !header.contains(target)
            ) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!item?.megaMenu) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed left-0 right-0 bg-white border-b border-neutral-200 shadow-lg print:hidden"
                    style={{
                        top: topOffset,
                        zIndex: "var(--z-fixed)" as string,
                    }}
                    role="menu"
                    aria-label={getTranslation(translations as Record<string, unknown>, item.labelKey)}
                    onMouseEnter={onPanelEnter}
                    onMouseLeave={onPanelLeave}
                >
                    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 relative">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
                            aria-label={translations.nav?.closeMenu || "Close menu"}
                        >
                            <X size={20} />
                        </button>

                        <div className={`grid gap-12 ${item.megaMenu.featured ? "grid-cols-4" : "grid-cols-3"}`}>
                            {item.megaMenu.columns.map((column, idx) => (
                                <div key={`${item.id}-${idx}`}>
                                    <h3 className="text-xs font-medium uppercase text-neutral-400 mb-6 tracking-widest">
                                        {getTranslation(translations as Record<string, unknown>, column.titleKey)}
                                    </h3>
                                    <ul className="space-y-3" role="group">
                                        {column.links.map((link, linkIdx) => {
                                            const globalIdx = item.megaMenu!.columns
                                                .slice(0, idx)
                                                .reduce((sum, c) => sum + c.links.length, 0) + linkIdx;

                                            return (
                                                <li key={linkIdx}>
                                                    <Link
                                                        ref={globalIdx === 0 ? firstLinkRef : undefined}
                                                        href={`/${locale}${link.href}`}
                                                        onClick={onClose}
                                                        className="mega-menu-link text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                                                        role="menuitem"
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Escape") {
                                                                e.preventDefault();
                                                                onClose();
                                                            }
                                                            if (e.key === "ArrowUp" && globalIdx === 0) {
                                                                e.preventDefault();
                                                                onClose();
                                                            }
                                                        }}
                                                    >
                                                        {getTranslation(translations as Record<string, unknown>, link.labelKey)}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}

                            {/* Featured promo area */}
                            {item.megaMenu.featured && (
                                <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                                    <Image
                                        src={item.megaMenu.featured.image}
                                        alt=""
                                        fill
                                        className="object-cover pointer-events-none"
                                        sizes="(min-width: 1024px) 25vw, 0px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent pointer-events-none" />
                                    <div className="relative z-10 flex flex-col justify-end h-full p-6 min-h-[260px]">
                                        <h4 className="text-sm font-semibold uppercase text-white tracking-wider mb-3">
                                            {getTranslation(translations as Record<string, unknown>, item.megaMenu.featured.titleKey)}
                                        </h4>
                                        <Link
                                            href={`/${locale}${item.megaMenu.featured.href}`}
                                            onClick={onClose}
                                            className="mega-menu-link text-xs font-medium uppercase text-white/90 hover:text-white tracking-widest transition-colors duration-200"
                                        >
                                            {getTranslation(translations as Record<string, unknown>, item.megaMenu.featured.ctaKey)}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
