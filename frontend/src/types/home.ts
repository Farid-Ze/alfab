/**
 * Home Page Component Types
 *
 * Shared TypeScript interfaces for homepage components.
 * Centralized here for maintainability and reuse.
 */

/**
 * Pillar - Used in SolutionsSection for solution pillars
 */
export interface Pillar {
    icon?: string;
    title: string;
    body?: string;
}

/**
 * Brand - Used in BrandShowcase for partner brands
 */
export interface Brand {
    name: string;
    country: string;
    flag: string;
    illustration?: string;
}

/**
 * HeroCTA - Call-to-action button configuration
 */
export interface HeroCTA {
    label: string;
    href: string;
}

/**
 * VideoHeroSectionProps - Props for VideoHeroSection component
 */
export interface VideoHeroSectionProps {
    headline: string;
    subHeadline: string;
    ctaPrimary?: HeroCTA;
    ctaSecondary?: HeroCTA;
    videoSrc?: string;
    posterSrc?: string;
}

/**
 * SectionHeaderProps - Props for SectionHeader component
 */
export interface SectionHeaderProps {
    title: string;
    body?: string;
    currentPage?: number;
    totalPages?: number;
    showPagination?: boolean;
}

/**
 * BrandShowcaseProps - Props for BrandShowcase component
 */
export interface BrandShowcaseProps {
    title: string;
    body: string;
    brands: Brand[];
    ctaLabel?: string;
    ctaHref?: string;
}

/**
 * SolutionsSectionProps - Props for SolutionsSection component
 */
export interface SolutionsSectionProps {
    pillars: Pillar[];
}
