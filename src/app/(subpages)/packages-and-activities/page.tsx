import type { Metadata } from "next";
import { lists } from "@/components/site/data";
import { NextPage } from "@/components/site/sub/NextPage";
import { PageHero } from "@/components/site/sub/PageHero";
import { TitleWithTwoImages } from "@/components/site/sub/TitleWithTwoImages";
import { TwoColumnsList } from "@/components/site/sub/TwoColumnsList";

export const metadata: Metadata = {
  title: "Packages & Activities",
  description: "Stay packages, a beach wedding, cooking classes and a craft corner at Kemuning Sanur.",
};


/** The first three offers have detail pages; the last two open WhatsApp. */
const OFFER_ROUTES: Record<string, string> = {
  "Beach Wedding & Honeymoon": "/offer/beach-wedding",
  "Slow Stay": "/offer/slow-stay",
  "Stay & Dine": "/offer/stay-and-dine",
};

export default function PackagesPage() {
  const items = lists.offers.map((o) => {
    const local = OFFER_ROUTES[o.title];
    return {
      href: local ?? o.href ?? "/packages-and-activities",
      external: !local,
      image: o.image!,
      title: o.title,
      description: o.description,
      category: o.category,
      cta: o.cta,
    };
  });

  return (
    <>
      <PageHero title="Packages & Activities" image={`/site/stock/garden-3.webp`} subtitle="Stay packages, a wedding on the sand, and a day in the kitchen." />
      <TitleWithTwoImages
        title="A stay at Kemuning can be as quiet or as full as you like."
        smallImage={`/site/stock/garden-4.webp`}
        smallText=""
        largeImage={`/site/stock/garden-5.webp`}
        largeText="These packages bundle what guests ask for most: a slow few days, a special dinner, a wedding on the sand, or a day in the kitchen."
      />
      <TwoColumnsList items={items} />
      <NextPage title="Gallery" href="/gallery" image={`/site/stock/ceremony-4.webp`} />
    </>
  );
}
