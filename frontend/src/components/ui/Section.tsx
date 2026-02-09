"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { fadeInUp, viewport } from "@/lib/animations";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    background?: "default" | "muted" | "inverse" | "accent";
    animate?: boolean;
    variants?: Variants;
}

const paddingClasses = {
    none: "",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
};

const backgroundClasses = {
    default: "bg-white",
    muted: "bg-neutral-50",
    inverse: "bg-primary-900 text-white",
    accent: "bg-secondary-50",
};

/**
 * Section
 * 
 * Page section wrapper with padding, background, and optional animation.
 */
export function Section({
    children,
    className,
    id,
    padding = "lg",
    background = "default",
    animate = true,
    variants = fadeInUp,
}: SectionProps) {
    const classes = cn(
        paddingClasses[padding],
        backgroundClasses[background],
        className
    );

    if (animate) {
        return (
            <motion.section
                id={id}
                className={classes}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={variants}
            >
                {children}
            </motion.section>
        );
    }

    return (
        <section id={id} className={classes}>
            {children}
        </section>
    );
}

export default Section;
