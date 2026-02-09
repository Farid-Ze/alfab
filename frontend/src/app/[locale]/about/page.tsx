import { MaintenancePage } from "@/components/ui/MaintenancePage";
import { createMaintenanceMetadata, getPageMeta, resolveLocale } from "@/lib/page-helpers";

export const generateMetadata = createMaintenanceMetadata("about");

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const page = getPageMeta(resolveLocale(locale), "about");
    return <MaintenancePage params={params} pageName={page.title} />;
}
