import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Page Component
 * 
 * Uses design tokens for consistent page structure:
 * - pt-header from layout.css (uses --layout-header-height)
 * - section-md for bottom padding
 */
export default function Page({ children, className, ...props }: PageProps) {
  return (
    <div
      {...props}
      className={cn("min-h-screen pt-header pb-section", className)}
      style={{
        // Fallback padding-bottom using token
        paddingBottom: "var(--space-16)",
      }}
    >
      {children}
    </div>
  );
}
