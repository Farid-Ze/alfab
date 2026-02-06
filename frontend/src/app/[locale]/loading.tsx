/**
 * Loading State for locale routes
 * 
 * Displays skeleton UI while page content loads
 * This provides instant feedback to users during navigation
 */
export default function Loading() {
    return (
        <div className="section">
            <div className="container">
                <div className="max-w-3xl mx-auto animate-pulse">
                    {/* Hero skeleton */}
                    <div className="text-center mb-12">
                        <div className="h-12 bg-neutral-200 rounded-lg mb-4 mx-auto max-w-xl" />
                        <div className="h-6 bg-neutral-200 rounded mb-2 mx-auto max-w-md" />
                        <div className="h-6 bg-neutral-200 rounded mx-auto max-w-sm" />
                    </div>

                    {/* CTA buttons skeleton */}
                    <div className="flex gap-4 justify-center mb-16">
                        <div className="h-12 w-36 bg-neutral-200 rounded-lg" />
                        <div className="h-12 w-36 bg-neutral-200 rounded-lg" />
                    </div>

                    {/* Cards skeleton */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card p-8">
                                <div className="w-16 h-16 bg-neutral-200 rounded-full mx-auto mb-6" />
                                <div className="h-6 bg-neutral-200 rounded mb-3 mx-auto max-w-24" />
                                <div className="h-4 bg-neutral-200 rounded mb-2" />
                                <div className="h-4 bg-neutral-200 rounded w-3/4 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
