"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GlowButton } from "../GlowButton";
import { EASE, WRAP } from "../ui/styles";
import { PageHero } from "./PageHero";

export interface GalleryImage {
  src: string;
  w: number;
  h: number;
  category: "bungalows" | "dining" | "bali";
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "bungalows", label: "Bungalows" },
  { id: "dining", label: "Dining" },
  { id: "bali", label: "Bali" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

/** Masonry gallery with category filters and a keyboard-friendly lightbox. */
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);

  const visible = useMemo(() => {
    if (filter === "all") {
      const order = { bungalows: 0, dining: 1, bali: 2 } as const;
      return [...images].sort((a, b) => order[a.category] - order[b.category]);
    }
    return images.filter((i) => i.category === filter);
  }, [filter, images]);

  const counts = useMemo(
    () => ({
      all: images.length,
      bungalows: images.filter((i) => i.category === "bungalows").length,
      dining: images.filter((i) => i.category === "dining").length,
      bali: images.filter((i) => i.category === "bali").length,
    }),
    [images],
  );

  // deep link: /gallery#dining
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      const hit = FILTERS.find((f) => f.id === id);
      if (hit) setFilter(hit.id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const move = useCallback(
    (delta: 1 | -1) => {
      setDir(delta);
      setOpen((i) => (i === null ? i : (i + delta + visible.length) % visible.length));
    },
    [visible.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, move]);

  const current = open === null ? null : visible[open];

  return (
    <>
      <PageHero title="Gallery" image={`/site/stock/beach-3.webp`} subtitle="The bungalows, the kitchen, and the island around us." />

      <section className="bg-[color:var(--ts-canvas)] py-16 md:py-24">
        <div className={WRAP}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Gallery filters">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative cursor-pointer rounded-full px-6 py-2.5 text-sm tracking-wide transition-colors duration-300 ${
                    active ? "text-[color:var(--ts-canvas)]" : "bg-[color:var(--ts-oat)] text-[color:var(--ts-ink)] hover:bg-[color:var(--ts-hairline)]"
                  }`}
                >
                  {active && <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-[color:var(--ts-sea-deep)]" transition={{ duration: 0.5, ease: EASE }} />}
                  <span className="relative">
                    {f.label} <span className="ml-1 text-xs opacity-60">{counts[f.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.ul layout className="columns-2 gap-3 md:columns-3 md:gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((img, i) => (
                <motion.li
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.04 }}
                  className="mb-3 break-inside-avoid md:mb-5"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setDir(1);
                      setOpen(i);
                    }}
                    aria-label={`Open photograph ${i + 1}`}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] bg-[color:var(--ts-oat)] shadow-sm transition-shadow duration-500 hover:shadow-2xl"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      width={img.w}
                      height={img.h}
                      className="h-auto w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 360px"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-3 left-3 rounded-full border-[1px] border-white/40 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                      {img.category}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photograph viewer"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(null)}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current.src}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative max-h-[86vh] max-w-[92vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={current.src} alt="" width={current.w} height={current.h} className="max-h-[86vh] w-auto rounded-2xl object-contain" sizes="92vw" priority />
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-5 top-5" onClick={(e) => e.stopPropagation()}>
              <GlowButton round icon={X} ariaLabel="Close" onClick={() => setOpen(null)} />
            </div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-8" onClick={(e) => e.stopPropagation()}>
              <GlowButton round icon={ChevronLeft} ariaLabel="Previous photograph" onClick={() => move(-1)} />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 md:right-8" onClick={(e) => e.stopPropagation()}>
              <GlowButton round icon={ChevronRight} ariaLabel="Next photograph" onClick={() => move(1)} />
            </div>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs tabular-nums tracking-widest text-white/80 backdrop-blur">
              {(open ?? 0) + 1} / {visible.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
