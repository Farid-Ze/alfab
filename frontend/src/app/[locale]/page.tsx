import { MaintenancePage } from "@/components/ui/MaintenancePage";
import { createMaintenanceMetadata, getPageMeta, resolveLocale } from "@/lib/page-helpers";

export const generateMetadata = createMaintenanceMetadata("home");

/**
 * Locale Homepage — Maintenance Mode
 *
 * Homepage is temporarily in maintenance while content is being finalized.
 * Owner has provided copywriting (reference.md) but full content/assets are pending.
 */
export default async function LocaleHomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const page = getPageMeta(resolveLocale(locale), "home");
    return <MaintenancePage params={params} pageName={page.title} />;
}
