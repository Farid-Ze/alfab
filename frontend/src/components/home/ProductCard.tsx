import Image from "next/image";
import AppLink from "@/components/ui/AppLink";
import type { Product } from "@/lib/types";

export interface ProductCardProps {
    product: Product;
    baseUrl: string;
    isDark: boolean;
}

/**
 * ProductCard - Individual product in carousel
 * LekkerHome approach: fixed aspect images + fixed min-height text block
 * Mobile-first: touch-friendly with proper spacing
 * Enhanced: audience badge + benefit snippet per UX research
 */
export function ProductCard({ product, baseUrl, isDark }: ProductCardProps) {
    // Get primary audience for badge
    const primaryAudience = product.audience?.[0];
    // Get first benefit as snippet
    const benefitSnippet = product.benefits?.[0];

    return (
        <AppLink
            href={`${baseUrl}/products/${product.slug}`}
            underline="none"
            className={`group carousel-card snap-start ui-radius-tight overflow-hidden flex flex-col h-full w-[80vw] sm:w-[16.25rem] ${isDark ? "bg-background/[0.08]" : "bg-foreground/[0.04]"}`}
            data-carousel-card
        >
            {/* Product Image - Fixed 1:1 aspect ratio (LekkerHome: uniform image heights) */}
            <div className="relative aspect-square overflow-hidden flex-shrink-0">
                <Image
                    src="/images/products/product-placeholder.jpg"
                    alt={`${product.brand} ${product.name}`}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 260px"
                    className="object-cover img-curated transition-cinematic group-hover:scale-105"
                />
                {/* Audience badge */}
                {primaryAudience && (
                    <span
                        className={`absolute top-2 left-2 type-data px-2 py-1 ui-radius-tight ${isDark
                            ? "bg-background text-foreground"
                            : "bg-foreground text-background"
                            }`}
                    >
                        {primaryAudience}
                    </span>
                )}
            </div>

            {/* Product Info - Fixed min-height for consistent card alignment */}
            <div className="p-3 flex flex-col min-h-[5.5rem]">
                <p className={`type-data-strong uppercase mb-1 ${isDark ? "text-background/75" : "text-foreground-muted"}`}>
                    {product.brand}
                </p>
                <h3 className={`type-body-strong line-clamp-2 ${isDark ? "text-background" : "text-foreground"}`}>
                    {product.name}
                </h3>
                {/* Benefit snippet for decision support */}
                {benefitSnippet && (
                    <p className={`type-data mt-1 line-clamp-1 ${isDark ? "text-background/60" : "text-muted"}`}>
                        {benefitSnippet}
                    </p>
                )}
            </div>
        </AppLink>
    );
}
