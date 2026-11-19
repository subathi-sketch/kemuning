import Image from "next/image";
import { CalendarCheck, Check, Maximize2, Users } from "lucide-react";
import { CardCarousel, type CarouselItem } from "../CardCarousel";
import { GlowButton } from "../GlowButton";
import { bungalowCards, bungalows, type Bungalow } from "../data";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { BODY, EYEBROW, H2, H3, WRAP } from "../ui/styles";
import { GallerySlider } from "./GallerySlider";
import { PageHero } from "./PageHero";

/** Bungalow detail page. */
export function BungalowDetail({ bungalow }: { bungalow: Bungalow }) {
  const { showcase } = bungalow;
  const related: CarouselItem[] = bungalowCards
    .filter((c) => c.slug !== bungalow.slug)
    .map((c) => {
      const full = bungalows.find((b) => b.slug === c.slug);
      return { href: `/bungalow/${c.slug}`, image: c.image, title: full?.title ?? c.slug, text: c.description, meta: full?.details.map((d) => d.label) };
    });

  return (
    <article>
      <PageHero title={bungalow.title} image={bungalow.heroImage} />

      {/* summary + booking card */}
      <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
        <div className={`${WRAP} grid items-start gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20`}>
          <div>
            <Reveal>
              <p className={`${EYEBROW} mb-4`}>The bungalow</p>
              <h2 className={`${H2} mb-8 text-[color:var(--ts-ink)]`}>{bungalow.summary}</h2>
            </Reveal>
            <div className="space-y-5">
              {bungalow.description.map((p, i) => (
                <Reveal key={p} delay={0.08 * i}>
                  <p className={BODY}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal from="right" className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[28px] bg-[color:var(--ts-sea-deep)] p-8 text-[color:var(--ts-canvas)] shadow-2xl">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[color:var(--ts-accent)]/35 blur-[80px]" />
              <p className="relative mb-5 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-canvas)]/60">At a glance</p>
              <ul className="relative mb-6 space-y-3">
                {bungalow.details.map((d) => (
                  <li key={d.label} className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-full bg-white/10">
                      {/\bm²|sqm|m2/i.test(d.label) ? <Maximize2 size={19} strokeWidth={1.4} /> : <Users size={19} strokeWidth={1.4} />}
                    </span>
                    <span className="text-lg">{d.label}</span>
                  </li>
                ))}
              </ul>
              {bungalow.extraInfo && <p className="relative mb-7 border-t-[1px] border-white/15 pt-5 text-sm leading-relaxed text-[color:var(--ts-canvas)]/75">{bungalow.extraInfo}</p>}
              {bungalow.bookingUrl && (
                <div className="relative">
                  <GlowButton href={bungalow.bookingUrl} icon={CalendarCheck}>
                    {bungalow.bookingLabel ?? "Book now"}
                  </GlowButton>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* showcase mosaic */}
      <section className="bg-[color:var(--ts-oat)] py-20 md:py-28">
        <div className={WRAP}>
          {showcase.title && (
            <Reveal>
              <h2 className={`${H2} mx-auto mb-14 max-w-3xl text-center text-[color:var(--ts-ink)]`}>{showcase.title}</h2>
            </Reveal>
          )}
          <RevealGroup className="grid gap-5 md:grid-cols-12 md:gap-6" stagger={0.14}>
            <RevealItem className="md:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] shadow-xl">
                <Image src={showcase.topImage} alt="" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 100vw, 740px" />
              </div>
            </RevealItem>
            <RevealItem className="md:col-span-4 md:row-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] shadow-xl md:h-full md:aspect-auto">
                <Image src={showcase.leftImage} alt="" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 100vw, 360px" />
              </div>
            </RevealItem>
            <RevealItem className="md:col-span-8">
              <div className="flex flex-col overflow-hidden rounded-[28px] bg-[color:var(--ts-canvas)] shadow-xl sm:flex-row">
                <div className="relative aspect-[4/3] sm:w-1/2">
                  <Image src={showcase.bottomImage} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 370px" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-7">
                  <h3 className={`${H3} mb-3 italic`}>{showcase.subtitle}</h3>
                  <p className="text-sm italic leading-relaxed text-[color:var(--ts-muted)]">{showcase.text}</p>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* facilities */}
      <section className="bg-[color:var(--ts-sea-deep)] py-20 text-[color:var(--ts-canvas)] md:py-28">
        <div className={`${WRAP} space-y-16`}>
          {bungalow.facilities.map((group) => (
            <div key={group.title}>
              <Reveal>
                <h2 className={`${H2} mb-8`}>{group.title}</h2>
              </Reveal>
              <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
                {group.items.map((item) => (
                  <RevealItem key={item}>
                    <div className="flex items-center gap-3 rounded-2xl border-[1px] border-white/12 bg-white/[0.05] px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10">
                      <Check size={16} className="shrink-0 text-[color:var(--ts-accent)]" />
                      <span className="text-sm">{item}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </section>

      <GallerySlider images={bungalow.gallery} label={`${bungalow.title} gallery`} />
      <CardCarousel eyebrow="Keep exploring" title="Other bungalows" items={related} allHref="/bungalows" allLabel="All bungalows" />
    </article>
  );
}
