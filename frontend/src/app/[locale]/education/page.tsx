import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Education",
    description: "Professional training and education programs for salon professionals",
};

export default function EducationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="Education" />;
}
