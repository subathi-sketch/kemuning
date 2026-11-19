import type { Metadata } from "next";
import { bungalows, bungalowCards } from "@/components/site/data";
import { NextPage } from "@/components/site/sub/NextPage";
import { PageHero } from "@/components/site/sub/PageHero";
import { TitleWithTwoImages } from "@/components/site/sub/TitleWithTwoImages";
import { TwoColumnsList } from "@/components/site/sub/TwoColumnsList";

export const metadata: Metadata = {
  title: "Bungalows",
  description:
    "Kemuning Sanur is made of stand-alone bungalows, each in its own walled garden, built by local craftsmen from thatch, stone and timber.",
};

export default function BungalowsPage() {
  const items = bungalowCards.map((card) => {
    const full = bungalows.find((b) => b.slug === card.slug);
    return {
      href: `/bungalow/${card.slug}`,
      image: card.image,
      title: full?.title ?? card.slug,
      description: card.description,
      category: full?.details.map((d) => d.label).join(" · ") ?? "Bungalow",
      cta: "Discover more",
    };
  });

  return (
    <>
      <PageHero title="Our Bungalows" image={`/site/stock/villa-2.webp`} subtitle="Six places to stay, each with its own garden, veranda and patch of sky." />
      <TitleWithTwoImages
        title="Kemuning Sanur is made of stand-alone bungalows, each in its own walled garden and built by local craftsmen."
        smallImage={`/site/stock/garden-1.webp`}
        smallText="Thatch, river stone and reclaimed teak, assembled the old way, so each bungalow feels handmade."
        largeImage={`/site/stock/garden-2.webp`}
        largeText="Paths wind between them under frangipani and palms, so every veranda keeps its privacy and its own patch of sky."
      />
      <TwoColumnsList items={items} />
      <NextPage title="Dining" href="/dining" image={`/site/stock/dinner-1.webp`} />
    </>
  );
}
