"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { LogoMark } from "../Logo";
import { SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { to: SITE.founded, from: SITE.founded - 60, suffix: "", label: "Welcoming guests since" },
  { to: 6, from: 0, suffix: "", label: "Bungalows, suites and villas" },
  { to: 2, from: 0, suffix: " min", label: "Walk to the beach" },
];

/** Counts up to a number once it scrolls into view. */
function Counter({ to, from, suffix }: { to: number; from: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(from, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, from, to, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
      {suffix}
    </span>
  );
}

/** A headline whose words rise out of a mask one after another. */
function RevealWords({ text, show }: { text: string; show: boolean }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: show ? 0 : "110%" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/** "Our story": layered photographs with parallax, a rotating seal, a word-by-word headline and counting facts. */
export function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const headIn = useInView(headRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const yMark = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section ref={ref} id="story" className="relative scroll-mt-20 overflow-hidden bg-[color:var(--ts-canvas)] px-6 py-24 md:px-16 md:py-36">
      {/* oversized year, drifting behind everything */}
      <motion.span
        aria-hidden="true"
        style={{ y: yMark }}
        className="pointer-events-none absolute -right-6 top-6 select-none font-[family-name:var(--font-display)] text-[34vw] font-medium leading-none text-[color:var(--ts-ink)]/[0.035] md:text-[24vw]"
      >
        {SITE.founded}
      </motion.span>

      <div className="relative mx-auto grid max-w-6xl items-center gap-20 md:grid-cols-[1.05fr_1fr] md:gap-16 lg:gap-24">
        {/* photographs */}
        <motion.div
          className="relative mx-auto w-full max-w-md pb-16 md:mx-0 md:max-w-none md:pb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-[88%] border-[1px] border-[color:var(--ts-accent)]/50 md:-left-6 md:-top-6"
            variants={{
              hidden: { opacity: 0, x: -20, y: -20 },
              show: { opacity: 1, x: 0, y: 0, transition: { duration: 1.1, ease: EASE, delay: 0.3 } },
            }}
          />

          <motion.div
            className="relative aspect-[4/5] w-[88%] overflow-hidden bg-[color:var(--ts-oat)] shadow-2xl"
            variants={{
              hidden: { clipPath: "inset(100% 0 0 0)" },
              show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.3, ease: EASE } },
            }}
          >
            <motion.div style={{ y: yMain }} className="absolute -inset-y-[8%] inset-x-0">
              <motion.div
                className="relative size-full"
                variants={{
                  hidden: { scale: 1.25 },
                  show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
                }}
              >
                <Image
                  src="/site/stock/garden-3.webp"
                  alt="A quiet stone path through a tropical garden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 520px"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* second, smaller photograph overlapping the first */}
          <motion.div
            className="absolute bottom-0 right-0 w-[46%] border-[8px] border-[color:var(--ts-canvas)] shadow-2xl"
            variants={{
              hidden: { opacity: 0, y: 60 },
              show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: 0.5 } },
            }}
          >
            <motion.div style={{ y: ySmall }} className="relative aspect-square overflow-hidden bg-[color:var(--ts-oat)]">
              <Image
                src="/site/stock/beach-7.webp"
                alt="An outrigger boat resting on the water at dawn"
                fill
                className="scale-125 object-cover"
                sizes="(max-width: 768px) 45vw, 240px"
              />
            </motion.div>
          </motion.div>

          {/* rotating seal */}
          <motion.div
            className="absolute right-[2%] top-[6%] grid size-28 place-items-center rounded-full bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)] shadow-xl md:right-[-4%] md:size-32"
            variants={{
              hidden: { opacity: 0, scale: 0.4, rotate: -90 },
              show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: EASE, delay: 0.8 } },
            }}
          >
            <motion.svg
              viewBox="0 0 120 120"
              className="absolute inset-0 size-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <defs>
                <path id="seal-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
              </defs>
              <text fontSize="9.5" letterSpacing="3.2" fill="currentColor" className="font-sans uppercase">
                <textPath href="#seal-circle">Kemuning Sanur · since {SITE.founded} · bali ·</textPath>
              </text>
            </motion.svg>
            <LogoMark size={36} />
          </motion.div>
        </motion.div>

        {/* copy */}
        <div>
          <motion.div {...fadeUp()} className="mb-6 flex items-center gap-4">
            <LogoMark size={44} className="text-[color:var(--ts-ink)]" />
            <motion.span
              className="h-px w-14 origin-left bg-[color:var(--ts-accent)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            />
            <span className="font-subtitle1 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">Our story</span>
          </motion.div>

          <h2 ref={headRef} className="font-heading1 mb-8 text-[color:var(--ts-ink)]">
            <RevealWords text="Four thatched bungalows and a hedge of orange jasmine." show={headIn} />
          </h2>

          <div className="space-y-4 text-base leading-relaxed text-[color:var(--ts-ink)]/80">
            <motion.p {...fadeUp(0.1)}>
              {SITE.name} began in {SITE.founded} when Ibu Ratna and Pak Dewa Arsana bought a quiet plot two minutes from the shore. With
              local carpenters they built four bungalows from thatch, river stone and reclaimed teak, and planted a hedge of{" "}
              <em>kemuning</em>, the orange jasmine whose scent gave the house its name.
            </motion.p>
            <motion.p {...fadeUp(0.2)}>
              Word travelled the way it does in Bali, from one friend to the next. The little kitchen became a neighbourhood favourite,
              and the house has stayed small on purpose ever since.
            </motion.p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                {...fadeUp(0.15 * i)}
                whileHover={{ y: -6 }}
                className="rounded-2xl border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-oat)] p-4 transition-shadow duration-500 hover:shadow-lg sm:p-5"
              >
                <dt className="font-heading2 text-3xl text-[color:var(--ts-ink)] md:text-4xl">
                  <Counter to={f.to} from={f.from} suffix={f.suffix} />
                </dt>
                <dd className="mt-2 text-xs leading-snug text-[color:var(--ts-muted)]">{f.label}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.div {...fadeUp(0.2)} className="mt-10">
            <Link href="/community" className="group inline-flex items-center gap-3 text-sm tracking-wide text-[color:var(--ts-ink)]">
              <span className="relative">
                How we grew with Sanur
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--ts-accent)] transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
