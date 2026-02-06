import { env, clientEnv } from "./env";

/**
 * Application Configuration
 * 
 * Centralized config with:
 * - Type-safe access to settings
 * - Feature flags structure
 * - Runtime-safe defaults
 */

/**
 * Site configuration
 */
export const siteConfig = {
    name: "Alfa Beauty Cosmetica",
    shortName: "Alfa Beauty",
    description: "Professional Beauty Distribution Partner in Indonesia",
    url: clientEnv.NEXT_PUBLIC_SITE_URL,

    // Contact info
    contact: {
        whatsapp: clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER || "+6281234567890",
        whatsappMessage: clientEnv.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
            "Halo, saya tertarik untuk mengetahui lebih lanjut tentang produk Alfa Beauty",
        email: "hello@alfabeauty.co.id",
    },

    // Social links
    social: {
        instagram: "https://instagram.com/alfabeautycosmetica",
        facebook: "https://facebook.com/alfabeautycosmetica",
        linkedin: "https://linkedin.com/company/alfabeautycosmetica",
    },

    // Company info
    company: {
        legalName: "PT Alfa Beauty Cosmetica",
        foundingYear: 2020,
        address: {
            street: "Jl. Example No. 123",
            city: "Jakarta",
            province: "DKI Jakarta",
            postalCode: "12345",
            country: "Indonesia",
        },
    },
} as const;

/**
 * Feature flags
 * 
 * Enable/disable features based on environment
 */
export const features = {
    // Analytics
    enableAnalytics: Boolean(clientEnv.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
    enableWebVitals: true,

    // Lead capture
    enableLeadForm: true,
    enableWhatsAppCTA: true,

    // Content
    enableBlog: false, // Future feature
    enablePortfolio: false, // Future feature

    // Development
    enableDevTools: process.env.NODE_ENV === "development",
    enableMockData: process.env.NODE_ENV === "development",
} as const;

/**
 * API configuration
 */
export const apiConfig = {
    baseUrl: clientEnv.NEXT_PUBLIC_SITE_URL,
    timeout: 10000, // 10 seconds
    retries: 3,
} as const;

/**
 * SEO defaults
 */
export const seoConfig = {
    titleTemplate: "%s | Alfa Beauty",
    defaultTitle: "Alfa Beauty Cosmetica - Professional Beauty Distribution Partner",
    defaultDescription: "Products, education, and technical support for salons & barbershops in Indonesia",
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: siteConfig.name,
    },
    twitter: {
        cardType: "summary_large_image",
    },
} as const;

export default siteConfig;
