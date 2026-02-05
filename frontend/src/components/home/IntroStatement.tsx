"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * IntroStatement - ineo-sense style 2-column intro
 * 
 * Layout Pattern (from ineo-sense):
 * ┌─────────────────────────────────────────────────┐
 * │ "Large statement text..."       [ CTA button → ]│
 * │  (LEFT - 70% width)             (RIGHT - auto)  │
 * └─────────────────────────────────────────────────┘
 */

interface IntroStatementProps {
    text: string;
    ctaLabel: string;
    ctaHref: string;
}

export default function IntroStatement({
    text,
    ctaLabel,
    ctaHref,
}: IntroStatementProps) {
    return (
        <section className="py-20 lg:py-28 bg-background">
            <div className="ui-container">
                <ScrollReveal>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
                        {/* LEFT: Large statement text (ineo-sense style) */}
                        <p className="flex-1 max-w-[780px] text-balance text-foreground type-intro-statement">
                            {text}
                        </p>

                        {/* RIGHT: CTA button (ineo-sense pill style) */}
                        <a
                            href={ctaHref}
                            className="group shrink-0 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border-2 border-sectors-accent text-foreground type-ui-strong transition-all-elegant hover:bg-sectors-accent hover:text-white"
                        >
                            <span className="transition-transform transition-base group-hover:translate-x-1 text-sectors-accent group-hover:text-white">
                                •
                            </span>
                            {ctaLabel}
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
