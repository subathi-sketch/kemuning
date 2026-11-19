import { SITE } from "@/lib/site";

/** Hotel structured data (schema.org), shown to search engines as the property's rich result. */
export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en",
      },
      {
        "@type": "Hotel",
        "@id": `${SITE.url}/#hotel`,
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
        image: [`${SITE.url}/opengraph-image`, `${SITE.url}/site/stock/villa-1.webp`],
        telephone: SITE.phone,
        email: SITE.email,
        foundingDate: String(SITE.founded),
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: "Sanur",
          addressRegion: "Bali",
          postalCode: "80228",
          addressCountry: "ID",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
          { "@type": "LocationFeatureSpecification", name: "Beach access", value: true },
          { "@type": "LocationFeatureSpecification", name: "Garden", value: true },
        ],
        sameAs: Object.values(SITE.social),
      },
    ],
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
