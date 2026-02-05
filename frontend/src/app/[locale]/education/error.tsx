"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ui/ErrorState";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import Page from "@/components/layout/Page";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const { locale } = useLocale();
    const tx = t(locale);
    const base = `/${locale}`;

    return (
        <Page className="flex items-center justify-center">
            <ErrorState
                title={locale === "id" ? "Gagal memuat edukasi" : "Unable to load education hub"}
                description={
                    locale === "id"
                        ? "Kami tidak dapat memuat konten saat ini. Silakan coba muat ulang halaman."
                        : "We couldn't load the requested content at this time. Please try refreshing the page."
                }
                retry={reset}
                homeHref={base}
                homeLabel={tx.system.notFound.backHome}
            />
        </Page>
    );
}
