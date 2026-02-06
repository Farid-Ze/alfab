import { requireAuth } from "@/actions/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/app/globals.css";

export const metadata = {
    title: "Admin | Alfa Beauty CMS",
    robots: "noindex, nofollow",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Protect all admin routes
    await requireAuth();

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <main className="flex-1 ml-64 pad-content-lg">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
