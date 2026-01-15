import type { ReactNode, HTMLAttributes } from "react";

type CardVariant = "default" | "elevated" | "interactive" | "bordered";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  as?: "div" | "article" | "section";
};

const baseClass = "ui-radius-tight";

const variantClass: Record<CardVariant, string> = {
  default: "border border-border bg-panel",
  elevated: "bg-panel-elevated shadow-sm",
  interactive:
    "border border-border bg-panel ui-interactive-card cursor-pointer hover:bg-subtle hover:border-border-strong focus-visible:border-border-focus focus-visible:shadow-focus",
  bordered: "border-2 border-border bg-background",
};

export default function Card({
  children,
  variant = "default",
  as: Component = "div",
  className = "",
  ...props
}: CardProps) {
  return (
    <Component
      {...props}
      className={`${baseClass} ${variantClass[variant]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
