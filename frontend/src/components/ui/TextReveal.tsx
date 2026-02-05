"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { EASE_OUT_QUINT, MOTION_DURATION, VIEWPORT_MARGIN_REVEAL } from "@/lib/motion";

type TextRevealProps = {
    children: string;
    delay?: number;
    staggerDelay?: number;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    once?: boolean;
    direction?: "up" | "down";
};

/**
 * TextReveal: Ineo-Sense style text reveal animation.
 * Each line/word slides up from behind a mask with elegant easing.
 * Used for hero headlines and section titles.
 */
export default function TextReveal({
    children,
    delay = 0,
    staggerDelay = 0.08,
    className = "",
    as: Component = "span",
    once = true,
    direction = "up",
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: VIEWPORT_MARGIN_REVEAL });

    // Support explicit line breaks ("\n") for parity with reference layouts.
    // Each line is revealed word-by-word.
    const lines = useMemo(
        () =>
            children
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
        [children]
    );

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: delay,
                staggerChildren: staggerDelay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            y: direction === "up" ? "100%" : "-100%",
            opacity: 0,
        },
        visible: {
            y: "0%",
            opacity: 1,
            transition: {
                duration: MOTION_DURATION.reveal,
                ease: EASE_OUT_QUINT,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`inline-flex flex-wrap ${className}`}
            aria-label={children}
        >
            {lines.map((line, lineIndex) => {
                const words = line.split(/\s+/g).filter(Boolean);
                return (
                    <span
                        key={`line-${lineIndex}`}
                        className="block w-full"
                        style={{ marginBottom: lineIndex < lines.length - 1 ? "0.08em" : undefined }}
                    >
                        {words.map((word, wordIndex) => (
                            <span
                                key={`${word}-${lineIndex}-${wordIndex}`}
                                className="overflow-hidden inline-block"
                                style={{ marginRight: "0.25em" }}
                            >
                                <Component className="sr-only">{word}</Component>
                                <motion.span variants={wordVariants} className="inline-block" aria-hidden="true">
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </span>
                );
            })}
        </motion.div>
    );
}
