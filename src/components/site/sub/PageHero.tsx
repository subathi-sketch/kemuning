import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ParallaxImage } from "../motion/ParallaxImage";
import { SplitWords } from "../motion/SplitWords";
import { Reveal } from "../ui/Reveal";
import { DISPLAY } from "../ui/styles";

interface PageHeroProps {
  title: string;
  image: string;
  alt?: string;
  /** Short line under the title. */
  subtitle?: string;
  /** Accepted for old call sites; the new hero is always full width. */
  horizontal?: boolean;
}

/** Tall photographic header: breadcrumb, a headline that rises word by word, and a scroll cue. */
export function PageHero({ title, image, alt, subtitle }: PageHeroProps) {
  return (
    <section className="relative flex h-[78vh] min-h-[520px] items-end overflow-hidden bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)]">
      <div className="absolute inset-0">
        <ParallaxImage src={image} alt={alt ?? title} priority sizes="100vw" strength={10} />
        <div className="absolute inset-0 z-10 bg-black/25" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-black/45" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 pb-16 md:px-16 md:pb-24">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--ts-canvas)]/75">
          <Link href="/" className="transition-colors hover:text-[color:var(--ts-canvas)]">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[color:var(--ts-canvas)]">{title}</span>
        </nav>
        <h1 className={`${DISPLAY} max-w-4xl text-5xl leading-[0.98] tracking-tight drop-shadow-md md:text-7xl lg:text-[7rem]`}>
          <SplitWords text={title} delay={0.2} />
        </h1>
        {subtitle && (
          <Reveal delay={0.7}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--ts-canvas)]/85 md:text-lg">{subtitle}</p>
          </Reveal>
        )}
      </div>

      <div className="absolute bottom-8 right-6 z-20 hidden flex-col items-center gap-3 text-[color:var(--ts-canvas)]/80 md:right-16 md:flex" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/25">
          <span className="absolute inset-x-0 top-0 h-6 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-white" />
        </span>
      </div>
    </section>
  );
}
