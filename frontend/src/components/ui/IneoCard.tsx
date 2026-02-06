/**
 * IneoCard - ineo-sense style card
 *
 * Uses CSS design tokens for consistent styling:
 * - Teal border from --color-ineo-teal
 * - Navy title from --color-ineo-navy
 * - Muted body text from design tokens
 */

interface IneoCardProps {
    title: string;
    body: string;
    image?: string;
    ctaLabel?: string;
    ctaHref?: string;
    minHeight?: number;
}

// ...existing imports
import Image from "next/image";

export default function IneoCard({
    title,
    body,
    image,
    ctaLabel = "Know more",
    ctaHref = "#",
    minHeight = 320,
}: IneoCardProps) {
    return (
        <div
            className="ui-ineo-card flex flex-col"
            style={{ minHeight: `${minHeight}px` }}
        >
            {/* Title - Uses ineo-navy token */}
            <h3 className="type-h2 text-ineo-navy mb-content-sm leading-tight">
                {title}
            </h3>

            {/* Body text - Uses design token */}
            <p className="type-body text-muted mb-content-sm">
                {body}
            </p>

            {/* Illustration (optional) */}
            {image && (
                <div className="flex-1 flex items-center justify-center my-4 min-h-ineo-card-image relative w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain opacity-80 hue-rotate-[160deg] saturate-[0.8]"
                    />
                </div>
            )}

            {/* Spacer if no image */}
            {!image && <div className="flex-1" />}

            {/* Know more CTA */}
            <a
                href={ctaHref}
                className="inline-flex items-center gap-2 mt-auto transition-all-elegant hover:gap-3 group text-ineo-teal type-ui-strong"
            >
                <span className="transition-transform-elegant group-hover:translate-x-1 text-xl">
                    →
                </span>
                {ctaLabel}
            </a>
        </div>
    );
}
