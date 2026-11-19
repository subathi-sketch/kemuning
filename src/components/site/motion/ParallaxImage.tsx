"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ScrollRootContext } from "./ScrollRoot";

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Travel as a percentage of the frame (default 7). */
  strength?: number;
}

/**
 * A photograph that drifts slowly against its frame while its panel scrolls past.
 * On desktop the home page scrolls sideways, so progress follows the horizontal scroller;
 * on mobile (and subpages) it follows normal vertical scroll.
 */
export function ParallaxImage({ src, alt, sizes, priority, className = "", strength = 7 }: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const root = useContext(ScrollRootContext);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setHorizontal(mq.matches && !!root?.current);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [root]);

  const { scrollXProgress, scrollYProgress } = useScroll({
    target: frame,
    container: horizontal && root?.current ? root : undefined,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollXProgress, [0, 1], [`${-strength}%`, `${strength}%`]);
  const y = useTransform(scrollYProgress, [0, 1], [`${-strength}%`, `${strength}%`]);

  return (
    <div ref={frame} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute" style={horizontal ? { x, inset: "0 -9%" } : { y, inset: "-9% 0" }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-center" />
      </motion.div>
    </div>
  );
}
