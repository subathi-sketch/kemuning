"use client";

import { motion } from "motion/react";

interface SplitWordsProps {
  text: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
}

/** Headline that rises word by word out of a mask. Plays once, on mount. */
export function SplitWords({ text, className = "", delay = 0.15, stagger = 0.09 }: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", rotate: 3 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
