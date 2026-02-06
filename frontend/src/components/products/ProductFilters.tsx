"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { listProducts } from "@/lib/products";
import { useLocale } from "@/components/i18n/LocaleProvider";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

/**
 * ProductFilters: Ineo-Sense inspired filter + grid component
 * Self-contained: fetches products and manages filters internally
 */
export default function ProductFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { locale } = useLocale();

    // Get all products
    const allProducts = listProducts(locale);

    // Extract unique brands and categories
    const brands = useMemo(() => {
        return [...new Set(allProducts.map((p: Product) => p.brand))].sort();
    }, [allProducts]);

    const categories = useMemo(() => {
        return [...new Set(allProducts.flatMap((p: Product) => p.categories ?? []))].sort();
    }, [allProducts]);

    // Get active filters from URL
    const activeBrands = searchParams.getAll("brand");
    const activeCategories = searchParams.getAll("category");

    // Filter products
    const filteredProducts = useMemo(() => {
        return allProducts.filter((product: Product) => {
            const matchesBrand = activeBrands.length === 0 || activeBrands.includes(product.brand);
            const matchesCategory = activeCategories.length === 0 ||
                (product.categories ?? []).some((c: string) => activeCategories.includes(c));
            return matchesBrand && matchesCategory;
        });
    }, [allProducts, activeBrands, activeCategories]);

    const updateFilters = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            const current = params.getAll(key);

            if (current.includes(value)) {
                params.delete(key);
                current.filter((v) => v !== value).forEach((v) => params.append(key, v));
            } else {
                params.append(key, value);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams]
    );

    const clearFilters = useCallback(() => {
        router.push(pathname, { scroll: false });
    }, [router, pathname]);

    const hasActiveFilters = activeBrands.length > 0 || activeCategories.length > 0;

    return (
        <div className="space-y-8">
            {/* Filter Bar */}
            <div className="bg-white rounded-3xl p-6 border border-border/30 space-y-6">
                {/* Brand Filters */}
                {brands.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="type-ui-sm font-semibold text-brand">Brands</h4>
                        <div className="flex flex-wrap gap-2">
                            {brands.map((brand) => (
                                <motion.button
                                    key={brand}
                                    type="button"
                                    onClick={() => updateFilters("brand", brand)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeBrands.includes(brand)
                                            ? "bg-secondary text-white"
                                            : "bg-surface-mint text-brand hover:bg-secondary/10"
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {activeBrands.includes(brand) && (
                                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                    {brand}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category Filters */}
                {categories.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="type-ui-sm font-semibold text-brand">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    type="button"
                                    onClick={() => updateFilters("category", category)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${activeCategories.includes(category)
                                            ? "bg-secondary text-white"
                                            : "bg-surface-mint text-brand hover:bg-secondary/10"
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {activeCategories.includes(category) && (
                                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <motion.button
                        type="button"
                        onClick={clearFilters}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted hover:text-brand transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>×</span>
                        Clear all filters
                    </motion.button>
                )}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.slug}
                        product={product}
                        href={`/${locale}/products/${product.slug}`}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="type-body text-muted">No products match your filters.</p>
                </div>
            )}
        </div>
    );
}
