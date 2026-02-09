"use client";

/**
 * MegaMenu — Clean, Alfaparf-style mega menu panel
 *
 * Reference: alfaparfmilanopro.com/int-en/brand
 *
 * Features:
 * - Clean show/hide — no framer-motion, no AnimatePresence
 * - Dynamic header-bottom tracking via ResizeObserver
 * - Escape key + click-outside close
 * - Keyboard: ArrowDown focuses first link, Escape closes
 * - Proper role="menu" / role="menuitem" + aria-label
 * - "All Products" bottom link (like Alfaparf's "ALL LINES →")
 * - Print: hidden
 */

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { type NavItem } from "./header";

interface MegaMenuProps {
    /** Active nav item — null when closed */
    item: NavItem | null;
    isOpen: boolean;
    onClose: () => void;
    locale: Locale;
}

export function MegaMenu({
    item,
    isOpen,
    onClose,
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

    // Escape key + click-outside
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

    if (!item?.megaMenu || !isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="fixed left-0 right-0 bg-white border-b border-neutral-200 shadow-lg print:hidden"
            style={{
                top: topOffset,
                zIndex: "var(--z-fixed)" as string,
            }}
            role="menu"
            aria-label={getTranslation(translations as Record<string, unknown>, item.labelKey)}
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 relative">
                {/* Close button — Alfaparf style, top right */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
                    aria-label={translations.nav?.closeMenu || "Close menu"}
                >
                    <X size={22} strokeWidth={1.5} />
                </button>

                <div className={`grid gap-10 ${item.megaMenu.featured ? "grid-cols-4" : "grid-cols-3"}`}>
                    {/* Columns of links */}
                    {item.megaMenu.columns.map((column, idx) => (
                        <div key={`${item.id}-${idx}`}>
                            <h3 className="text-sm font-semibold uppercase text-neutral-900 mb-5 tracking-wider">
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
                                                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-150"
                                                role="menuitem"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Escape") {
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

                    {/* Featured promo area (Alfaparf-style image + title + CTA) */}
                    {item.megaMenu.featured && (
                        <div className="relative overflow-hidden rounded-lg bg-neutral-100 min-h-[260px]">
                            <Image
                                src={item.megaMenu.featured.image}
                                alt=""
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(min-width: 1024px) 25vw, 0px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex flex-col justify-end h-full p-6">
                                <h4 className="text-sm font-semibold uppercase text-white tracking-wider mb-3">
                                    {getTranslation(translations as Record<string, unknown>, item.megaMenu.featured.titleKey)}
                                </h4>
                                <Link
                                    href={`/${locale}${item.megaMenu.featured.href}`}
                                    onClick={onClose}
                                    className="text-xs font-medium uppercase text-white/90 hover:text-white tracking-widest transition-colors duration-150"
                                >
                                    {getTranslation(translations as Record<string, unknown>, item.megaMenu.featured.ctaKey)}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom link — Alfaparf-style "ALL LINES →" */}
                {item.href && (
                    <div className="mt-10 pt-6 border-t border-neutral-100">
                        <Link
                            href={`/${locale}${item.href}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors duration-150"
                        >
                            {translations.nav?.allProducts || "All Products"}
                            <ArrowRight size={14} strokeWidth={1.5} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
