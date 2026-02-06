"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import { buildWhatsAppHref } from "@/lib/whatsapp";

interface ProductCTAProps {
    productName?: string;
    className?: string;
}

/**
 * ProductCTA: Ineo-Sense inspired call-to-action section
 */
export default function ProductCTA({ productName, className = "" }: ProductCTAProps) {
    const { locale } = useLocale();
    const tx = t(locale);
    const consult = tx.productDetail?.consult;

    const whatsappMessage = productName
        ? `Halo, saya tertarik dengan produk ${productName}. Bisa info lebih lanjut?`
        : consult?.prefill ?? "Halo, saya tertarik dengan produk Anda.";

    return (
        <motion.section
            id="contact"
            className={`bg-surface-mint rounded-3xl p-8 lg:p-12 text-center ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="type-display text-brand font-bold">
                    {consult?.title ?? "Let's connect!"}
                </h2>

                <p className="type-body-lg text-muted">
                    {consult?.body ?? "Hubungi kami untuk informasi lebih lanjut tentang produk dan kemitraan."}
                </p>

                <motion.a
                    href={buildWhatsAppHref({ message: whatsappMessage, number: "6281234567890" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-full font-semibold text-lg hover:bg-secondary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="w-2 h-2 bg-white rounded-full" />
                    {tx.ui?.contactViaWhatsapp ?? "Hubungi via WhatsApp"}
                </motion.a>
            </div>
        </motion.section>
    );
}
