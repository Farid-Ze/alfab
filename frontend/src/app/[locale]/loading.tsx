/**
 * Loading State for locale routes
 * 
 * Displays a generic skeleton UI while page content loads.
 * Works for all page types (not homepage-specific).
 * Includes accessibility attributes for screen readers.
 */
export default function Loading() {
    return (
        <div className="section" role="status" aria-label="Loading content">
            <div className="container">
                <div className="max-w-3xl mx-auto animate-pulse">
                    {/* Page heading skeleton */}
                    <div className="text-center mb-12">
                        <div className="h-10 bg-neutral-200 rounded-lg mb-4 mx-auto max-w-md" />
                        <div className="h-5 bg-neutral-200 rounded mb-2 mx-auto max-w-sm" />
                        <div className="h-5 bg-neutral-200 rounded mx-auto max-w-xs" />
                    </div>

                    {/* Content block skeleton */}
                    <div className="space-y-4 mb-12">
                        <div className="h-4 bg-neutral-200 rounded w-full" />
                        <div className="h-4 bg-neutral-200 rounded w-5/6" />
                        <div className="h-4 bg-neutral-200 rounded w-4/6" />
                    </div>

                    {/* CTA skeleton */}
                    <div className="flex gap-4 justify-center">
                        <div className="h-12 w-40 bg-neutral-200 rounded-lg" />
                    </div>

                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}
