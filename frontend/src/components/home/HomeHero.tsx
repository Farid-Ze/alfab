"use client";

import { useRef, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import HeroVideo from "./HeroVideo";
import HeroContent from "./HeroContent";

/**
 * HomeHero - Full-bleed hero section with video background
 * 
 * Features:
 * - Video background with image fallback
 * - Gradient overlay for text readability
 * - Responsive layout (mobile-first)
 * - Trust indicator bar
 * 
 * Accessibility:
 * - Proper heading hierarchy (h1)
 * - Video has poster for slow connections
 * - Trust bar has ARIA roles
 */
export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    // Start video at 4 minutes (240 seconds) for visual interest
    if (videoRef.current) {
      videoRef.current.currentTime = 240;
      videoRef.current.play().catch(() => {
        // Video autoplay blocked - poster will be shown
      });
    }
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Video/Image Background - Full bleed */}
      {/* 
        Simplified responsive approach (Clean Code):
        - Mobile (<640px): Fixed height 70vh for reliable portrait display
        - Tablet+ (≥640px): 16/9 widescreen ratio for all larger screens
        
        This 2-state approach eliminates the jarring 639→640 and 1023→1024 jumps
        by using consistent height on mobile and consistent ratio on desktop.
        The video's object-cover handles natural cropping at all sizes.
      */}
      <div className="relative w-full h-[70vh] sm:h-auto sm:aspect-[16/9] max-h-[85vh]">
        <HeroVideo
          videoRef={videoRef}
          videoError={videoError}
          prefersReducedMotion={prefersReducedMotion}
          onError={() => setVideoError(true)}
        />

        {/* Gradient Overlays for Text Readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-foreground/10"
          aria-hidden="true"
        />

        {/* Content Overlay */}
        <HeroContent />
      </div>
    </section>
  );
}
