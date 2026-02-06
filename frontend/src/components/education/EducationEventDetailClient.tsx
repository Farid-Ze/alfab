"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import { getEventBySlug } from "@/lib/education";

interface EducationEventDetailClientProps {
    slug: string;
}

/**
 * EducationEventDetailClient: Ineo-Sense inspired event detail
 */
export default function EducationEventDetailClient({ slug }: EducationEventDetailClientProps) {
    const { locale } = useLocale();
    const tx = t(locale);

    const event = getEventBySlug(locale, slug) ?? getEventBySlug(locale === "en" ? "id" : "en", slug);

    if (!event) {
        return null;
    }

    const { title, excerpt, body, brand, city, type, date, cta_label } = event;

    const formattedDate = date
        ? new Date(date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    return (
        <article className="space-y-12">
            {/* Hero */}
            <motion.header
                className="text-center max-w-3xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    {type && (
                        <span className="px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full capitalize">
                            {type}
                        </span>
                    )}
                    {brand && (
                        <span className="px-3 py-1 bg-surface-mint text-brand text-xs font-semibold rounded-full">
                            {brand}
                        </span>
                    )}
                </div>

                <h1 className="type-display text-brand font-bold">{title}</h1>

                <p className="type-body-lg text-muted">{excerpt}</p>

                <div className="flex items-center justify-center gap-6 text-muted type-ui-sm">
                    {formattedDate && <span>📅 {formattedDate}</span>}
                    {city && <span>📍 {city}</span>}
                </div>
            </motion.header>

            {/* Content */}
            <motion.div
                className="bg-white rounded-3xl p-8 lg:p-12 border border-border/30 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="prose prose-lg max-w-none">
                    {body?.map((para, idx) => (
                        <p key={idx} className="type-body text-muted mb-6 leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>

                {/* CTA */}
                {cta_label && (
                    <motion.a
                        href="#register"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-semibold mt-8 hover:bg-secondary/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        {cta_label}
                    </motion.a>
                )}
            </motion.div>
        </article>
    );
}
