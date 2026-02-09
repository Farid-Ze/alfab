/**
 * Constants
 * 
 * Application-wide constants and configuration values.
 */

import { siteConfig } from "./config";

// ============================================
// Routes
// ============================================

export const ROUTES = {
    // Main pages
    home: "/",
    products: "/products",
    education: "/education",
    partnership: "/partnership",
    about: "/about",
    contact: "/contact",

    // Legal
    privacy: "/privacy",
    terms: "/terms",

    // API
    api: {
        health: "/api/health",
        leads: "/api/leads",
    },
} as const;

// ============================================
// External URLs
// ============================================

export const EXTERNAL_URLS = {
    whatsapp: (message?: string) => {
        const phone = siteConfig.contact.whatsapp.replace(/\D/g, "");
        const msg = encodeURIComponent(message || siteConfig.contact.whatsappMessage);
        return `https://wa.me/${phone}?text=${msg}`;
    },

    instagram: siteConfig.social.instagram,
    facebook: siteConfig.social.facebook,
    linkedin: siteConfig.social.linkedin,

    // Maps
    googleMaps: (address: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
} as const;

// ============================================
// Breakpoints (match Tailwind)
// ============================================

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

// ============================================
// Animation
// ============================================

export const ANIMATION = {
    duration: {
        instant: 0,
        fast: 150,
        normal: 300,
        slow: 500,
        slower: 700,
    },
    easing: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
} as const;

// ============================================
// Form Validation
// ============================================

export const VALIDATION = {
    name: {
        min: 2,
        max: 100,
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
        min: 10,
        max: 15,
        pattern: /^(\+62|62|0)[0-9]{9,12}$/,
    },
    message: {
        min: 10,
        max: 1000,
    },
} as const;

// ============================================
// Error Messages (Indonesian/English)
// ============================================

export const ERROR_MESSAGES = {
    required: {
        en: "This field is required",
        id: "Kolom ini wajib diisi",
    },
    invalidEmail: {
        en: "Please enter a valid email address",
        id: "Masukkan alamat email yang valid",
    },
    invalidPhone: {
        en: "Please enter a valid phone number",
        id: "Masukkan nomor telepon yang valid",
    },
    tooShort: {
        en: (min: number) => `Must be at least ${min} characters`,
        id: (min: number) => `Minimal ${min} karakter`,
    },
    tooLong: {
        en: (max: number) => `Must be no more than ${max} characters`,
        id: (max: number) => `Maksimal ${max} karakter`,
    },
    generic: {
        en: "Something went wrong. Please try again.",
        id: "Terjadi kesalahan. Silakan coba lagi.",
    },
} as const;

// ============================================
// Storage Keys
// ============================================

export const STORAGE_KEYS = {
    locale: "alfa-locale",
    theme: "alfa-theme",
    consent: "alfa-cookie-consent",
} as const;
