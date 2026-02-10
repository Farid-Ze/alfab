/**
 * TrustBadges — Enterprise trust indicators
 *
 * Displays trust/credibility badges above the footer to build confidence.
 * Common enterprise pattern in e-commerce and B2B sites.
 *
 * Features:
 * - Responsive grid: 4-col → 2-col → 1-col
 * - Accessible: proper heading hierarchy, sr-only descriptors
 * - Intersection Observer for scroll-reveal animation
 * - Icon mapping for common trust indicators
 */
"use client";

import { useRef, useState, useEffect } from "react";
import { Shield, Truck, Headphones, Award, Clock, CheckCircle } from "lucide-react";
import { type Locale, t, getTranslation } from "@/lib/i18n";
import { type TrustBadge } from "../header/navigation-data";

const iconMap = {
    shield: Shield,
    truck: Truck,
    headphones: Headphones,
    award: Award,
    clock: Clock,
    check: CheckCircle,
} as const;

interface TrustBadgesProps {
    badges: TrustBadge[];
    locale?: Locale;
}

export function TrustBadges({ badges, locale = "id" }: TrustBadgesProps) {
    const translations = t(locale);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    // Intersection Observer for scroll-reveal
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    if (badges.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="trust-badges-section"
            aria-label="Why choose us"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16">
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-700 ease-out ${
                        isRevealed
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                    }`}
                >
                    {badges.map((badge, index) => {
                        const IconComponent = iconMap[badge.icon];

                        return (
                            <div
                                key={badge.id}
                                className="trust-badge-item flex flex-col items-center text-center gap-3"
                                style={{
                                    transitionDelay: isRevealed ? `${index * 100}ms` : "0ms",
                                }}
                            >
                                <div className="trust-badge-icon">
                                    <IconComponent
                                        size={28}
                                        strokeWidth={1.2}
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="text-sm font-medium text-neutral-900 tracking-wide">
                                    {badge.label}
                                </h3>
                                <p className="text-xs text-neutral-500 leading-relaxed max-w-[200px]">
                                    {getTranslation(translations as Record<string, unknown>, badge.descriptionKey)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/**
 * PaymentMethods — Payment method badge display
 *
 * Renders a row of accepted payment method logos/labels.
 * Enterprise pattern for building transactional trust.
 */

interface PaymentMethod {
    id: string;
    label: string;
}

interface PaymentMethodsProps {
    methods: PaymentMethod[];
    label?: string;
}

export function PaymentMethods({ methods, label = "Accepted payment methods" }: PaymentMethodsProps) {
    if (methods.length === 0) return null;

    return (
        <div className="payment-methods" role="group" aria-label={label}>
            <p className="text-xs text-neutral-500 mb-3 tracking-widest uppercase font-medium">
                Payment
            </p>
            <div className="flex flex-wrap items-center gap-2">
                {methods.map((method) => (
                    <span
                        key={method.id}
                        className="payment-badge"
                        title={method.label}
                    >
                        {method.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
