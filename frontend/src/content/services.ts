/**
 * Services Experience - Data Schema
 * 
 * @module content/services
 * @description Centralized content for the Immersive Services Experience section.
 * All service definitions, video paths, and localized content.
 * Loads from JSON (CMS Layer) and validates via Zod (Governance Layer).
 */

import { servicesPageSchema, type ServicesPageData } from "./schemas/services.schema";
import servicesJson from "./data/services.json";
import type {
    Service,
    ServiceId,
    Locale
} from '@/types/services.types';

// 1. Validation Layer (Build-Time Guard)
const parsedContent = servicesPageSchema.safeParse(servicesJson);

if (!parsedContent.success) {
    console.error("FATAL: Services Content Validation Failed", parsedContent.error.format());
    throw new Error("Services content validation failed. Check src/content/data/services.json");
}

const content: ServicesPageData = parsedContent.data;

// =============================================================================
// Services Data
// =============================================================================

/**
 * Services configuration
 * 
 * Video assets should be placed in /public/videos/services/
 * Format: WebM (VP9) + MP4 (H.264) + JPG poster
 */
export const services: readonly Service[] = content.services as unknown as readonly Service[];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get service by ID
 */
export function getServiceById(id: ServiceId): Service | undefined {
    return services.find((s) => s.id === id);
}

/**
 * Get service index by ID
 */
export function getServiceIndex(id: ServiceId): number {
    return services.findIndex((s) => s.id === id);
}

/**
 * Get service by index with bounds checking
 */
export function getServiceByIndex(index: number): Service | undefined {
    if (index < 0 || index >= services.length) return undefined;
    return services[index];
}

/**
 * Get adjacent services for navigation
 */
export function getAdjacentServices(currentId: ServiceId): {
    prev: Service | null;
    next: Service | null;
} {
    const index = getServiceIndex(currentId);
    return {
        prev: index > 0 ? (services[index - 1] ?? null) : null,
        next: index < services.length - 1 ? (services[index + 1] ?? null) : null,
    };
}

/**
 * Get localized service content
 */
export function getLocalizedService(
    service: Service,
    locale: Locale
): {
    name: string;
    tagline: string;
    description: string;
    ctaLabel: string;
} {
    return {
        name: service.name[locale],
        tagline: service.tagline[locale],
        description: service.description[locale],
        ctaLabel: service.cta.label[locale],
    };
}

// =============================================================================
// Section Content (for header text)
// =============================================================================

export function getServicesExperienceContent(locale: Locale) {
    return content.meta[locale];
}
