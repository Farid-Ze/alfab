import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "background" | "panel" | "none";

type SectionSpacing = "default" | "tight" | "loose";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "section" | "div";
  tone?: SectionTone;
  spacing?: SectionSpacing;
};

const toneClass: Record<SectionTone, string> = {
  background: "bg-background",
  panel: "bg-panel",
  none: "",
};

const spacingClass: Record<SectionSpacing, string> = {
  default: "py-24 lg:py-32",
  tight: "py-16 lg:py-20",
  loose: "py-28 lg:py-36",
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
