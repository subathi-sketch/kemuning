"use client";

import { motion } from "motion/react";
import { EASE } from "../ui/styles";

/** Landmarks with a distance bar that grows into place; the longest distance fills the track. */
export function Landmarks({ items }: { items: [string, string][] }) {
  const km = (s: string) => parseFloat(s);
  const max = Math.max(...items.map(([, d]) => km(d)));

  return (
    <ul className="space-y-6">
      {items.map(([name, distance], i) => (
        <li key={name}>
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <span className="text-base text-[color:var(--ts-ink)]">{name}</span>
            <span className="font-[family-name:var(--font-display)] text-2xl tabular-nums text-[color:var(--ts-accent)]">{distance}</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="h-full origin-left rounded-full bg-[color:var(--ts-sea-deep)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(4, (km(distance) / max) * 100)}%` }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.4, ease: EASE, delay: i * 0.08 }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
