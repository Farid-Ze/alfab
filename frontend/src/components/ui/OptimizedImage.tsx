import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
    alt: string;
    aspectRatio?: "square" | "video" | "portrait" | "auto";
}

/**
 * OptimizedImage - Performance-optimized image wrapper
 * 
 * Features:
 * - Automatic responsive sizes
 * - Blur placeholder (shimmer effect)
 * - Lazy loading by default
 * - Aspect ratio presets to prevent CLS
 */
export function OptimizedImage({
    alt,
    className,
    aspectRatio = "auto",
    priority = false,
    ...props
}: OptimizedImageProps) {
    const aspectClasses = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        auto: "",
    };

    return (
        <div className={cn("relative overflow-hidden", aspectClasses[aspectRatio], className)}>
            <Image
                alt={alt}
                fill={aspectRatio !== "auto"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading={priority ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZTVlN2ViIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjwvc3ZnPg=="
                priority={priority}
                {...props}
            />
        </div>
    );
}
