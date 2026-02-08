import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Partnership",
    description: "Become a distribution partner with Alfa Beauty Cosmetica",
};

export default function PartnershipPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="Partnership" />;
}
