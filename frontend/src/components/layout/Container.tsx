import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide" | "full";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
};

/**
 * Container Component
 * 
 * Uses design tokens for consistent spacing:
 * - --layout-container-padding (responsive: 16px → 24px → 32px)
 * - --layout-content-max-width (1280px)
 */
export default function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        // Base: use CSS custom property for padding
        "container mx-auto",
        // Size variants using tokens
        size === "default" && "max-w-container-default",
        size === "narrow" && "max-w-container-narrow",
        size === "wide" && "max-w-container-wide",
        size === "full" && "max-w-full",
        className
      )}
      style={{
        paddingLeft: "var(--layout-container-padding)",
        paddingRight: "var(--layout-container-padding)",
      }}
    >
      {children}
    </div>
  );
}
