"use client";

/**
 * Error Boundary for locale routes
 * 
 * Handles runtime errors gracefully with a user-friendly UI
 * Must be a Client Component to use error/reset props
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="section">
            <div className="container">
                <div className="max-w-md mx-auto text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-primary-800 mb-4">
                        Something went wrong
                    </h1>
                    <p className="text-neutral-600 mb-8">
                        We encountered an unexpected error. Please try again.
                    </p>
                    <button
                        onClick={reset}
                        className="btn btn-primary"
                    >
                        Try again
                    </button>
                    {process.env.NODE_ENV === "development" && error.message && (
                        <p className="mt-4 text-sm text-red-600 font-mono">
                            {error.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
