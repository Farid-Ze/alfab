/**
 * Services Experience - Data Schema
 * 
 * @module content/services
 * @description Centralized content for the Immersive Services Experience section.
 * All service definitions, video paths, and localized content.
 */

import type {
    Service,
    ServiceId,
    Locale
} from '@/types/services.types';

// =============================================================================
// Services Data
// =============================================================================

/**
 * Services configuration
 * 
 * Video assets should be placed in /public/videos/services/
 * Format: WebM (VP9) + MP4 (H.264) + JPG poster
 */
export const services: readonly Service[] = [
    {
        id: 'products',
        slug: 'products',
        number: '01',
        name: {
            en: 'Products',
            id: 'Produk',
        },
        tagline: {
            en: 'Professional-Grade Excellence',
            id: 'Keunggulan Profesional',
        },
        description: {
            en: 'Curated selection of premium salon products from world-renowned brands. Every formula backed by science, every result speaks for itself.',
            id: 'Koleksi produk salon premium dari brand ternama dunia. Setiap formula didukung sains, setiap hasil berbicara sendiri.',
        },
        cta: {
            label: {
                en: 'Explore Products',
                id: 'Jelajahi Produk',
            },
            href: '/products',
        },
        video: {
            // Using hero video as placeholder until real service videos are provided
            webm: '/videos/hero-salon.mp4', // Will be WebM when available
            mp4: '/videos/hero-salon.mp4',
            poster: '/images/hero/hero-poster.jpg',
            duration: 10,
        },
        accentColor: 'hsl(220, 25%, 20%)',
    },
    {
        id: 'education',
        slug: 'education',
        number: '02',
        name: {
            en: 'Education',
            id: 'Edukasi',
        },
        tagline: {
            en: 'Elevate Your Craft',
            id: 'Tingkatkan Keahlian Anda',
        },
        description: {
            en: 'Comprehensive training programs led by industry masters. From foundational techniques to advanced artistry — grow with every session.',
            id: 'Program pelatihan lengkap dipimpin master industri. Dari teknik dasar hingga seni tingkat lanjut — berkembang di setiap sesi.',
        },
        cta: {
            label: {
                en: 'Discover Programs',
                id: 'Temukan Program',
            },
            href: '/education',
        },
        video: {
            webm: '/videos/hero-salon.mp4',
            mp4: '/videos/hero-salon.mp4',
            poster: '/images/hero/hero-poster.jpg',
            duration: 10,
        },
        accentColor: 'hsl(200, 30%, 22%)',
    },
    {
        id: 'partnership',
        slug: 'partnership',
        number: '03',
        name: {
            en: 'Partnership',
            id: 'Kemitraan',
        },
        tagline: {
            en: 'Grow Together',
            id: 'Bertumbuh Bersama',
        },
        description: {
            en: 'Strategic partnership opportunities designed for mutual success. Access exclusive pricing, priority support, and growth resources.',
            id: 'Peluang kemitraan strategis dirancang untuk kesuksesan bersama. Akses harga eksklusif, dukungan prioritas, dan sumber daya pertumbuhan.',
        },
        cta: {
            label: {
                en: 'Become Partner',
                id: 'Jadi Partner',
            },
            href: '/partnership/become-partner',
        },
        video: {
            webm: '/videos/hero-salon.mp4',
            mp4: '/videos/hero-salon.mp4',
            poster: '/images/hero/hero-poster.jpg',
            duration: 10,
        },
        accentColor: 'hsl(180, 20%, 18%)',
    },
] as const;

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
        prev: index > 0 ? services[index - 1] : null,
        next: index < services.length - 1 ? services[index + 1] : null,
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

export const servicesExperienceContent = {
    en: {
        kicker: 'Our Services',
        title: 'Complete Solutions for Your Salon Business',
        ariaLabel: 'Services showcase',
        keyboardHint: 'Use arrow keys to navigate',
    },
    id: {
        kicker: 'Layanan Kami',
        title: 'Solusi Lengkap untuk Bisnis Salon Anda',
        ariaLabel: 'Showcase layanan',
        keyboardHint: 'Gunakan tombol panah untuk navigasi',
    },
} as const;

export function getServicesExperienceContent(locale: Locale) {
    return servicesExperienceContent[locale];
}
