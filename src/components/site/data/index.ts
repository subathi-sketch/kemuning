import bungalowsJson from "./bungalows.json";
import culturesJson from "./cultures.json";
import listsJson from "./lists.json";
import offersJson from "./offers.json";
import termsJson from "./terms.json";


export interface Bungalow {
  slug: string;
  title: string;
  heroImage: string;
  summary: string;
  details: { label: string }[];
  extraInfo: string;
  description: string[];
  showcase: {
    title: string;
    topImage: string;
    leftImage: string;
    bottomImage: string;
    subtitle: string;
    text: string;
  };
  facilities: { title: string; items: string[] }[];
  bookingUrl: string | null;
  bookingLabel: string | null;
  gallery: string[];
}

export interface Culture {
  slug: string;
  title: string;
  heroImage: string;
  block1: { image: string; heading: string; paragraphs: string[]; extra: string[] } | null;
  block2: { image: string; heading: string; paragraphs: string[] } | null;
  next: { title: string; image: string } | null;
}

export interface Offer {
  slug: string;
  title: string;
  heroImage: string;
  duration: string;
  priceLabel: string;
  price: string;
  note: string;
  heading: string;
  description: string[];
  smallImage: string | null;
  bigImage: string | null;
  inclusions: { title: string; items: string[] }[];
  bookingUrl: string | null;
  bookingLabel: string | null;
}

export interface ListEntry {
  href: string | null;
  image: string | null;
  title: string;
  description: string[];
  cta: string;
  category: string;
}

export const lists = listsJson as {
  cultures: ListEntry[];
  offers: ListEntry[];
  menuList: ListEntry[];
  diningOffers: {
    image: string | null;
    title: string;
    paragraphs: string[];
    cta: string;
    href: string | null;
  }[];
  diningIntro: { title: string; description: string };
};

export const bungalows = bungalowsJson as Bungalow[];
export const cultures = culturesJson as Culture[];
export const offers = offersJson as Offer[];
export const terms = termsJson as { title: string; sections: { heading: string; paragraphs: string[] }[] };

export const getBungalow = (slug: string) => bungalows.find((b) => b.slug === slug);
export const getCulture = (slug: string) => cultures.find((c) => c.slug === slug);
export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);

/** Bungalow listing cards (cover images differ from the detail hero images). */
export const bungalowCards = [
  {
    slug: "garden-bungalow",
    image: `/site/stock/villa-1.webp`,
    description: "Our classic thatched bungalow with a deep veranda and a courtyard garden of its own.",
  },
  {
    slug: "loft-bungalow",
    image: `/site/stock/villa-4.webp`,
    description: "Two levels under the thatch: a sitting room and terrace below, a sleeping loft above.",
  },
  {
    slug: "beach-bungalow",
    image: `/site/stock/villa-6.webp`,
    description: "Closest to the water, with a loft bed that catches the first light over the sea.",
  },
  {
    slug: "courtyard-suite",
    image: `/site/stock/villa-8.webp`,
    description: "A canopied bed, a long work table and a private plunge courtyard.",
  },
  {
    slug: "pool-villa",
    image: `/site/stock/villa-2.webp`,
    description: "A private pool and pavilion behind a high garden wall, with a glimpse of the sea.",
  },
  {
    slug: "family-house",
    image: `/site/stock/villa-3.webp`,
    description: "Two bedrooms around a shared courtyard, made for families who want space and quiet.",
  },
] as const;
