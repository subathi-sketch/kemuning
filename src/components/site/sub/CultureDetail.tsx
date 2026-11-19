import Image from "next/image";
import { ParallaxImage } from "../motion/ParallaxImage";
import type { Culture } from "../data";
import { Reveal } from "../ui/Reveal";
import { BODY, EYEBROW, H2, WRAP } from "../ui/styles";
import { NextPage } from "./NextPage";
import { PageHero } from "./PageHero";

/** Culture detail page: an introduction beside a portrait, then a full-bleed second story. */
export function CultureDetail({ culture, nextHref }: { culture: Culture; nextHref: string | null }) {
  const { block1, block2, next } = culture;

  return (
    <article>
      <PageHero title={culture.title} image={culture.heroImage} />

      {block1 && (
        <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
          <div className={`${WRAP} grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20`}>
            <Reveal from="left">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-[999px] bg-[color:var(--ts-oat)] shadow-2xl">
                <Image src={block1.image} alt={culture.title} fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 90vw, 440px" />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <p className={`${EYEBROW} mb-4`}>{culture.title}</p>
                <h2 className={`${H2} mb-8 text-[color:var(--ts-ink)]`}>{block1.heading}</h2>
              </Reveal>
              <div className="space-y-4">
                {block1.paragraphs.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className={BODY}>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {block2 && (
        <section className="relative flex min-h-[640px] items-center overflow-hidden bg-[color:var(--ts-deep)] text-[color:var(--ts-canvas)]">
          <div className="absolute inset-0">
            <ParallaxImage src={block2.image} alt={culture.title} sizes="100vw" strength={8} />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
          </div>
          <div className={`${WRAP} relative z-20 py-24`}>
            <div className="max-w-xl">
              <Reveal>
                <h2 className={`${H2} mb-7`}>{block2.heading}</h2>
              </Reveal>
              <div className="space-y-4">
                {block2.paragraphs.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className="text-base leading-relaxed text-[color:var(--ts-canvas)]/85">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {next ? (
        <NextPage title={next.title} href={nextHref ?? "/cultures"} image={next.image} />
      ) : (
        <NextPage title="Gallery" href="/gallery" image="/site/stock/ceremony-4.webp" />
      )}
    </article>
  );
}
