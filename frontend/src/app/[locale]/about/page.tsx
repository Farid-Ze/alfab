import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "About PT. Alfa Beauty Cosmetica - Professional beauty distribution partner",
};

export default function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="About Us" />;
}
