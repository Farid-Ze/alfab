import Link from "next/link";
import { headers } from "next/headers";
import { t } from "@/lib/i18n";
import { resolveLocale } from "@/lib/page-helpers";

/**
 * Not Found Page for locale routes
 * 
 * Custom 404 page with user-friendly design.
 * Extracts locale from request URL for i18n support.
 * Per paket-a.md UAT-16 requirement.
 */
export default async function NotFound() {
    const headersList = await headers();
    const url = headersList.get("x-url") || headersList.get("referer") || "/id";
    const pathSegments = new URL(url, "http://localhost").pathname.split("/");
    const localeSegment = pathSegments[1] ?? "";
    const locale = resolveLocale(localeSegment);
    const translations = t(locale);
    const nf = translations.notFound as { title: string; description: string; backHome: string };

    return (
        <div className="section">
            <div className="container">
                <div className="max-w-md mx-auto text-center">
                    <div className="text-8xl font-bold text-primary-200 mb-4">
                        404
                    </div>
                    <h1 className="text-2xl font-bold text-primary-800 mb-4">
                        {nf.title}
                    </h1>
                    <p className="text-neutral-600 mb-8">
                        {nf.description}
                    </p>
                    <Link href={`/${locale}`} className="btn btn-primary">
                        {nf.backHome}
                    </Link>
                </div>
            </div>
        </div>
    );
}
