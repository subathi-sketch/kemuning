/**
 * Single source of truth for the hotel's identity and contact details.
 *
 * Kemuning Sanur is a fictional boutique hotel created for this project. Every name, story,
 * address, number and link below is a placeholder: replace them with the real property's details
 * (and licensed photography) before publishing.
 */
export const SITE = {
  /** Public origin, used for canonical links, the sitemap and social previews. Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kemuning-sanur.example").replace(/\/$/, ""),
  name: "Kemuning Sanur",
  shortName: "Kemuning",
  tagline: "Beachside bungalows in Sanur, Bali",
  description:
    "Kemuning Sanur is a small, family-run collection of garden bungalows a short walk from Sanur Beach, Bali: unhurried stays, a beachfront kitchen and quiet courtyards.",
  founded: 1996,
  owners: "the Arsana family",
  address: {
    street: "Jl. Pantai Kemuning No. 12",
    area: "Sanur, Denpasar 80228",
    region: "Bali, Indonesia",
    oneLine: "Jl. Pantai Kemuning No. 12, Sanur, Denpasar 80228, Bali, Indonesia",
  },
  // Placeholder contact details (reserved example domain, non-working numbers).
  phone: "+62 361 555 0100",
  phoneLink: "tel:+623615550100",
  email: "hello@kemuning-sanur.example",
  reservationsEmail: "reservations@kemuning-sanur.example",
  whatsapp: "https://wa.me/6280000000000",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/",
    tripadvisor: "https://www.tripadvisor.com/",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Sanur+Beach+Bali",
} as const;

/** Booking and enquiry links used by the call-to-action buttons (placeholders). */
export const BOOKING = {
  room: `mailto:${SITE.reservationsEmail}?subject=Bungalow%20enquiry`,
  table: `mailto:${SITE.reservationsEmail}?subject=Table%20reservation`,
  whatsapp: SITE.whatsapp,
} as const;
