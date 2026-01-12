import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center border font-semibold tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-900",
  secondary: "border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-50",
  ghost: "border-transparent bg-transparent text-zinc-950 hover:bg-zinc-100",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function getButtonClassName({
  variant,
  size,
  className = "",
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return `${base} ${variantClass[variant]} ${sizeClass[size]} rounded-[2px] ${className}`.trim();
}

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      {...props}
      className={getButtonClassName({ variant, size, className })}
    />
  );
}
