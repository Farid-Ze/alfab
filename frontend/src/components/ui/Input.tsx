import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  success?: boolean;
};

const base =
  "type-ui ui-focus-ring ui-radius-tight block w-full border bg-panel px-3 py-2.5 text-foreground placeholder:text-muted-soft transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", error, success, ...props },
  ref
) {
  const stateClass = error
    ? "border-error bg-error-bg focus:border-error"
    : success
      ? "border-success"
      : "border-border-strong hover:border-muted focus:border-foreground";

  return (
    <input
      ref={ref}
      {...props}
      className={`${base} ${stateClass} ${className}`.trim()}
      aria-invalid={error ? "true" : undefined}
    />
  );
});

export default Input;
