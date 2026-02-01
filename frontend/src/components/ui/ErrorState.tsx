import React from "react";
import Button from "@/components/ui/Button";
import AppLink from "@/components/ui/AppLink";

interface ErrorStateProps {
    title?: string;
    description?: string;
    retry?: () => void;
    showHome?: boolean;
    homeHref?: string;
    homeLabel?: string;
    className?: string;
}

/**
 * Standardized Error UI Component
 * Used by error.tsx, global-error.tsx, and boundary fallbacks.
 */
export default function ErrorState({
    title = "Something went wrong",
    description = "We encountered an unexpected error. Please try again.",
    retry,
    showHome = true,
    homeHref = "/",
    homeLabel = "Return Home",
    className = "",
}: ErrorStateProps) {
    return (
        <div className={`flex min-h-[50vh] flex-col items-center justify-center p-6 text-center ${className}`}>
            <div className="rounded-full bg-error/10 p-4 mb-6">
                <svg
                    className="h-10 w-10 text-error"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>

            <h2 className="type-h3 text-foreground mb-3">{title}</h2>
            <p className="type-body text-muted max-w-md mb-8">{description}</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
                {retry && (
                    <Button onClick={retry} variant="primary">
                        Try Again
                    </Button>
                )}

                {showHome && (
                    <AppLink
                        href={homeHref}
                        className="type-ui-strong text-foreground/70 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground"
                    >
                        {homeLabel}
                    </AppLink>
                )}
            </div>
        </div>
    );
}
