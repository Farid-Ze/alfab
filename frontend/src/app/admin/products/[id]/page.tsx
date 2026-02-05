import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, updateProduct, deleteProduct } from "@/lib/cms";
import ProductForm from "@/components/admin/ProductForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
    const { id } = await params;

    let product;
    try {
        product = await getProductById(id);
    } catch {
        notFound();
    }

    async function handleSubmit(data: Parameters<typeof updateProduct>[1]) {
        "use server";
        await updateProduct(id, data);
    }

    async function handleDelete() {
        "use server";
        await deleteProduct(id);
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
                    <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
                    <p className="text-muted text-sm mt-1">{product.name}</p>
                </div>
            </div>

            {/* Form */}
            <ProductForm
                initialData={product}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </div>
    );
}
