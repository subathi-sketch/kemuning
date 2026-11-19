"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Moon, Sun, Sunrise, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const SECONDS = 7;

interface Moment {
  key: string;
  label: string;
  hours: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  title: string;
  text: string;
  things: string[];
  /** Section background and whether the text turns light. */
  bg: string;
  dark: boolean;
}

const DAY: Moment[] = [
  {
    key: "morning",
    label: "Morning",
    hours: "06:30 – 11:00",
    icon: Sunrise,
    image: "/site/stock/breakfast-3.webp",
    alt: "A floating breakfast tray beside a pool",
    title: "Slow starts and warm bread",
    text: "Breakfast on the terrace, with bread still warm from the garden oven and a pot of strong Balinese coffee.",
    things: ["Garden breakfast", "Yoga on the lawn", "Temple walk"],
    bg: "#f8f1dc",
    dark: false,
  },
  {
    key: "afternoon",
    label: "Afternoon",
    hours: "11:00 – 17:00",
    icon: Sun,
    image: "/site/stock/pool-1.webp",
    alt: "A curving pool beside palm trees and the sea",
    title: "Shade, a book and the sea",
    text: "Shade, a good book and the sound of the sea. Borrow a bicycle for the beach path, or book a massage in the garden.",
    things: ["Bicycle the beach path", "Garden massage", "Cooking class"],
    bg: "#e3efe9",
    dark: false,
  },
  {
    key: "evening",
    label: "Evening",
    hours: "17:00 – late",
    icon: Moon,
    image: "/site/stock/dinner-2.webp",
    alt: "Tables set for dinner beside the sea",
    title: "Lanterns along the sand",
    text: "Lanterns are lit along the sand and dinner is served under the trees, with the tide for company.",
    things: ["Lantern-lit dinner", "Gamelan on the terrace", "Stargazing"],
    bg: "#1b2f2d",
    dark: true,
  },
];

/** "A day at Kemuning": a morning, afternoon and evening that open one after another (or on click). */
export function DayAtKemuningSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const current = DAY[active];

  const next = () => setActive((a) => (a + 1) % DAY.length);

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ backgroundColor: current.bg }}
      className={`relative overflow-hidden px-6 py-24 transition-colors duration-[1400ms] ease-out md:px-16 md:py-32 ${
        current.dark ? "text-[color:var(--ts-canvas)]" : "text-[color:var(--ts-ink)]"
      }`}
    >
      {/* a soft sun/moon glow that changes with the hour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[520px] rounded-full blur-[110px] transition-all duration-[1400ms]"
        style={{ backgroundColor: current.dark ? "rgba(148,92,38,0.35)" : active === 0 ? "rgba(255,190,90,0.45)" : "rgba(120,200,190,0.35)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p data-reveal="fade" className="font-subtitle1 mb-3 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">
            A day at Kemuning
          </p>
          <h2 data-reveal="up" className="font-heading1">
            Nothing to do, and plenty of time to do it.
          </h2>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
          {/* photograph */}
          <div data-reveal="rise" className="relative aspect-[4/3.3] overflow-hidden rounded-[28px] shadow-2xl md:aspect-auto md:min-h-[520px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.key}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <Image src={current.image} alt={current.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 620px" priority={false} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border-[1px] border-white/30 bg-black/30 px-4 py-2 text-xs tracking-wide text-white backdrop-blur-md">
              <current.icon size={15} />
              <span className="tabular-nums">{current.hours}</span>
            </div>
            <p className="absolute bottom-5 left-6 right-6 font-[family-name:var(--font-display)] text-2xl text-white drop-shadow md:text-3xl">
              {current.title}
            </p>
          </div>

          {/* moments */}
          <ul className="flex flex-col gap-4" role="tablist" aria-label="A day at Kemuning">
            {DAY.map((m, i) => {
              const isActive = i === active;
              const Icon = m.icon;
              return (
                <li key={m.key} data-reveal="up" style={{ ["--d" as string]: `${i * 110}ms` }}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`relative block w-full cursor-pointer overflow-hidden rounded-2xl border-[1px] p-5 text-left backdrop-blur-sm transition-all duration-500 md:p-6 ${
                      isActive
                        ? current.dark
                          ? "border-white/30 bg-white/10 shadow-xl"
                          : "border-black/10 bg-white/70 shadow-xl"
                        : current.dark
                          ? "border-white/10 bg-white/[0.03] opacity-70 hover:opacity-100"
                          : "border-black/5 bg-white/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                          isActive ? "bg-[color:var(--ts-accent)] text-white" : current.dark ? "bg-white/10" : "bg-black/5"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-[family-name:var(--font-display)] text-2xl leading-none">{m.label}</span>
                        <span className="mt-1 block text-xs tabular-nums opacity-60">{m.hours}</span>
                      </span>
                      <span className="text-xs tabular-nums opacity-40">{String(i + 1).padStart(2, "0")}</span>
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
                          <span className="mt-4 block text-sm leading-relaxed opacity-80">{m.text}</span>
                          <span className="mt-4 flex flex-wrap gap-2">
                            {m.things.map((t) => (
                              <span
                                key={t}
                                className={`rounded-full border-[1px] px-3 py-1 text-[11px] ${
                                  current.dark ? "border-white/20 bg-white/5" : "border-black/10 bg-white/60"
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* progress line: when it fills, the next moment opens */}
                    {isActive && (
                      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-black/5">
                        <span
                          key={`${m.key}-${active}`}
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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
