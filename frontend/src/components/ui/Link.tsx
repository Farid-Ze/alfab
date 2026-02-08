import { cn } from "@/lib/utils";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink> & {
    external?: boolean;
    underline?: boolean;
};

/**
 * Link
 * 
 * Next.js Link wrapper with external link handling.
 * Compatible with typedRoutes.
 */
export function Link({
    children,
    className,
    external = false,
    underline = false,
    href,
    ...props
}: LinkProps) {
    const externalProps = external
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {};

    return (
        <NextLink
            href={href}
            className={cn(
                "text-secondary-600 hover:text-secondary-700",
                "transition-colors duration-200",
                underline && "underline underline-offset-2",
                className
            )}
            {...externalProps}
            {...props}
        >
            {children}
        </NextLink>
    );
}

export default Link;
