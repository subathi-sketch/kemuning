import Image from "next/image";
import { CalendarCheck, Check, Clock } from "lucide-react";
import { CardCarousel, type CarouselItem } from "../CardCarousel";
import { GlowButton } from "../GlowButton";
import type { Offer } from "../data";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { BODY, EYEBROW, H2, WRAP } from "../ui/styles";
import { SITE } from "@/lib/site";
import { PageHero } from "./PageHero";

/** All offers in listing order; the last two have no detail page and open WhatsApp. */
const OFFER_CARDS: (CarouselItem & { slug: string })[] = [
  { slug: "beach-wedding", title: "Beach Wedding & Honeymoon", image: `/site/stock/wedding-1.webp`, href: "/offer/beach-wedding", text: "A small ceremony on the sand, a candlelit dinner and two nights to enjoy it." },
  { slug: "slow-stay", title: "Slow Stay", image: `/site/stock/villa-4.webp`, href: "/offer/slow-stay", text: "Stay longer, pay less, and let the days loosen." },
  { slug: "stay-and-dine", title: "Stay & Dine", image: `/site/stock/food-3.webp`, href: "/offer/stay-and-dine", text: "A room and dinner by the sea, bundled together." },
  { slug: "cooking-class", title: "Cooking Class", image: `/site/stock/cooking-1.webp`, href: SITE.whatsapp, text: "A morning at the market and a lesson in the kitchen." },
  { slug: "craft-corner", title: "Craft Corner", image: `/site/stock/craft-2.webp`, href: SITE.whatsapp, text: "Try weaving, carving or painting with local makers." },
];

/** Offer / package detail page. */
export function OfferDetail({ offer }: { offer: Offer }) {
  const related = OFFER_CARDS.filter((c) => c.slug !== offer.slug);

  return (
    <article>
      <PageHero title={offer.title} image={offer.heroImage} />

      <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
        <div className={`${WRAP} grid items-start gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}>
          <Reveal from="left" className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[28px] bg-[color:var(--ts-sea-deep)] p-8 text-[color:var(--ts-canvas)] shadow-2xl">
              <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 size-60 rounded-full bg-[color:var(--ts-accent)]/35 blur-[80px]" />
              <p className="relative mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-canvas)]/60">
                <Clock size={14} /> Duration
              </p>
              <p className="relative font-[family-name:var(--font-display)] text-3xl">{offer.duration}</p>
              {(offer.priceLabel || offer.price) && (
                <div className="relative mt-6 border-t-[1px] border-white/15 pt-6">
                  {offer.priceLabel && <p className="mb-1 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-canvas)]/60">{offer.priceLabel}</p>}
                  {offer.price && <p className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--ts-accent)]">{offer.price}</p>}
                </div>
              )}
              {offer.note && <p className="relative mt-4 text-xs leading-relaxed text-[color:var(--ts-canvas)]/65">{offer.note}</p>}
              {offer.bookingUrl && (
                <div className="relative mt-7">
                  <GlowButton href={offer.bookingUrl} icon={CalendarCheck}>
                    {offer.bookingLabel ?? "Book now"}
                  </GlowButton>
                </div>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className={`${EYEBROW} mb-4`}>The package</p>
              <h2 className={`${H2} mb-6 text-[color:var(--ts-ink)]`}>{offer.heading}</h2>
            </Reveal>
            {offer.description.map((p, i) => (
              <Reveal key={p} delay={0.08 * (i + 1)}>
                <p className={`${BODY} mb-4`}>{p}</p>
              </Reveal>
            ))}
            {(offer.smallImage || offer.bigImage) && (
              <RevealGroup className="mt-10 flex items-end gap-5" stagger={0.15}>
                {offer.smallImage && (
                  <RevealItem className="w-1/3">
                    <div className="relative aspect-square overflow-hidden rounded-[24px] shadow-xl">
                      <Image src={offer.smallImage} alt={offer.duration} fill className="object-cover" sizes="(max-width: 768px) 30vw, 200px" />
                    </div>
                  </RevealItem>
                )}
                {offer.bigImage && (
                  <RevealItem className="flex-1">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] shadow-xl">
                      <Image src={offer.bigImage} alt={offer.duration} fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 60vw, 420px" />
                    </div>
                  </RevealItem>
                )}
              </RevealGroup>
            )}
          </div>
        </div>
      </section>

      {offer.inclusions.length > 0 && (
        <section className="bg-[color:var(--ts-oat)] py-20 md:py-28">
          <div className={`${WRAP} space-y-14`}>
            {offer.inclusions.map((group) => (
              <div key={group.title}>
                <Reveal>
                  <h2 className={`${H2} mb-8 text-[color:var(--ts-ink)]`}>{group.title}</h2>
                </Reveal>
                <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
                  {group.items.map((item) => (
                    <RevealItem key={item}>
                      <div className="flex items-start gap-4 rounded-2xl border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-canvas)] p-5 transition-shadow duration-300 hover:shadow-lg">
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)]">
                          <Check size={14} />
                        </span>
                        <p className="text-sm leading-relaxed text-[color:var(--ts-ink)]/85">{item}</p>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </section>
      )}

      <CardCarousel eyebrow="Keep exploring" title="Other offers" items={related} allHref="/packages-and-activities" allLabel="All packages" />
    </article>
  );
}
