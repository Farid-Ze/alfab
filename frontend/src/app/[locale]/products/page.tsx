import { MaintenancePage } from "@/components/ui/MaintenancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Professional haircare products for salons and barbershops",
};

export default function ProductsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    return <MaintenancePage params={params} pageName="Products" />;
}
