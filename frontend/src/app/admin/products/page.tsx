import Link from "next/link";
import { getProducts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    let products: Awaited<ReturnType<typeof getProducts>> = [];

    try {
        products = await getProducts();
    } catch {
        // Database not yet configured
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Products</h1>
                    <p className="text-muted text-sm mt-1">
                        Manage product catalog
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                    + Add Product
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-muted">Belum ada produk</p>
                        <Link
                            href="/admin/products/new"
                            className="inline-block mt-4 text-accent hover:underline"
                        >
                            Tambah produk pertama
                        </Link>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-surface-elevated border-b border-border">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted">
                                    Name
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted">
                                    Brand
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted">
                                    Categories
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted">
                                    Audience
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-muted">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-surface-elevated transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center text-muted">
                                                    📦
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-muted">{product.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted">{product.brand}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.categories.map((cat) => (
                                                <span
                                                    key={cat}
                                                    className="px-2 py-0.5 bg-surface-elevated text-muted text-xs rounded-full"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.audience.map((aud) => (
                                                <span
                                                    key={aud}
                                                    className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full"
                                                >
                                                    {aud}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="text-accent hover:underline text-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
