import { siteConfig } from "@/lib/config";

/**
 * JSON-LD Structured Data Components
 * 
 * Provides structured data for:
 * - Organization (company info)
 * - WebSite (site metadata)
 * - LocalBusiness (for B2B discovery)
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
        description: "Professional beauty product distributor for salons and barbershops",
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
