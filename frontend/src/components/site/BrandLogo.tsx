import Link from "next/link";
import { siteConfig } from "@/lib/config";

interface BrandLogoProps {
    /** Target locale for the logo link */
    locale: string;
    /** Visual size variant */
    size?: "sm" | "lg" | "xl";
    /** Color variant */
    variant?: "dark" | "light";
    /** Optional click handler (e.g. to close mobile nav) */
    onClick?: () => void;
}

/**
 * Brand Logo - Consistent brand mark across header, footer, and mobile nav.
 * Pulls the brand name from siteConfig to ensure single source of truth.
 *
 * Sizes:
 * - sm: compact header / mobile bar (text-lg)
 * - lg: default (text-2xl)
 * - xl: utility row hero mark, Aesop-style prominent center logo (text-3xl)
 */
export function BrandLogo({ locale, size = "lg", variant = "dark", onClick }: BrandLogoProps) {
    const textClass =
        size === "xl"
            ? "text-3xl lg:text-4xl"
            : size === "lg"
              ? "text-2xl"
              : "text-lg";

    const colorClass = variant === "dark"
        ? "text-neutral-900"
        : "text-white";

    return (
        <Link href={`/${locale}`} className="inline-block" onClick={onClick}>
            <span
                className={`${textClass} font-light uppercase ${colorClass} tracking-ultra`}
            >
                {siteConfig.shortName}
            </span>
        </Link>
    );
}
