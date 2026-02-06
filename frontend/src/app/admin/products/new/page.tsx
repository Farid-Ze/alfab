import { createProduct } from "@/lib/cms";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
    async function handleSubmit(data: Parameters<typeof createProduct>[0]) {
        "use server";
        await createProduct(data);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="text-muted hover:text-foreground transition-colors"
                >
                    ← Back
                </Link>
                <div>
                    <h1 className="type-admin-h2">New Product</h1>
                    <p className="text-muted text-sm mt-1">Add a new product to catalog</p>
                </div>
            </div>

            {/* Form */}
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}
