function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

export default function StructuredData() {
  const siteUrl = getSiteUrl();

  // Keep schema minimal and factual (no pricing).
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alfa Beauty Cosmetica",
    url: siteUrl,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Alfa Beauty Cosmetica",
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
