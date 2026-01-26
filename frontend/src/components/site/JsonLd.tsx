/**
 * JSON-LD (Structured Data)
 * Helps search engines understand the organization.
 */
export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Alfa Beauty Cosmetica",
        url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alfabeauty.co.id",
        logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/logo.png`,
        sameAs: [
            "https://instagram.com/alfabeauty",
            // Add other social profiles here
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-812-3456-7890",
            contactType: "customer service",
            areaServed: "ID",
            availableLanguage: ["en", "id"],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
