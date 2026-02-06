"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AppLink from "@/components/ui/AppLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

interface ProductCardProps {
    product: Product;
    href: string;
}

/**
 * ProductCard: Ineo-Sense inspired product card
 * Rounded corners, white background, clean typography
 */
export default function ProductCard({ product, href }: ProductCardProps) {
    const { locale } = useLocale();
    const tx = t(locale);
    const { brand, name, summary, image } = product;

    return (
        <motion.div
            className="group bg-white rounded-3xl overflow-hidden border border-border/30 hover:shadow-lg transition-shadow"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <AppLink href={href} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] bg-surface-mint overflow-hidden">
                    {image?.url ? (
                        <Image
                            src={image.url}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="type-h3 text-brand/20">{brand}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                    {/* Brand Badge */}
                    <span className="inline-block px-3 py-1 bg-surface-mint text-brand text-xs font-semibold rounded-full">
                        {brand}
                    </span>

                    {/* Title */}
                    <h3 className="type-h4 text-brand font-bold line-clamp-2 group-hover:text-secondary transition-colors">
                        {name}
                    </h3>

                    {/* Summary */}
                    <p className="type-body-sm text-muted line-clamp-2">
                        {summary}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-secondary font-medium pt-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="type-ui-sm">{tx.ui?.learnMore ?? "Learn more"}</span>
                    </div>
                </div>
            </AppLink>
        </motion.div>
    );
}
