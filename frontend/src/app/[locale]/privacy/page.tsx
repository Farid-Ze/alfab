import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for Alfa Beauty Cosmetica",
};

export default function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="Privacy Policy" />;
}
