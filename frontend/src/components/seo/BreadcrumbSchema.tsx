import { env } from "@/lib/env";

type BreadcrumbItem = {
    name: string;
    url: string;
};

type Props = {
    items: BreadcrumbItem[];
};

/**
 * Breadcrumb JSON-LD structured data.
 * Paket A SEO-04: "Organization + Breadcrumb; Product bila feasible"
 */
export default function BreadcrumbSchema({ items }: Props) {
    const baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        />
    );
}
