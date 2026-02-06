"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/education";

interface EducationArticleDetailClientProps {
    slug: string;
}

/**
 * EducationArticleDetailClient: Ineo-Sense inspired article detail
 */
export default function EducationArticleDetailClient({ slug }: EducationArticleDetailClientProps) {
    const { locale } = useLocale();
    const tx = t(locale);

    const article = getArticleBySlug(locale, slug) ?? getArticleBySlug(locale === "en" ? "id" : "en", slug);

    if (!article) {
        return null;
    }

    const { title, excerpt, body, date } = article;

    const formattedDate = new Date(date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="space-y-12">
            {/* Hero */}
            <motion.header
                className="text-center max-w-3xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="type-ui-sm font-semibold text-secondary uppercase tracking-wide">
                    {tx.education?.articles?.title ?? "Article"}
                </p>
                <h1 className="type-display text-brand font-bold">{title}</h1>
                <p className="type-body-lg text-muted">{excerpt}</p>
                <p className="type-ui-sm text-muted">{formattedDate}</p>
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
            </motion.div>
        </article>
    );
}
