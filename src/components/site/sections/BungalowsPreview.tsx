import { CardCarousel, type CarouselItem } from "../CardCarousel";
import { bungalowCards, bungalows } from "../data";

/** All places to stay, as a dark carousel of cards. */
export function BungalowsPreview() {
  const items: CarouselItem[] = bungalowCards.map((card) => {
    const full = bungalows.find((b) => b.slug === card.slug);
    return {
      href: `/bungalow/${card.slug}`,
      image: card.image,
      title: full?.title ?? card.slug,
      text: card.description,
      meta: full?.details.map((d) => d.label),
    };
  });

  return (
    <CardCarousel
      eyebrow="Stay with us"
      title="A place of your own under the thatch."
      items={items}
      allHref="/bungalows"
      allLabel="All bungalows"
    />
  );
}
