"use client";

/**
 * VideoHeroSection - Next.js 16 Video Background Hero
 *
 * Best Practices:
 * - Client component for video autoplay handling
 * - Lazy loading with priority=false
 * - Fallback poster image
 * - Accessible with proper contrast overlay
 * - Responsive text sizing
 * - Uses CSS design tokens for consistency
 */

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface VideoHeroSectionProps {
    headline: string;
    subHeadline: string;
    ctaPrimary?: {
        label: string;
        href: string;
    };
    ctaSecondary?: {
        label: string;
        href: string;
    };
    videoSrc?: string;
    posterSrc?: string;
}

export default function VideoHeroSection({
    headline,
    subHeadline,
    ctaPrimary,
    ctaSecondary,
    videoSrc = "/videos/hero-bg.mp4",
    posterSrc = "/images/hero-poster.jpg",
}: VideoHeroSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(() => {
                // Autoplay blocked, video will show poster
            });
        }
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-100" : "opacity-0"
                    }`}
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                onLoadedData={() => setIsVideoLoaded(true)}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 ui-hero-overlay" />

            {/* Content */}
            <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
                {/* Headline */}
                <h1 className="type-h1 ui-hero-text mb-6">
                    {headline}
                </h1>

                {/* Sub-headline */}
                <p className="type-body ui-hero-subtext mb-10 max-w-[700px] mx-auto">
                    {subHeadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {ctaPrimary && (
                        <Link
                            href={ctaPrimary.href}
                            className="ui-hero-cta-primary"
                        >
                            {ctaPrimary.label}
                        </Link>
                    )}
                    {ctaSecondary && (
                        <Link
                            href={ctaSecondary.href}
                            className="ui-hero-cta-secondary"
                        >
                            {ctaSecondary.label}
                        </Link>
                    )}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </section>
    );
}
