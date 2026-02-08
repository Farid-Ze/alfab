import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of service for Alfa Beauty Cosmetica",
};

export default function TermsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="Terms of Service" />;
}
