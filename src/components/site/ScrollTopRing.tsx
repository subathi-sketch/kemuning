"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

const R = 24;

/** Floating "back to top" button whose orange ring fills as the page is read. */
export function ScrollTopRing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 z-40 grid size-14 cursor-pointer place-items-center rounded-full border-[1px] border-white/15 bg-[#0e1b1a]/85 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r={R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
            <motion.circle
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke="#ff7a1a"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={20} className="relative text-[#ff7a1a]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
