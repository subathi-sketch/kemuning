"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { animate, motion } from "motion/react";
import { GlowButton } from "./GlowButton";

export interface CarouselItem {
  href: string;
  image: string;
  title: string;
  text: string;
  /** Small facts shown as chips under the text. */
  meta?: string[];
}

interface CardCarouselProps {
  eyebrow?: string;
  title: string;
  items: CarouselItem[];
  allHref?: string;
  allLabel?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** A dark, glassy card carousel: native scroll-snap track with arrow buttons and a progress line. */
export function CardCarousel({ eyebrow, title, items, allHref, allLabel }: CardCarouselProps) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0 });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft > max - 8,
      progress: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    // Animate scrollLeft ourselves (snapping is paused meanwhile) so it eases the same in every browser
    const from = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.max(0, Math.min(max, from + dir * (card.getBoundingClientRect().width + 28)));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollLeft = to;
      return;
    }
    el.style.scrollSnapType = "none";
    animate(from, to, {
      duration: 0.6,
      ease: EASE,
      onUpdate: (v) => {
        el.scrollLeft = v;
      },
      onComplete: () => {
        el.style.scrollSnapType = "";
      },
    });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <section className="relative overflow-hidden bg-[color:var(--ts-sea-deep)] py-24 text-[color:var(--ts-canvas)] md:py-32">
      {/* technical grid + drifting glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[460px] rounded-full bg-[color:var(--ts-accent)]/35 blur-[130px]"
        animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 size-[520px] rounded-full bg-teal-400/20 blur-[140px]"
        animate={{ y: [0, -50, 0], x: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-16">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            {eyebrow && (
              <p data-reveal="fade" className="font-subtitle1 mb-3 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">
                {eyebrow}
              </p>
            )}
            <h2 data-reveal="up" className="font-heading1 max-w-xl">
              {title}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3" onKeyDown={onKey}>
            {[-1, 1].map((dir) => {
              const disabled = dir === -1 ? edge.start : edge.end;
              return (
                <GlowButton
                  key={dir}
                  round
                  icon={dir === -1 ? ChevronLeft : ChevronRight}
                  onClick={() => step(dir as 1 | -1)}
                  disabled={disabled}
                  ariaLabel={dir === -1 ? "Previous" : "Next"}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* track: bleeds to the right edge so the next card peeks in */}
      <ul
        ref={track}
        tabIndex={0}
        onKeyDown={onKey}
        aria-label={title}
        className="no-scrollbar relative flex [scroll-padding-left:1.5rem] md:[scroll-padding-left:4rem] lg:[scroll-padding-left:max(4rem,calc((100vw-72rem)/2+4rem))] snap-x snap-mandatory gap-7 overflow-x-auto px-6 pb-4 pt-2 outline-none md:px-16 lg:pl-[max(4rem,calc((100vw-72rem)/2+4rem))] lg:pr-16"
      >
        {items.map((item, i) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE, delay: Math.min(i, 3) * 0.08 }}
            className="w-[82%] shrink-0 snap-start sm:w-[44%] lg:w-[330px]"
          >
            <Link
              href={item.href}
              className="group relative block h-full rounded-[28px] border-[1px] border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[color:var(--ts-accent)]/60 hover:shadow-[0_30px_70px_-20px_rgba(148,92,38,0.5)]"
            >
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[20px] bg-black/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 82vw, 330px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ts-sea-deep)]/70 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border-[1px] border-white/25 bg-black/30 px-3 py-1 text-[11px] tabular-nums tracking-widest backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-full bg-[color:var(--ts-canvas)] text-[color:var(--ts-ink)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <div className="px-3.5 pb-4 pt-5">
                <h3 className="mb-2 font-sans text-[17px] font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--ts-canvas)]/70">{item.text}</p>
                {item.meta && item.meta.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.meta.map((m) => (
                      <span key={m} className="rounded-full border-[1px] border-white/15 bg-white/5 px-3 py-1 text-[11px] text-[color:var(--ts-canvas)]/80">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.li>
        ))}
        <li aria-hidden="true" className="w-1 shrink-0 lg:w-12" />
      </ul>

      <div className="relative mx-auto mt-10 flex max-w-6xl items-center gap-6 px-6 md:px-16">
        <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full origin-left rounded-full bg-[color:var(--ts-accent)] transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(edge.progress, 0.12)})` }}
          />
        </div>
        {allHref && (
          <Link href={allHref} className="group inline-flex items-center gap-2 text-sm tracking-wide text-[color:var(--ts-canvas)]/85 hover:text-[color:var(--ts-canvas)]">
            {allLabel ?? "View all"}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
