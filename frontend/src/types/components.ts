/**
 * Component Type Definitions
 * 
 * Shared prop types for components.
 */

import type { ReactNode } from "react";

// ============================================
// Layout Props
// ============================================

/**
 * Base props for layout components
 */
export interface LayoutProps {
    children: ReactNode;
    className?: string;
}

/**
 * Section props
 */
export interface SectionProps extends LayoutProps {
    id?: string;
    fullWidth?: boolean;
}

/**
 * Container props
 */
export interface ContainerProps extends LayoutProps {
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

// ============================================
// Interactive Props
// ============================================

/**
 * Button variants
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";

/**
 * Button sizes
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Base button props
 */
export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

/**
 * Link button props (extends anchor)
 */
export interface LinkButtonProps extends ButtonProps {
    href: string;
    external?: boolean;
}

// ============================================
// Form Props
// ============================================

/**
 * Input sizes
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Base input props
 */
export interface InputProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    size?: InputSize;
}

/**
 * Select option
 */
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

// ============================================
// Card Props
// ============================================

/**
 * Card variants
 */
export type CardVariant = "default" | "elevated" | "bordered" | "ghost";

/**
 * Card props
 */
export interface CardProps extends LayoutProps {
    variant?: CardVariant;
    hoverable?: boolean;
    clickable?: boolean;
}

// ============================================
// Animation Props
// ============================================

/**
 * Animation variants
 */
export type AnimationVariant = "fade" | "slide-up" | "slide-down" | "scale" | "none";

/**
 * Animation props
 */
export interface AnimationProps {
    animation?: AnimationVariant;
    delay?: number;
    duration?: number;
    once?: boolean;
}

// ============================================
// Icon Props
// ============================================

/**
 * Icon sizes
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Icon props
 */
export interface IconProps {
    size?: IconSize;
    className?: string;
    "aria-label"?: string;
}
