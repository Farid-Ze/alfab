"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { hoverScale, tapScale } from "@/lib/animations";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500",
    secondary: "bg-primary-800 text-white hover:bg-primary-900 focus:ring-primary-800",
    outline: "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-300",
    ghost: "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-200",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

/**
 * Button
 * 
 * Animated button with variants and loading state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            children,
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            disabled,
            ...props
        },
        ref
    ) {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    // Base
                    "inline-flex items-center justify-center gap-2",
                    "rounded-lg font-medium",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    // Variants
                    variantClasses[variant],
                    sizeClasses[size],
                    fullWidth && "w-full",
                    className
                )}
                disabled={disabled || isLoading}
                whileHover={disabled ? undefined : hoverScale}
                whileTap={disabled ? undefined : tapScale}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                )}
                {children}
            </motion.button>
        );
    }
);

export default Button;
