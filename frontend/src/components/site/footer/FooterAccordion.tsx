"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { type FooterSection } from "../header/navigation-data";

interface FooterAccordionProps {
    sections: FooterSection[];
    locale: Locale;
}

export function FooterAccordion({ sections, locale }: FooterAccordionProps) {
    const translations = t(locale);
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggle = (id: string) => setExpanded(expanded === id ? null : id);

    return (
        <div className="divide-y divide-white/10">
            {sections.map((section) => {
                const panelId = `footer-panel-${section.id}`;
                const isExpanded = expanded === section.id;

                return (
                    <div key={section.id}>
                        <button
                            onClick={() => toggle(section.id)}
                            className="flex items-center justify-between w-full py-4 text-sm font-medium uppercase text-neutral-300 tracking-widest"
                            aria-expanded={isExpanded}
                            aria-controls={panelId}
                        >
                            {getTranslation(translations as Record<string, unknown>, section.titleKey)}
                            <ChevronDown
                                size={16}
                                strokeWidth={1.5}
                                className={`transition-transform duration-200 text-neutral-500 ${isExpanded ? "rotate-180" : ""}`}
                            />
                        </button>
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.ul
                                    id={panelId}
                                    role="list"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden pb-4 space-y-3"
                                >
                                {section.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={`/${locale}${link.href}`}
                                            className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                                        >
                                            {getTranslation(translations as Record<string, unknown>, link.labelKey)}
                                        </Link>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
                );
            })}
        </div>
    );
}
