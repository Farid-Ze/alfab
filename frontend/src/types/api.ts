/**
 * API Type Definitions
 * 
 * Types for API requests, responses, and data models.
 */

// ============================================
// API Response Types
// ============================================

/**
 * Base API response
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ApiError;
    meta?: ApiMeta;
}

/**
 * API error structure
 */
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string[]>;
}

/**
 * API metadata
 */
export interface ApiMeta {
    timestamp: string;
    requestId?: string;
    pagination?: Pagination;
}

/**
 * Pagination info
 */
export interface Pagination {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

// ============================================
// Lead/Contact Types (per paket-a.md)
// ============================================

/**
 * Business type for leads
 */
export type BusinessType = "salon" | "barbershop" | "spa" | "distributor" | "other";

/**
 * Lead source tracking
 */
export type LeadSource = "website" | "whatsapp" | "referral" | "event" | "other";

/**
 * Lead submission data
 */
export interface LeadSubmission {
    // Contact info
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;

    // Business info
    businessName: string;
    businessType: BusinessType;
    city: string;
    province?: string;

    // Interest
    interestedProducts?: string[];
    message?: string;

    // Tracking
    source: LeadSource;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
}

/**
 * Lead record (from database)
 */
export interface Lead extends LeadSubmission {
    id: string;
    status: "new" | "contacted" | "qualified" | "converted" | "closed";
    createdAt: string;
    updatedAt: string;
    notes?: string;
}

// ============================================
// Product Types
// ============================================

/**
 * Product category
 */
export type ProductCategory = "haircare" | "skincare" | "tools" | "accessories";

/**
 * Product summary (for listings)
 */
export interface ProductSummary {
    id: string;
    slug: string;
    name: string;
    brand: string;
    category: ProductCategory;
    image: string;
    shortDescription: string;
}

/**
 * Full product details
 */
export interface Product extends ProductSummary {
    description: string;
    benefits: string[];
    ingredients?: string[];
    usage?: string;
    images: string[];
    variants?: ProductVariant[];
}

/**
 * Product variant
 */
export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    size?: string;
}

// ============================================
// Education Types
// ============================================

/**
 * Education program type
 */
export type EducationType = "workshop" | "certification" | "webinar" | "in-salon";

/**
 * Education program
 */
export interface EducationProgram {
    id: string;
    slug: string;
    title: string;
    type: EducationType;
    description: string;
    duration: string;
    image: string;
    topics: string[];
}
