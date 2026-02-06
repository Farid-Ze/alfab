import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    as?: "div" | "section" | "article" | "main";
}

const sizeClasses = {
    sm: "max-w-3xl",      // 768px
    md: "max-w-5xl",      // 1024px
    lg: "max-w-6xl",      // 1152px
    xl: "max-w-7xl",      // 1280px
    full: "max-w-full",
};

/**
 * Container
 * 
 * Responsive container with max-width and horizontal padding.
 */
export function Container({
    children,
    className,
    size = "xl",
    as: Component = "div",
}: ContainerProps) {
    return (
        <Component
            className={cn(
                "mx-auto w-full px-4 sm:px-6 lg:px-8",
                sizeClasses[size],
                className
            )}
        >
            {children}
        </Component>
    );
}

export default Container;
