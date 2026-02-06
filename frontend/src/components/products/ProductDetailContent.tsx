"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

interface ProductDetailContentProps {
    product: Product;
}

/**
 * ProductDetailContent: Ineo-Sense inspired product detail layout
 */
export default function ProductDetailContent({ product }: ProductDetailContentProps) {
    const { locale } = useLocale();
    const tx = t(locale);
    const { brand, name, summary, benefits, howToUse, image } = product;

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <motion.div
                    className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-border/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {image?.url ? (
                        <Image
                            src={image.url}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-surface-mint">
                            <span className="type-display text-brand/20">{brand}</span>
                        </div>
                    )}
                </motion.div>

                {/* Content */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {/* Brand */}
                    <span className="inline-block px-4 py-1.5 bg-surface-mint text-brand text-sm font-semibold rounded-full">
                        {brand}
                    </span>

                    {/* Title */}
                    <h1 className="type-display text-brand font-bold">{name}</h1>

                    {/* Summary */}
                    <p className="type-body-lg text-muted">{summary}</p>

                    {/* CTA */}
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        {tx.productDetail?.consult?.title ?? "Konsultasi"}
                    </motion.a>
                </motion.div>
            </div>

            {/* How To Use Section */}
            {howToUse && (
                <motion.section
                    className="bg-white rounded-3xl p-8 lg:p-12 border border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="type-h2 text-brand font-bold mb-6">
                        {tx.productDetail?.sections?.howToUse ?? "How To Use"}
                    </h2>
                    <p className="type-body text-muted">{howToUse}</p>
                </motion.section>
            )}

            {/* Benefits Section */}
            {benefits && benefits.length > 0 && (
                <motion.section
                    className="bg-white rounded-3xl p-8 lg:p-12 border border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="type-h2 text-brand font-bold mb-6">
                        {tx.productDetail?.sections?.keyBenefits ?? "Benefits"}
                    </h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {benefits.map((benefit: string, idx: number) => (
                            <li
                                key={idx}
                                className="flex items-start gap-3 p-4 bg-surface-mint rounded-2xl"
                            >
                                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-secondary rounded-full" />
                                <span className="type-body text-brand">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </motion.section>
            )}
        </div>
    );
}
