"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

/**
 * PartnershipPageClient: Ineo-Sense inspired partnership page
 */
export default function PartnershipPageClient() {
    const { locale } = useLocale();
    const tx = t(locale);
    const hero = tx.partnership?.hero;

    return (
        <div className="space-y-16">
            {/* Hero */}
            <motion.header
                className="text-center max-w-3xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="type-ui-sm font-semibold text-secondary uppercase tracking-wide">
                    {hero?.kicker ?? "Partners"}
                </p>
                <h1 className="type-display text-brand font-bold">
                    {hero?.title ?? "Let's join forces!"}
                </h1>
                <p className="type-body-lg text-muted max-w-xl mx-auto">
                    {hero?.body ?? "Integrators, distributors, technological or commercial partners join us and let's build connected and innovative solutions together."}
                </p>
                <motion.a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    {tx.ui?.learnMore ?? "Learn more"}
                </motion.a>
            </motion.header>

            {/* For Principals */}
            <motion.section
                className="bg-white rounded-3xl p-8 lg:p-12 border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="type-h2 text-brand font-bold mb-6">
                    {locale === "id" ? "Untuk Prinsipal Internasional" : "For International Principals"}
                </h2>
                <ul className="space-y-4">
                    {[
                        locale === "id" ? "Jaringan distribusi nasional yang kuat" : "Strong nationwide distribution network",
                        locale === "id" ? "Pemahaman mendalam terhadap ekosistem salon dan barber Indonesia" : "Deep understanding of Indonesia's salon and barber ecosystem",
                        locale === "id" ? "Kapabilitas terbukti dalam pengembangan merek dan edukasi pasar" : "Proven capability in brand building and market education"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-secondary rounded-full" />
                            <span className="type-body text-muted">{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.section>

            {/* For Salons */}
            <motion.section
                className="bg-white rounded-3xl p-8 lg:p-12 border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="type-h2 text-brand font-bold mb-6">
                    {locale === "id" ? "Untuk Salon dan Barber Profesional" : "For Professional Salons & Barbers"}
                </h2>
                <ul className="space-y-4">
                    {[
                        locale === "id" ? "Akses ke merek perawatan rambut global terpercaya" : "Access to trusted global haircare brands",
                        locale === "id" ? "Kualitas produk yang konsisten dan dukungan profesional" : "Consistent product quality and professional support",
                        locale === "id" ? "Kemitraan jangka panjang yang dibangun atas dasar kepercayaan dan kompetensi" : "Long-term partnership based on trust and competence"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-2 h-2 mt-2 bg-secondary rounded-full" />
                            <span className="type-body text-muted">{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.section>
        </div>
    );
}
