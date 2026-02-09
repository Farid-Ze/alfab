import { t } from "@/lib/i18n";
import { resolveLocale } from "@/lib/page-helpers";
import Link from "next/link";

interface MaintenancePageProps {
    params: Promise<{ locale: string }>;
    pageName: string;
}

/**
 * Reusable Maintenance Page Component
 * Used for pages awaiting content from client.
 * All strings sourced from messages/{locale}.json.
 */
export async function MaintenancePage({ params, pageName }: MaintenancePageProps) {
    const { locale } = await params;
    const validLocale = resolveLocale(locale);
    const translations = t(validLocale);
    const m = translations.maintenance as { subtitle: string; description: string; cta: string };

    return (
        <main className="min-h-[60vh] flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="max-w-lg mx-auto text-center">
                    <div className="w-20 h-20 mx-auto mb-8 bg-secondary-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-secondary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">
                        {pageName}
                    </h1>
                    <p className="text-lg font-medium text-secondary-600 mb-4">
                        {m.subtitle}
                    </p>
                    <p className="text-neutral-600 mb-8">
                        {m.description}
                    </p>

                    <Link
                        href={`/${validLocale}`}
                        className="btn btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {m.cta}
                    </Link>
                </div>
            </div>
        </main>
    );
}
