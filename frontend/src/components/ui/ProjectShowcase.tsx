"use client";
import Image from "next/image";

import AppLink from "@/components/ui/AppLink";
import { useEffect, useMemo } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

import { REF_CARD, REF_LIST, REF_RAIL, refListCardClassName } from "@/lib/referenceCards";
import { attachDragScroll, useHorizontalRail } from "@/lib/horizontalRail";

type ProjectShowcaseProps = {
    projects: {
        title: string;
        category: string;
        description?: string;
        tags?: string[];
        imageSrc?: string;
        href: string;
    }[];
    variant?: "list" | "rail";
};

/**
 * ProjectShowcase: Grid layout for "Latest Projects" / Brands.
 * Reference-style list cards (no hover/tilt).
 */
export default function ProjectShowcase({ projects, variant = "list" }: ProjectShowcaseProps) {
    const { locale } = useLocale();
    const tx = t(locale);
    const items = useMemo(() => projects ?? [], [projects]);

    const { trackRef, activeIndex, pageLabel, prev, next } = useHorizontalRail(items.length);

    useEffect(() => {
        if (variant !== "rail") return;
        const el = trackRef.current;
        if (!el) return;
        return attachDragScroll(el, {
            // Allow dragging from the card itself (it's an <a>). Suppress click when dragging.
            ignore: (target) => Boolean(target?.closest("button")),
            suppressClick: true,
        });
    }, [trackRef, variant]);

    if (variant === "list") {
        return (
            <div className={REF_LIST.wrap}>
                {items.map((project) => (
                    <AppLink
                        key={project.title}
                        href={project.href}
                        underline="none"
                        className={refListCardClassName()}
                    >
                        <div className={REF_CARD.mediaWrap}>
                            <Image
                                src={project.imageSrc ?? "/images/products/product-placeholder.jpg"}
                                alt=""
                                aria-hidden="true"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className={REF_CARD.mediaImg}
                            />
                        </div>

                        <div className="flex items-start justify-start lg:justify-center lg:pt-1">
                            <div className={REF_CARD.logoWrap} aria-hidden="true">
                                <span className={REF_CARD.logoText}>{project.category}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className={REF_CARD.title}>{project.title}</h3>
                            {project.description ? <p className={REF_CARD.body}>{project.description}</p> : null}

                            {project.tags?.length ? (
                                <div className={REF_CARD.metaRow}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={REF_CARD.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : null}

                            <div className={REF_CARD.actionRow}>
                                <span className={REF_CARD.actionDot} aria-hidden="true" />
                                <span className={REF_CARD.actionText}>{tx.ui.readMore}</span>
                            </div>
                        </div>
                    </AppLink>
                ))}
            </div>
        );
    }

    return (
        <div className={REF_RAIL.wrap}>
            <div className={REF_RAIL.desktopControls}>
                <div className={REF_RAIL.pager}>
                    <span className={REF_RAIL.pagerText}>{pageLabel}</span>
                </div>

                <div className={REF_RAIL.btnCol}>
                    <button type="button" className={REF_RAIL.btn} aria-label="Previous" onClick={prev} disabled={activeIndex === 0}>
                        <span aria-hidden="true">←</span>
                    </button>
                    <button
                        type="button"
                        className={REF_RAIL.btn}
                        aria-label="Next"
                        onClick={next}
                        disabled={activeIndex >= items.length - 1}
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>

            <div ref={trackRef} className={REF_RAIL.track}>
                {items.map((project, index) => (
                    <div
                        key={project.title}
                        data-rail-index={index}
                        className={`${REF_RAIL.item} w-[86vw] sm:w-[66vw] md:w-[460px] lg:w-[520px]`}
                    >
                        <AppLink
                            href={project.href}
                            underline="none"
                            className={refListCardClassName(
                                "w-full cursor-grab active:cursor-grabbing select-none lg:p-6 lg:gap-8 lg:grid-cols-[minmax(0,300px),72px,1fr]"
                            )}
                        >
                            <div className={REF_CARD.mediaWrap}>
                                <Image
                                    src={project.imageSrc ?? "/images/products/product-placeholder.jpg"}
                                    alt=""
                                    aria-hidden="true"
                                    fill
                                    sizes="(max-width: 768px) 86vw, 520px"
                                    className={REF_CARD.mediaImg}
                                />
                            </div>

                            <div className="flex items-start justify-start lg:justify-center lg:pt-1">
                                <div className={REF_CARD.logoWrap} aria-hidden="true">
                                    <span className={REF_CARD.logoText}>{project.category}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className={REF_CARD.title}>{project.title}</h3>
                                {project.description ? <p className={REF_CARD.body}>{project.description}</p> : null}

                                {project.tags?.length ? (
                                    <div className={REF_CARD.metaRow}>
                                        {project.tags.map((tag) => (
                                            <span key={tag} className={REF_CARD.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}

                                <div className={REF_CARD.actionRow}>
                                    <span className={REF_CARD.actionDot} aria-hidden="true" />
                                    <span className={REF_CARD.actionText}>{tx.ui.readMore}</span>
                                </div>
                            </div>
                        </AppLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
