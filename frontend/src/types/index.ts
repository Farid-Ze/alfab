/**
 * Global Type Definitions
 * 
 * Shared types used across the application.
 */

// Re-export all types from submodules
export * from "./api";
export * from "./components";
export * from "./i18n";

// ============================================
// Common Utility Types
// ============================================

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Extract the resolved type of a Promise
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Maybe type (nullable + optional)
 */
export type Maybe<T> = T | null | undefined;

// ============================================
// Domain Types
// ============================================

/**
 * Supported locales
 */
export type Locale = "en" | "id";

/**
 * Navigation item
 */
export interface NavItem {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: NavItem[];
    external?: boolean;
}

/**
 * Social media link
 */
export interface SocialLink {
    platform: "instagram" | "facebook" | "linkedin" | "youtube" | "tiktok";
    url: string;
    label: string;
}

/**
 * Address
 */
export interface Address {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

/**
 * Image with dimensions
 */
export interface ImageData {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
}

/**
 * SEO metadata
 */
export interface SEOMeta {
    title: string;
    description: string;
    keywords?: string[];
    image?: ImageData;
    canonical?: string;
}
