"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

const KEY = "kemuning-loaded";

/**
 * A short splash on the first visit of a session: the emblem inside a spinning orange arc.
 * Driven by timers and a CSS transition (not animation frames), and it stops catching clicks as soon as it
 * starts fading, so it can never leave the logo or the menu unclickable.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: just show the splash */
    }
    const fade = window.setTimeout(() => setPhase("fade"), seen ? 0 : 900);
    const gone = window.setTimeout(() => setPhase("gone"), seen ? 400 : 1500);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] grid place-items-center bg-[color:var(--ts-sea-deep)] transition-opacity duration-500 ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative grid size-24 place-items-center text-[color:var(--ts-canvas)]">
        <svg
          className="absolute inset-0 size-full"
          style={{ animation: "loader-spin 1s linear infinite" }}
          viewBox="0 0 96 96"
          aria-hidden="true"
        >
          <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="#ff7a1a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70 207"
          />
        </svg>
        <LogoMark size={44} />
      </div>
    </div>
  );
}
