"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { GlowButton } from "../GlowButton";
import { cultures } from "../data";

const EASE = [0.22, 1, 0.36, 1] as const;
const SECONDS = 7;
const PICKS = ["galungan", "nyepi", "melasti", "ogoh-ogoh", "piodalan"];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/** Culture: a full-bleed photograph that follows a rail of festivals, each opening in turn. */
export function CultureSection() {
  const items = PICKS.map((slug) => cultures.find((c) => c.slug === slug)).filter((c): c is NonNullable<typeof c> => !!c);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const current = items[active];
  const next = () => setActive((a) => (a + 1) % items.length);

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-[760px] flex-col justify-between overflow-hidden bg-[color:var(--ts-deep)] text-[color:var(--ts-canvas)] md:min-h-[820px]"
    >
      {/* photograph that follows the active festival */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <Image src={current.heroImage} alt={current.title} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
      </div>

      {/* headline */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 md:px-16 md:pt-36">
        <motion.p {...fade()} className="font-subtitle1 mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-canvas)]/80">
          <span className="h-px w-10 bg-[color:var(--ts-accent)]" />
          Culture
        </motion.p>
        <motion.h2 {...fade(0.08)} className="font-heading1 mb-5 max-w-2xl">
          Mornings belong to the village, evenings to the stage.
        </motion.h2>
        <motion.p {...fade(0.16)} className="mb-8 max-w-xl text-base leading-relaxed text-[color:var(--ts-canvas)]/85">
          Sanur&apos;s neighbourhood communities still gather for dance practice, gamelan rehearsals and temple festivals through the
          year. Reception keeps a calendar so guests can attend ceremonies respectfully.
        </motion.p>
        <motion.div {...fade(0.24)}>
          <GlowButton href="/cultures" icon={Compass}>
            Explore the cultures
          </GlowButton>
        </motion.div>
      </div>

      {/* festival rail */}
      <div className="relative mx-auto mt-14 w-full max-w-6xl px-6 pb-10 md:px-16 md:pb-14">
        <ul className="flex flex-col gap-3 md:flex-row" role="tablist" aria-label="Festivals of Sanur">
          {items.map((c, i) => {
            const isActive = i === active;
            return (
              <motion.li
                key={c.slug}
                layout
                {...fade(0.1 * i)}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 * i, layout: { duration: 0.7, ease: EASE } }}
                className={`min-w-0 ${isActive ? "md:flex-[2.6]" : "md:flex-1"}`}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`relative block size-full cursor-pointer overflow-hidden rounded-2xl border-[1px] p-5 text-left backdrop-blur-md transition-colors duration-500 ${
                    isActive ? "border-white/35 bg-white/15" : "border-white/12 bg-white/[0.06] hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-xs tabular-nums text-[color:var(--ts-accent)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-[family-name:var(--font-display)] text-xl leading-tight md:text-2xl">{c.title}</span>
                  </span>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        className="block overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <span className="mt-3 line-clamp-3 block text-sm leading-relaxed text-[color:var(--ts-canvas)]/80">
                          {c.block1?.paragraphs[0]}
                        </span>
                        <Link
                          href={`/culture/${c.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="group mt-4 inline-flex items-center gap-2 text-sm tracking-wide"
                        >
                          Read more
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Link>
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
                      <span
                        key={`${c.slug}-${active}`}
                        className="day-progress block h-full origin-left bg-[color:var(--ts-accent)]"
                        style={{
                          animation: `day-progress ${SECONDS}s linear forwards`,
                          animationPlayState: paused || !inView ? "paused" : "running",
                        }}
                        onAnimationEnd={next}
                      />
                    </span>
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
