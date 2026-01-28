# Component Contribution Guide

This guide outlines the standards for creating and modifying UI components in the Alfa Beauty Design System.

## 1. Atomic Design Principles

We structure our components based on Atomic Design:

- **Atoms** (`src/components/ui`): Indivisible elements (Button, Input, Icon).
- **Atoms** (`src/components/ui`): Indivisible elements (Button, Input, Icon).
- **Domain Modules** (`src/components/lead`, `src/components/products`): Feature-specific groups.
- **Site Layouts** (`src/components/site`): Global layout elements (Header, Footer).
- **Pages** (`src/app`): Route definitions.

## 2. Component Structure

Every component should follow this structure:

```tsx
// Imports (Absolute paths)
import { cn } from "@/lib/utils";

// Types (Props)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// Component Definition
export default function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button 
      className={cn(
        "base-classes",
        variant === "primary" && "primary-classes",
        className
      )} 
      {...props} 
    />
  );
}
```

## 3. Rules & Best Practices

### A. Styling

- Use **Tailwind CSS** for all styling.
- **Do NOT** use arbitrary values (e.g. `w-[123px]`) unless absolutely necessary. Use theme tokens.
- Use `cn()` utility for class merging.
- Enforce **Modern Luxury** aesthetic:
  - Sharp corners (`rounded-none`).
  - Uppercase buttons with wide tracking.
  - Generous padding.

### B. Accessibility (a11y)

- All interactive elements must have `aria-label` if no text is present.
- Use semantic HTML (`<button>`, `<article>`, `<nav>`).
- Ensure keyboard focus states are visible (`focus-visible:ring`).

### C. Performance

- Use `next/image` for all images.
- Lazy load heavy icons or components.
- Avoid large 3rd party libraries if native browser features suffice.

## 4. Linting

Before submitting, run:

```bash
npm run lint
```

This ensures your component adheres to our architectural freeze constraints.
