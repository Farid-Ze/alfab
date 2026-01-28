"use client";

import Image from "next/image";

interface HeroVideoProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    videoError: boolean;
    prefersReducedMotion: boolean;
    onError: () => void;
}

/**
 * HeroVideo - Background video with fallback image
 * Handles autoplay, error states, and poster image
 */
export default function HeroVideo({
    videoRef,
    videoError,
    prefersReducedMotion,
    onError,
}: HeroVideoProps) {
    if (videoError || prefersReducedMotion) {
        return (
            <Image
                src="/images/hero/hero-salon.jpg"
                alt="Professional salon interior"
                fill
                priority
                className="object-cover img-curated"
                sizes="100vw"
            />
        );
    }

    return (
        <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/hero-salon.jpg"
            onError={onError}
        >
            <source src="/videos/hero-salon.mp4" type="video/mp4" />
            <source src="/videos/hero-salon.webm" type="video/webm" />
        </video>
    );
}
