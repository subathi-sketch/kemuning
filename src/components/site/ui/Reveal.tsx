"use client";

import { motion } from "motion/react";
import { EASE } from "./styles";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Slide in from a side instead of rising. */
  from?: "up" | "left" | "right";
}

/** Fades and slides its children in once, when they scroll into view. */
export function Reveal({ children, delay = 0, className = "", from = "up" }: RevealProps) {
  const offset = from === "up" ? { y: 32 } : from === "left" ? { x: -40 } : { x: 40 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its `<RevealItem>` children. */
export function RevealGroup({ children, className = "", stagger = 0.1 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

const item = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

export function RevealItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
