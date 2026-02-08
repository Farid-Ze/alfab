import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact Alfa Beauty Cosmetica for business inquiries",
};

export default function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="Contact" />;
}
