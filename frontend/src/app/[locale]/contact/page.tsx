import { MaintenancePage } from "@/components/ui/MaintenancePage";
import { createMaintenanceMetadata, getPageMeta, resolveLocale } from "@/lib/page-helpers";

export const generateMetadata = createMaintenanceMetadata("contact");

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const page = getPageMeta(resolveLocale(locale), "contact");
    return <MaintenancePage params={params} pageName={page.title} />;
}
