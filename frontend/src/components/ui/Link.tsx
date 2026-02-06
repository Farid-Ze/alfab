import { cn } from "@/lib/utils";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

interface LinkProps
    extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
    external?: boolean;
    underline?: boolean;
}

/**
 * Link
 * 
 * Next.js Link wrapper with external link handling.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    function Link(
        {
            children,
            className,
            external = false,
            underline = false,
            href,
            ...props
        },
        ref
    ) {
        const externalProps = external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

        return (
            <NextLink
                ref={ref}
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
);

export default Link;
