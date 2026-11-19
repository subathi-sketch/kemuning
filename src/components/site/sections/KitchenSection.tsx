"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Fish, Leaf, UtensilsCrossed, Wine } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { GlowButton } from "../GlowButton";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  { icon: Leaf, title: "Farm to table", text: "Vegetables and herbs from nearby farms, picked the same morning." },
  { icon: Fish, title: "From the fish market", text: "The early catch from Sanur's beach market, grilled over coconut husk." },
  { icon: Wine, title: "Sunset drinks", text: "A short list of juices, coffees and classic cocktails for golden hour." },
];

const TODAY = ["Nasi campur with sambal matah", "Grilled snapper, lime and basil", "Black rice pudding"];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const rise = (delay: number) => ({
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: EASE, delay } },
});

/** Kemuning Kitchen: copy and highlights on the left, an arched photo collage with a "today" card on the right. */
export function KitchenSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[color:var(--ts-oat)] px-6 py-24 md:px-16 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 size-[420px] rounded-full bg-[color:var(--ts-accent)]/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-20">
        {/* copy */}
        <div>
          <motion.p {...fade()} className="font-subtitle1 mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">
            <span className="grid size-9 place-items-center rounded-full bg-[color:var(--ts-accent)]/12">
              <UtensilsCrossed size={16} />
            </span>
            Kemuning Kitchen
          </motion.p>
          <motion.h2 {...fade(0.08)} className="font-heading1 mb-6 text-[color:var(--ts-ink)]">
            Good food became the heart of the house.
          </motion.h2>
          <motion.p {...fade(0.16)} className="mb-9 max-w-lg text-base leading-relaxed text-[color:var(--ts-ink)]/80">
            What began as breakfast for guests grew into a beachfront restaurant. Home-style Indonesian dishes, a few international
            favourites and a short drinks list for sunset.
          </motion.p>

          <ul className="mb-10 space-y-3">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.title}
                {...fade(0.2 + i * 0.1)}
                whileHover={{ x: 8 }}
                className="group flex items-start gap-4 rounded-2xl border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-canvas)]/70 p-4 transition-shadow duration-500 hover:shadow-lg"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)] transition-colors duration-500 group-hover:bg-[color:var(--ts-accent)]">
                  <f.icon size={20} />
                </span>
                <span>
                  <span className="block font-sans text-[15px] font-semibold text-[color:var(--ts-ink)]">{f.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-[color:var(--ts-muted)]">{f.text}</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.div {...fade(0.5)} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <GlowButton href="/restaurant-menu" icon={BookOpen}>
              View the menu
            </GlowButton>
            <Link href="/dining" className="group inline-flex items-center gap-2 text-sm tracking-wide text-[color:var(--ts-ink)]">
              Dining at Kemuning
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>

        {/* collage: one unclipped trigger, children enter through variants */}
        <motion.div
          className="relative mx-auto w-full max-w-md pb-10 pl-8 md:max-w-none md:pb-14 md:pl-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* arched main photograph */}
          <motion.div variants={rise(0)} className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-[999px] bg-[color:var(--ts-canvas)] shadow-2xl">
            <motion.div style={{ y: yBig }} className="absolute -inset-y-[7%] inset-x-0">
              <Image
                src="/site/stock/dinner-2.webp"
                alt="Tables set for dinner beside the sea"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                sizes="(max-width: 768px) 80vw, 460px"
              />
            </motion.div>
          </motion.div>

          {/* round photograph, bottom left */}
          <motion.div variants={rise(0.15)} className="absolute bottom-6 left-0 w-[38%] md:bottom-10">
            <motion.div style={{ y: ySmall }} className="relative aspect-square overflow-hidden rounded-full border-[8px] border-[color:var(--ts-oat)] shadow-xl">
              <Image src="/site/stock/food-2.webp" alt="A table of Indonesian dishes" fill className="object-cover" sizes="(max-width: 768px) 38vw, 200px" />
            </motion.div>
          </motion.div>

          {/* small photograph, top left */}
          <motion.div variants={rise(0.3)} className="absolute left-2 top-10 w-[26%] md:left-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[6px] border-[color:var(--ts-oat)] shadow-xl">
              <Image src="/site/stock/breakfast-2.webp" alt="Breakfast with fresh juice and tropical fruit" fill className="object-cover" sizes="(max-width: 768px) 26vw, 140px" />
            </div>
          </motion.div>

          {/* today at the kitchen */}
          <motion.div
            variants={rise(0.45)}
            className="absolute -bottom-2 right-0 w-[64%] max-w-[280px] rounded-2xl border-[1px] border-white/60 bg-[color:var(--ts-canvas)]/85 p-5 shadow-2xl backdrop-blur-md md:bottom-2 md:right-[-4%]"
          >
            <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--ts-accent)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[color:var(--ts-accent)] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[color:var(--ts-accent)]" />
              </span>
              Today at the kitchen
            </p>
            <ul className="space-y-2 text-[13px] leading-snug text-[color:var(--ts-ink)]">
              {TODAY.map((d) => (
                <li key={d} className="border-b-[1px] border-[color:var(--ts-hairline)] pb-2 last:border-0 last:pb-0">
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-2 text-[11px] text-[color:var(--ts-muted)]">
              <Clock size={13} /> Open daily, 07:00 – 22:00
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
