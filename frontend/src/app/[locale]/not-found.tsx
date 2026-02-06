import Link from "next/link";

/**
 * Not Found Page for locale routes
 * 
 * Custom 404 page with user-friendly design
 * Per paket-a.md UAT-16 requirement
 */
export default function NotFound() {
    return (
        <div className="section">
            <div className="container">
                <div className="max-w-md mx-auto text-center">
                    <div className="text-8xl font-bold text-primary-200 mb-4">
                        404
                    </div>
                    <h1 className="text-2xl font-bold text-primary-800 mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-neutral-600 mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <Link href="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
