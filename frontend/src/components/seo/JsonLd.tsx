import { siteConfig } from "@/lib/config";

/**
 * JSON-LD Structured Data Components
 * 
 * Provides structured data for:
 * - Organization (company info)
 * - WebSite (site metadata)
 * - LocalBusiness (for B2B discovery)
 * - Product (product detail pages)
 * - BreadcrumbList (navigation breadcrumbs)
 * 
 * @see https://schema.org
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

interface JsonLdProps {
    type: "organization" | "website" | "localBusiness" | "product" | "breadcrumb";
    data?: Record<string, unknown>;
}

/**
 * Organization Schema
 */
function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.company.legalName,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/images/logo.png`,
            width: 200,
            height: 60,
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.whatsapp,
            contactType: "sales",
            availableLanguage: ["Indonesian", "English"],
        },
        sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
            siteConfig.social.linkedin,
        ],
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.company.address.street,
            addressLocality: siteConfig.company.address.city,
            addressRegion: siteConfig.company.address.province,
            postalCode: siteConfig.company.address.postalCode,
            addressCountry: siteConfig.company.address.country,
        },
    };
}

/**
 * WebSite Schema
 */
function getWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: ["en", "id"],
    };
}

/**
 * LocalBusiness Schema (for B2B)
 */
function getLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.company.legalName,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.whatsapp,
        email: siteConfig.contact.email,
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.company.address.street,
            addressLocality: siteConfig.company.address.city,
            addressRegion: siteConfig.company.address.province,
            postalCode: siteConfig.company.address.postalCode,
            addressCountry: siteConfig.company.address.country,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "-6.2088",
            longitude: "106.8456",
        },
        areaServed: {
            "@type": "Country",
            name: "Indonesia",
        },
        serviceType: [
            "Beauty Product Distribution",
            "Professional Hair Care Products",
            "Salon Equipment Supply",
            "Beauty Education & Training",
        ],
    };
}

/**
 * Product Schema (for Product Detail pages)
 *
 * Expects `data` to supply product-specific fields:
 * - name, description, image, brand, category, sku
 * - offers (optional) — Paket A has no public pricing
 *
 * Usage:
 * ```tsx
 * <JsonLd type="product" data={{
 *   name: "Alfaparf Semi di Lino",
 *   description: "Professional smoothing treatment",
 *   image: "https://…/product.jpg",
 *   brand: "Alfaparf Milano Professional",
 *   category: "Hair Care",
 *   sku: "AMP-SDL-001",
 * }} />
 * ```
 */
function getProductSchema(data: Record<string, unknown> = {}) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.name ?? "",
        description: data.description ?? "",
        image: data.image ?? `${siteConfig.url}/images/logo.png`,
        brand: {
            "@type": "Brand",
            name: data.brand ?? siteConfig.name,
        },
        category: data.category ?? "Professional Hair Care",
        sku: data.sku ?? undefined,
        manufacturer: {
            "@id": `${siteConfig.url}/#organization`,
        },
        // No public pricing per paket-a.md — omit offers
    };
}

/**
 * BreadcrumbList Schema (for SEO navigation trail)
 *
 * Expects `data.items` as an array of { name, url } objects.
 *
 * Usage:
 * ```tsx
 * <JsonLd type="breadcrumb" data={{
 *   items: [
 *     { name: "Home", url: "/id" },
 *     { name: "Produk", url: "/id/products" },
 *     { name: "Alfaparf", url: "/id/products/alfaparf" },
 *   ],
 * }} />
 * ```
 */
interface BreadcrumbItem {
    name: string;
    url: string;
}

function getBreadcrumbSchema(data: Record<string, unknown> = {}) {
    const items = (data.items as BreadcrumbItem[] | undefined) ?? [];
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
        })),
    };
}

/**
 * JSON-LD Component
 */
export function JsonLd({ type, data }: JsonLdProps) {
    let schema: Record<string, unknown>;

    switch (type) {
        case "organization":
            schema = getOrganizationSchema();
            break;
        case "website":
            schema = getWebSiteSchema();
            break;
        case "localBusiness":
            schema = getLocalBusinessSchema();
            break;
        case "product":
            schema = getProductSchema(data);
            break;
        case "breadcrumb":
            schema = getBreadcrumbSchema(data);
            break;
        default:
            schema = data || {};
    }

    // Merge with custom data if provided
    if (data) {
        schema = { ...schema, ...data };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
    );
}

/**
 * Combined JSON-LD for homepage
 */
export function HomePageJsonLd() {
    return (
        <>
            <JsonLd type="organization" />
            <JsonLd type="website" />
            <JsonLd type="localBusiness" />
        </>
    );
}

export default JsonLd;
