"use client";

/**
 * SectionHeader - ineo-sense style header with pagination
 *
 * Uses CSS design tokens:
 * - type-h1 for title
 * - type-body for body text
 * - ui-radius-pill for pagination
 */

interface SectionHeaderProps {
    title: string;
    body?: string;
    currentPage?: number;
    totalPages?: number;
    showPagination?: boolean;
}

export default function SectionHeader({
    title,
    body,
    currentPage = 1,
    totalPages = 1,
    showPagination = false,
}: SectionHeaderProps) {
    return (
        <div className="mb-12 lg:mb-16">
            {/* Title */}
            <h2 className="type-h1 text-balance text-foreground">
                {title}
            </h2>

            {/* Body text */}
            {body && (
                <p className="type-body mt-4 max-w-[560px] text-foreground-muted">
                    {body}
                </p>
            )}

            {/* Pagination indicator (ineo-sense style) */}
            {showPagination && totalPages > 1 && (
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 ui-radius-pill bg-panel border border-border">
                    <span className="type-ui-xs font-semibold text-foreground">
                        {currentPage}
                    </span>
                    <span className="type-ui-xs text-muted">-</span>
                    <span className="type-ui-xs text-muted">{totalPages}</span>
                </div>
            )}
        </div>
    );
}
