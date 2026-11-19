import type { Metadata } from "next";
import { lists } from "@/components/site/data";
import { NextPage } from "@/components/site/sub/NextPage";
import { PageHero } from "@/components/site/sub/PageHero";
import { TitleWithTwoImages } from "@/components/site/sub/TitleWithTwoImages";
import { TwoColumnsList } from "@/components/site/sub/TwoColumnsList";

export const metadata: Metadata = {
  title: "Cultures",
  description: "A guide to the Balinese ceremonies and customs you may encounter during a stay in Sanur.",
};


export default function CulturesPage() {
  const items = lists.cultures.map((c) => ({
    href: c.href ?? "/cultures",
    image: c.image!,
    title: c.title,
    description: c.description,
    category: c.category,
    cta: c.cta,
  }));

  return (
    <>
      <PageHero title="Cultures" image={`/site/stock/ceremony-1.webp`} subtitle="A guide to the ceremonies and customs you may meet during a stay in Sanur." />
      <TitleWithTwoImages
        title="Bali's calendar is crowded with ceremonies, and most of them welcome respectful visitors."
        smallImage={`/site/stock/ceremony-2.webp`}
        smallText="Some happen on our doorstep in Sanur; others are a day trip inland. Ask at reception what is on during your stay."
        largeImage={`/site/stock/ceremony-3.webp`}
        largeText="Dates follow two calendars, the 210-day pawukon and the lunar Saka year, which is why holidays move from year to year."
      />
      <TwoColumnsList items={items} />
      <NextPage title="Gallery" href="/gallery" image={`/site/stock/ceremony-4.webp`} />
    </>
  );
}
