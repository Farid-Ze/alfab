import type { Sector } from "@/types/sector";
import AppLink from "@/components/ui/AppLink";
import Image from "next/image";

interface SectorCardProps {
    sector: Sector;
    index: number;
}

/**
 * SectorCard - Individual sector card
 *
 * Uses CSS design tokens for consistent styling:
 * - Background: --sectors-card-bg (via ui-sector-card)
 * - Text colors: text-sectors-accent utility class
 * - Animation: transition-all-elegant utility class
 */
export default function SectorCard({ sector, index }: SectorCardProps) {
    // Fallback illustrations
    const illustrations = [
        "/images/solutions/connect-line.svg",
        "/images/solutions/build-line.svg",
        "/images/solutions/support-line.svg",
    ];

    const illustrationSrc = sector.illustration || illustrations[index % illustrations.length] || "";

    return (
        <article className="ui-sector-card relative overflow-hidden h-full min-h-card transition-all-elegant hover:-translate-y-1 hover:shadow-elegant-box group">
            {/* Decorative background illustration */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <Image
                    src={illustrationSrc}
                    alt=""
                    fill
                    className="decorative-illustration-card group-hover:opacity-30 transition-opacity-elegant object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative flex flex-col h-full">
                {/* Title */}
                <h3 className="type-h2 text-sectors-accent mb-3 max-w-[12ch]">
                    {sector.title}
                </h3>

                {/* Description */}
                <p className="type-body text-sectors-accent-80 mb-auto max-w-[28ch]">
                    {sector.description}
                </p>

                {/* Know more CTA */}
                <div className="mt-6 pt-4 border-t border-sectors-accent-20">
                    <AppLink
                        href={sector.href}
                        underline="none"
                        className="inline-flex items-center gap-2 type-ui-sm font-medium text-sectors-accent-70 group-hover:text-sectors-accent transition-colors-elegant"
                    >
                        <span className="text-sectors-accent">•</span>
                        <span>Know more</span>
                    </AppLink>
                </div>
            </div>
        </article>
    );
}
