import type { Metadata } from "next";
import { Images, UtensilsCrossed } from "lucide-react";
import { lists } from "@/components/site/data";
import { GlowButton } from "@/components/site/GlowButton";
import { DiningOffers } from "@/components/site/sub/DiningOffers";
import { NextPage } from "@/components/site/sub/NextPage";
import { PageHero } from "@/components/site/sub/PageHero";
import { TextBand } from "@/components/site/sub/TextBand";
import { TwoColumnsList } from "@/components/site/sub/TwoColumnsList";

export const metadata: Metadata = {
  title: "Dining",
  description: lists.diningIntro.description,
};

export default function DiningPage() {
  const items = lists.menuList.map((m) => ({
    href: m.href ?? "/restaurant-menu",
    image: m.image!,
    title: m.title,
    description: m.description,
    cta: m.cta,
    category: "Menu",
  }));

  return (
    <>
      <PageHero title="Dining" image={`/site/stock/dinner-1.webp`} subtitle="Eat in the open-sided pavilion, or at a table in the sand beneath the trees." />
      <TextBand eyebrow="Kemuning Kitchen" title={lists.diningIntro.title} text={lists.diningIntro.description}>
        <GlowButton href="/restaurant-menu" icon={UtensilsCrossed}>
          View all menus
        </GlowButton>
        <GlowButton href="/gallery#dining" icon={Images}>
          Dining gallery
        </GlowButton>
      </TextBand>
      <TwoColumnsList items={items} />
      <DiningOffers offers={lists.diningOffers.map((o) => ({ ...o, image: o.image! }))} />
      <NextPage title="Cultures" href="/cultures" image={`/site/stock/ceremony-1.webp`} />
    </>
  );
}
