import type { Product } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { env } from "@/lib/env";

type Props = {
    product: Product;
    locale: Locale;
};

/**
 * Product JSON-LD structured data.
 * Provides rich snippets for search engines (Name, Description, Brand, Image).
 */
export default function ProductSchema({ product, locale }: Props) {
    const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    const productUrl = `${siteUrl}/${locale}/products/${product.slug}`;
    const imageUrl = product.image?.url
        ? (product.image.url.startsWith("http")
            ? product.image.url
            : `${siteUrl.replace(/\/$/, "")}${product.image.url.startsWith("/") ? "" : "/"}${product.image.url}`)
        : undefined;
    const hasRealImage = !!imageUrl && !imageUrl.includes("placeholder");

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        ...(hasRealImage ? { image: [imageUrl] } : {}),
        description: product.summary,
        brand: {
            "@type": "Brand",
            name: product.brand,
        },
        url: productUrl,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
