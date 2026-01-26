/**
 * Loading State (Jamstack UX)
 * Shown during route transitions via React Suspense.
 */
export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div
                    className="h-10 w-10 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground"
                    role="status"
                    aria-label="Loading"
                />
                <p className="type-body text-muted-strong">Loading...</p>
            </div>
        </div>
    );
}
