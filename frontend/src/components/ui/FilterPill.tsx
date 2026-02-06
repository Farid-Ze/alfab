"use client";

import { forwardRef } from "react";

interface FilterPillProps {
    /** Label to display on the pill */
    label: string;
    /** Whether the pill is currently selected/active */
    active: boolean;
    /** Click handler when pill is toggled */
    onClick: () => void;
    /** Optional className for custom styling */
    className?: string;
}

/**
 * Filter Pill Component
 * 
 * A pill-shaped toggle button used for quick filtering.
 * Used in ProductFilters for brand quick-filter bar.
 * 
 * Uses design tokens:
 * - ui-radius-pill for rounded corners
 * - transition-all-elegant for smooth transitions
 * - type-data / type-data-strong for typography
 */
const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
    ({ label, active, onClick, className = "" }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                onClick={onClick}
                aria-pressed={active}
                className={`
                    ui-radius-pill touch-target transition-all-elegant border
                    ${active
                        ? "bg-foreground text-background border-foreground type-data-strong"
                        : "bg-background text-muted-strong border-border hover:bg-subtle hover:border-muted-strong hover:text-foreground type-data"
                    }
                    ${className}
                `}
                style={{
                    paddingLeft: "var(--space-4)",
                    paddingRight: "var(--space-4)",
                    paddingTop: "var(--space-2)",
                    paddingBottom: "var(--space-2)",
                }}
            >
                {label}
            </button>
        );
    }
);

FilterPill.displayName = "FilterPill";

export default FilterPill;
