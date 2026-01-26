"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type LinkComponentProps = ComponentProps<typeof Link>;

type TextLinkProps = {
    href: LinkComponentProps["href"];
    children: React.ReactNode;
    className?: string;
    /** Use on dark backgrounds (hero, dark sections) */
    onDark?: boolean;
} & Omit<LinkComponentProps, "href" | "className" | "children">;

/**
 * TextLink - CK-style editorial underlined text CTA
 *
 * Use instead of ButtonLink when you want an editorial,
 * magazine-like appearance (e.g., "Shop Women" / "Shop Men").
 */
export default function TextLink({
    href,
    children,
    className = "",
    onDark = false,
    ...linkProps
}: TextLinkProps) {
    const colorClass = onDark ? "ui-hero-on-media" : "text-foreground";

    // We assume the href is providing the abstract path (e.g. /products)
    // In a real app, we'd wrap next/link with a smart LocalizedLink component.
    // For this refactor, we are just ensuring TextLink doesn't break.
    // IMPORTANT: The caller is responsible for passing the correct path.
    // If we wanted to enforce it here, we'd need the current locale context.

    return (
        <Link
            href={href}
            className={`ui-cta-text ui-focus-ring ${colorClass} ${className}`}
            {...linkProps}
        >
            {children}
        </Link>
    );
}
