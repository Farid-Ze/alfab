import { MaintenancePage } from "@/components/ui/MaintenancePage";
import { createMaintenanceMetadata, getPageMeta, resolveLocale } from "@/lib/page-helpers";

export const generateMetadata = createMaintenanceMetadata("education");

export default async function EducationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const page = getPageMeta(resolveLocale(locale), "education");
    return <MaintenancePage params={params} pageName={page.title} />;
}
