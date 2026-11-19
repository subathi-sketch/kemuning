"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { EASE, H3, WRAP } from "../ui/styles";

export interface ListItem {
  href: string;
  image: string;
  title: string;
  /** Plain description, or paragraphs. */
  description: string | string[];
  cta: string;
  /** Small label over the photo. */
  category?: string;
  /** Opens in a new tab (WhatsApp and the like). */
  external?: boolean;
}

interface TwoColumnsListProps {
  items: ListItem[];
  /** Kept so older call sites still compile. */
  scope?: string[];
  ctaVariant?: "plain" | "link";
  showCategory?: boolean;
}

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

/** Responsive card grid: photo, label, title, short text and an arrow that slides on hover. */
export function TwoColumnsList({ items, showCategory = true }: TwoColumnsListProps) {
  return (
    <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
      <motion.ul
        className={`${WRAP} grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {items.map((item, i) => {
          const text = Array.isArray(item.description) ? item.description.join(" ") : item.description;
          const body = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[color:var(--ts-oat)] shadow-sm transition-shadow duration-500 group-hover:shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {showCategory && item.category && (
                  <span className="absolute left-4 top-4 rounded-full border-[1px] border-white/40 bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {item.category}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-[color:var(--ts-canvas)] text-[color:var(--ts-ink)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="px-1 pt-6">
                <p className="mb-2 text-xs tabular-nums text-[color:var(--ts-accent)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`${H3} mb-3 text-[color:var(--ts-ink)]`}>{item.title}</h3>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-[color:var(--ts-muted)]">{text}</p>
                <span className="inline-flex items-center gap-2 text-sm tracking-wide text-[color:var(--ts-ink)]">
                  <span className="relative">
                    {item.cta}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--ts-accent)] transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </>
          );
          return (
            <motion.li key={item.title} variants={card} className={i % 3 === 1 ? "lg:mt-12" : ""}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                  {body}
                </a>
              ) : (
                <Link href={item.href} className="group block">
                  {body}
                </Link>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
