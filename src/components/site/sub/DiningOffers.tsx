import { CardCarousel, type CarouselItem } from "../CardCarousel";

export interface DiningOffer {
  image: string;
  title: string;
  paragraphs: string[];
  cta: string;
  href: string | null;
}

/** Dining offers as the site's dark card carousel. */
export function DiningOffers({ offers }: { offers: DiningOffer[] }) {
  const items: CarouselItem[] = offers.map((o) => ({
    href: o.href ?? "/dining",
    image: o.image,
    title: o.title,
    text: o.paragraphs.join(" ").replace(/<\/?i>/g, ""),
    meta: [o.cta],
  }));
  return <CardCarousel eyebrow="Dining offers" title="Tables worth planning a day around." items={items} />;
}
