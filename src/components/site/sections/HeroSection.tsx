import { ArrowDown, BedDouble, CalendarCheck } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { ParallaxImage } from "../motion/ParallaxImage";
import { SplitWords } from "../motion/SplitWords";
import { BOOKING, SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[620px] w-full items-center justify-center overflow-hidden bg-[color:var(--ts-sea-deep)]">
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/site/stock/villa-1.webp"
          alt="A thatched Balinese bungalow beside a turquoise pool in a tropical garden"
          priority
          sizes="100vw"
          strength={9}
        />
        <div className="absolute inset-0 z-10 bg-black/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-transparent to-black/35" />
      </div>

      <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <p
          data-reveal="fade"
          className="font-subtitle1 mb-5 text-xs uppercase tracking-[0.25em] text-[color:var(--ts-canvas)]/90 md:text-sm"
        >
          Welcome to {SITE.name}
        </p>
        <h1 className="font-serif text-[3.4rem] font-medium leading-[0.98] tracking-tight text-[color:var(--ts-canvas)] drop-shadow-md sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <SplitWords text="Slow days by the sea" delay={0.35} />
        </h1>
        <div data-reveal="up" className="mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ ["--d" as string]: "700ms" }}>
          <GlowButton href={BOOKING.room} icon={CalendarCheck}>
            Plan your stay
          </GlowButton>
          <GlowButton href="/bungalows" icon={BedDouble}>
            See the bungalows
          </GlowButton>
        </div>
      </div>

      <a
        href="#story"
        aria-label="Scroll to the story"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[color:var(--ts-canvas)]/80 transition-colors hover:text-[color:var(--ts-canvas)]"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
