"use client";

import { cn } from "@/lib/utils";

interface ShimmerProps {
    className?: string;
    width?: number | string;
    height?: number | string;
}

/**
 * Shimmer
 * 
 * Animated loading placeholder for images and content.
 */
export function Shimmer({
    className,
    width = "100%",
    height = "100%",
}: ShimmerProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-neutral-200 rounded",
                className
            )}
            style={{ width, height }}
        >
            <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
            />
        </div>
    );
}

/**
 * ImageSkeleton
 * 
 * Skeleton placeholder for images with aspect ratio.
 */
export function ImageSkeleton({
    aspectRatio = "16:9",
    className,
}: {
    aspectRatio?: "16:9" | "4:3" | "1:1" | "3:2";
    className?: string;
}) {
    const paddingMap = {
        "16:9": "56.25%",
        "4:3": "75%",
        "1:1": "100%",
        "3:2": "66.67%",
    };

    return (
        <div
            className={cn("relative w-full overflow-hidden rounded", className)}
            style={{ paddingBottom: paddingMap[aspectRatio] }}
        >
            <Shimmer className="absolute inset-0" />
        </div>
    );
}

export default Shimmer;
