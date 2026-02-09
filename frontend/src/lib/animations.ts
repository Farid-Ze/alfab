/**
 * Animation Utilities
 * 
 * Framer Motion variants and animation helpers.
 */

import { Variants } from "framer-motion";

// ============================================
// Fade Variants
// ============================================

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

// ============================================
// Stagger Containers
// ============================================

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    },
};

// ============================================
// Scale Variants
// ============================================

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    },
};

// ============================================
// Slide Variants
// ============================================

export const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

// ============================================
// Hover Variants
// ============================================

export const hoverScale = {
    scale: 1.02,
    transition: { duration: 0.2 },
};

export const tapScale = {
    scale: 0.98,
};

// ============================================
// Viewport Settings
// ============================================

export const viewport = {
    once: true,
    amount: 0.2,
    margin: "-50px",
};

// ============================================
// Transition Presets
// ============================================

export const transitions = {
    fast: { duration: 0.15, ease: "easeOut" },
    normal: { duration: 0.3, ease: "easeOut" },
    slow: { duration: 0.5, ease: "easeOut" },
    spring: { type: "spring", stiffness: 300, damping: 20 },
} as const;
