"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { motion } from "motion/react";
import { GlowButton } from "../GlowButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A 12-column bento: each row adds up to 12, so the mosaic stays flush on desktop. */
const PICS = [
  { src: "/site/stock/beach-7.webp", alt: "An outrigger boat resting on the water at dawn", label: "Dawn on the water", cls: "col-span-2 row-span-2 md:col-span-5" },
  { src: "/site/stock/pool-1.webp", alt: "A curving pool beside palm trees", label: "The pool", cls: "col-span-2 md:col-span-4" },
  { src: "/site/stock/food-2.webp", alt: "A table of Indonesian dishes", label: "From the kitchen", cls: "col-span-1 md:col-span-3" },
  { src: "/site/stock/garden-1.webp", alt: "Frangipani in a walled courtyard garden", label: "Courtyard garden", cls: "col-span-1 md:col-span-3" },
  { src: "/site/stock/ceremony-2.webp", alt: "Offerings at a temple ceremony", label: "Temple day", cls: "col-span-2 md:col-span-4" },
];

const tile = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: EASE } },
};

/** A short bento mosaic that leads to the full gallery. */
export function GalleryStrip() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--ts-canvas)] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal="fade" className="font-subtitle1 mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">
              <span className="grid size-9 place-items-center rounded-full bg-[color:var(--ts-accent)]/12">
                <Images size={16} />
              </span>
              Gallery
            </p>
            <h2 data-reveal="up" className="font-heading1 text-[color:var(--ts-ink)]">
              Sanur, in pictures.
            </h2>
          </div>
          <div data-reveal="up">
            <GlowButton href="/gallery" icon={Images}>
              Open the gallery
            </GlowButton>
          </div>
        </div>

        <motion.div
          className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-12 md:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {PICS.map((p) => (
            <motion.div key={p.src} variants={tile} className={`${p.cls} min-h-0`}>
              <Link href="/gallery" className="group relative block size-full overflow-hidden rounded-3xl bg-[color:var(--ts-oat)] shadow-sm transition-shadow duration-500 hover:shadow-2xl">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-3 rounded-full border-[1px] border-white/30 bg-black/30 px-4 py-1.5 text-xs tracking-wide text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.label}
                </span>
                <span className="absolute right-4 top-4 grid size-10 -translate-y-2 place-items-center rounded-full bg-[color:var(--ts-canvas)] text-[color:var(--ts-ink)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
