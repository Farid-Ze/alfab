import { MaintenancePage } from "@/components/ui/MaintenancePage";
import { createMaintenanceMetadata, getPageMeta, resolveLocale } from "@/lib/page-helpers";

export const generateMetadata = createMaintenanceMetadata("privacy");

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const page = getPageMeta(resolveLocale(locale), "privacy");
    return <MaintenancePage params={params} pageName={page.title} />;
}
