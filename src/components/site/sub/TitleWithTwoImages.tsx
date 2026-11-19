"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE, H2, WRAP } from "../ui/styles";

interface TitleWithTwoImagesProps {
  title: string;
  smallImage: string;
  smallText: string;
  largeImage: string;
  largeText: string;
  hasBackground?: boolean;
}

const rise = (delay: number) => ({
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: EASE, delay } },
});

/** A big statement, then an arched portrait and a wide landscape with a caption each. */
export function TitleWithTwoImages({ title, smallImage, smallText, largeImage, largeText, hasBackground }: TitleWithTwoImagesProps) {
  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${hasBackground ? "bg-[color:var(--ts-oat)]" : "bg-[color:var(--ts-canvas)]"}`}>
      <div className={WRAP}>
        <motion.h2
          className={`${H2} mb-14 max-w-4xl text-[color:var(--ts-ink)] md:mb-20`}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="grid items-end gap-12 md:grid-cols-[0.8fr_1.4fr] md:gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.figure variants={rise(0)} className="mx-auto w-full max-w-sm md:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-[color:var(--ts-oat)] shadow-2xl">
              <Image src={smallImage} alt="" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 80vw, 360px" />
            </div>
            {smallText && <figcaption className="mt-5 text-sm leading-relaxed text-[color:var(--ts-muted)]">{smallText}</figcaption>}
          </motion.figure>

          <motion.figure variants={rise(0.15)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[color:var(--ts-oat)] shadow-2xl">
              <Image src={largeImage} alt="" fill className="object-cover transition-transform duration-[1200ms] hover:scale-105" sizes="(max-width: 768px) 100vw, 720px" />
            </div>
            {largeText && <figcaption className="mt-5 max-w-xl text-sm leading-relaxed text-[color:var(--ts-muted)]">{largeText}</figcaption>}
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}
