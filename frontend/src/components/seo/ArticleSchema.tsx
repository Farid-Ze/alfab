import type { EducationArticle } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { env } from "@/lib/env";

type Props = {
    article: EducationArticle;
    locale: Locale;
};

/**
 * Article JSON-LD structured data.
 * Provides rich snippets for search engines (Headline, Date, Author).
 */
export default function ArticleSchema({ article, locale }: Props) {
    const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const articleUrl = `${siteUrl}/${locale}/education/articles/${article.slug}`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: [
            // Fallback placeholder
            `${siteUrl.replace(/\/$/, "")}/images/education/training-placeholder.jpg`
        ],
        datePublished: article.date,
        dateModified: article.date,
        author: {
            "@type": "Organization",
            name: "Alfa Beauty Education Team",
            url: siteUrl
        },
        publisher: {
            "@type": "Organization",
            name: "PT Alfa Beauty Cosmetica",
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl.replace(/\/$/, "")}/images/logo.svg`
            }
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
