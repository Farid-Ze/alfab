import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "type-ui-sm-strong ui-focus-ring ui-radius-tight relative inline-flex items-center justify-center gap-2 border select-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-foreground bg-foreground text-background ui-btn-primary hover:bg-foreground-soft active:scale-[0.98]",
  secondary:
    "border-border-strong bg-background text-foreground ui-btn-secondary hover:bg-subtle hover:border-border-strong active:bg-subtle-hover active:scale-[0.98]",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-subtle active:bg-subtle-hover",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 type-data-strong",
  md: "h-11 px-5",
  lg: "h-12 px-6",
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
  return `${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

function Spinner() {
  return (
    <span className="ui-spinner" aria-hidden="true" />
  );
}

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={loading}
      className={getButtonClassName({ variant, size, className })}
    >
      {loading ? (
        <Spinner />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span className={loading ? "opacity-0" : undefined}>{children}</span>
      {!loading && rightIcon ? (
        <span className="shrink-0">{rightIcon}</span>
      ) : null}
      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      ) : null}
    </button>
  );
}
