"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate } from "motion/react";
import { GlowButton } from "../GlowButton";
import { Reveal } from "../ui/Reveal";
import { EASE, EYEBROW, WRAP } from "../ui/styles";

/** A row of large rounded photographs with arrows and a progress line. */
export function GallerySlider({ images, label }: { images: string[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ start: true, end: false, progress: 0 });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8, progress: max > 0 ? el.scrollLeft / max : 1 });
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
    const li = el?.querySelector("li");
    if (!el || !li) return;
    const from = el.scrollLeft;
    const to = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, from + dir * (li.getBoundingClientRect().width + 20)));
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

  if (images.length === 0) return null;

  return (
    <section className="bg-[color:var(--ts-oat)] py-20 md:py-28">
      <div className={`${WRAP} mb-10 flex items-end justify-between gap-6`}>
        <Reveal>
          <p className={`${EYEBROW} mb-3`}>Gallery</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium md:text-4xl">{label}</h2>
        </Reveal>
        {images.length > 1 && (
          <div className="flex gap-3">
            <GlowButton round icon={ChevronLeft} ariaLabel="Previous image" onClick={() => step(-1)} disabled={state.start} />
            <GlowButton round icon={ChevronRight} ariaLabel="Next image" onClick={() => step(1)} disabled={state.end} />
          </div>
        )}
      </div>

      <ul
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:px-16 lg:pl-[max(4rem,calc((100vw-72rem)/2+4rem))] [scroll-padding-left:1.5rem] md:[scroll-padding-left:4rem]"
      >
        {images.map((src, i) => (
          <li key={`${src}-${i}`} className="relative aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-[color:var(--ts-canvas)] shadow-xl sm:w-[62%] lg:w-[620px]">
            <Image src={src} alt={`${label} ${i + 1}`} fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 640px) 86vw, 620px" />
          </li>
        ))}
        <li aria-hidden="true" className="w-4 shrink-0" />
      </ul>

      {images.length > 1 && (
        <div className={`${WRAP} mt-8`}>
          <div className="h-[2px] overflow-hidden rounded-full bg-black/10">
            <div className="h-full origin-left rounded-full bg-[color:var(--ts-accent)] transition-transform duration-300" style={{ transform: `scaleX(${Math.max(state.progress, 0.12)})` }} />
          </div>
        </div>
      )}
    </section>
  );
}
