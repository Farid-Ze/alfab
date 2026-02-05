/**
 * Sector type for Business Sectors Section
 * Based on ineo-sense design pattern
 */
export interface Sector {
    id: string;
    title: string;
    description: string;
    illustration: string;
    href: string;
}

export interface SectorsSectionProps {
    headline: string;
    ctaText: string;
    ctaHref: string;
    sectors: Sector[];
}
