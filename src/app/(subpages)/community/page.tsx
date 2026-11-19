import type { Metadata } from "next";
import Image from "next/image";
import { HandHeart } from "lucide-react";
import { CardCarousel, type CarouselItem } from "@/components/site/CardCarousel";
import { GlowButton } from "@/components/site/GlowButton";
import { NextPage } from "@/components/site/sub/NextPage";
import { PageHero } from "@/components/site/sub/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/ui/Reveal";
import { BODY, EYEBROW, H2, WRAP } from "@/components/site/ui/styles";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Community",
  description: `How ${SITE.name} works with its Sanur neighbours through the Kemuning Garden Fund: dance classes, craft apprenticeships and beach clean-ups.`,
};

const AIMS = [
  "Weekend dance and gamelan classes for children in the neighbourhood.",
  "Tools and apprenticeships for young woodcarvers, weavers and potters.",
  "Beach clean-ups and native tree planting along the Sanur coast.",
];

const FUND_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent("Kemuning Garden Fund")}`;

const PROGRAMS: CarouselItem[] = [
  {
    href: FUND_MAIL,
    image: `/site/stock/gamelan-1.webp`,
    title: "Gamelan for the banjar",
    text: "A set of practice gamelan instruments for the neighbourhood banjar, so children can rehearse close to home.",
    meta: ["Music"],
  },
  {
    href: FUND_MAIL,
    image: `/site/stock/dance-2.webp`,
    title: "Weekend dance classes",
    text: "Classes where children learn classical dance from experienced teachers, ending in a small performance for their families.",
    meta: ["Dance"],
  },
  {
    href: FUND_MAIL,
    image: `/site/stock/ceremony-5.webp`,
    title: "School support",
    text: "Support for school uniforms, books and trips for children from nearby families.",
    meta: ["Education"],
  },
  {
    href: FUND_MAIL,
    image: `/site/stock/dance-5.webp`,
    title: "Beach clean-up day",
    text: "A yearly beach clean-up and tree-planting day, open to guests and neighbours alike.",
    meta: ["Environment"],
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero title="Our Community" image={`/site/stock/dance-4.webp`} subtitle={`${SITE.shortName} has always grown alongside its neighbours in Sanur.`} />

      {/* story */}
      <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
        <div className={`${WRAP} grid items-center gap-14 md:grid-cols-2 md:gap-20`}>
          <div>
            <Reveal>
              <p className={`${EYEBROW} mb-4`}>The Kemuning Garden Fund</p>
              <h2 className={`${H2} mb-8 text-[color:var(--ts-ink)]`}>A good place to stay depends on a good place to live.</h2>
            </Reveal>
            <div className="space-y-4">
              <Reveal delay={0.08}>
                <p className={BODY}>
                  Neighbourhood associations, called banjar, bring families together for ceremonies, music and mutual help. Part of every booking goes back to the community.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className={BODY}>
                  In 1998 the Arsana family started the Kemuning Garden Fund, a small programme financed by a share of room revenue and by guest donations. It supports projects chosen by local residents.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className={BODY}>
                  Each year the fund reviews requests from banjar, schools and craftspeople, and members of the hotel team volunteer alongside the people it helps.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal from="right">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] bg-[color:var(--ts-oat)] shadow-2xl">
              <Image src={`/site/stock/ceremony-2.webp`} alt="" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 90vw, 440px" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* aims */}
      <section className="relative overflow-hidden bg-[color:var(--ts-sea-deep)] py-20 text-[color:var(--ts-canvas)] md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 size-[420px] rounded-full bg-[color:var(--ts-accent)]/30 blur-[120px]" />
        <div className={`${WRAP} relative`}>
          <Reveal>
            <p className={`${EYEBROW} mb-3`}>What the fund supports</p>
            <h2 className={`${H2} mb-12 max-w-2xl`}>We back projects that keep Sanur&apos;s culture, craft and coastline thriving.</h2>
          </Reveal>
          <RevealGroup className="grid gap-5 md:grid-cols-3" stagger={0.12}>
            {AIMS.map((aim, i) => (
              <RevealItem key={aim}>
                <div className="h-full rounded-[24px] border-[1px] border-white/12 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10">
                  <p className="mb-6 font-[family-name:var(--font-display)] text-5xl text-[color:var(--ts-accent)]">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-base leading-relaxed text-[color:var(--ts-canvas)]/85">{aim}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CardCarousel eyebrow="Programmes" title="Four programmes, led by people who live here." items={PROGRAMS} />

      {/* join in */}
      <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
        <div className={`${WRAP} grid items-center gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20`}>
          <div>
            <Reveal>
              <p className={`${EYEBROW} mb-4`}>Join in</p>
              <h2 className={`${H2} mb-6 text-[color:var(--ts-ink)]`}>Most of it starts with volunteers, and guests are welcome.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={`${BODY} mb-4`}>
                Most weekends our team joins a community project. Ask at reception about the next dance class, beach clean-up or craft morning. There is no charge and no obligation: simply bring curiosity and a hat.
              </p>
              <p className="mb-8 text-sm text-[color:var(--ts-muted)]">
                To support the Kemuning Garden Fund you can add a donation to your stay, or ask the front desk for details. (Sample text: replace with the real programme before publishing.)
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <GlowButton href={FUND_MAIL} icon={HandHeart}>
                Ask about the next project
              </GlowButton>
            </Reveal>
          </div>
          <RevealGroup className="grid grid-cols-3 gap-3 md:gap-4" stagger={0.14}>
            {[`/site/stock/dance-2.webp`, `/site/stock/ceremony-3.webp`, `/site/stock/dance-3.webp`].map((src, i) => (
              <RevealItem key={src} className={i === 1 ? "mt-10" : ""}>
                <div className="relative aspect-[3/5] overflow-hidden rounded-[999px] shadow-xl">
                  <Image src={src} alt="" fill className="object-cover transition-transform duration-[1200ms] hover:scale-110" sizes="(max-width: 768px) 30vw, 200px" />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <NextPage title="Packages & Activities" href="/packages-and-activities" image={`/site/stock/garden-3.webp`} />
    </>
  );
}
