import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "background" | "panel" | "none";
type SectionSpacing = "default" | "tight" | "loose" | "none";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "section" | "div" | "article" | "aside";
  tone?: SectionTone;
  spacing?: SectionSpacing;
};

/**
 * Section Component
 * 
 * Uses design tokens for consistent vertical rhythm:
 * - section-md, section-lg, section-xl from layout.css
 * - bg-background, bg-panel from themes.css
 */

const toneClass: Record<SectionTone, string> = {
  background: "bg-background",
  panel: "bg-panel",
  none: "",
};

const spacingClass: Record<SectionSpacing, string> = {
  default: "section-lg",      // Uses --space-24 → --space-32
  tight: "section-md",        // Uses --space-12
  loose: "section-xl",        // Uses --space-32 → --space-40
  none: "",
};

export default function Section({
  children,
  as: Component = "section",
  tone = "background",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <Component {...props} className={cn(spacingClass[spacing], toneClass[tone], className)}>
      {children}
    </Component>
  );
}
