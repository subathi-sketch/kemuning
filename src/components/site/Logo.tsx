import { useId } from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

interface LogoMarkProps {
  className?: string;
  /** Pixel size of the square mark. */
  size?: number;
}

const PETAL = "M32 35C19.5 28.5 17 11.5 32 2.5c15 9 12.5 26 0 32.5Z";

/**
 * Kemuning emblem: the five-petal blossom of the orange jasmine (kemuning) that gives the hotel its name.
 * Drawn with `currentColor`, so it follows the surrounding text colour (cream on charcoal by default);
 * the centre is a true cut-out, so it works on any background.
 */
export function LogoMark({ className, size = 40 }: LogoMarkProps) {
  const mask = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={`${SITE.name} emblem`}
      className={cn("shrink-0", className)}
    >
      <defs>
        <mask id={mask}>
          <rect width="64" height="64" fill="#fff" />
          <circle cx="32" cy="33.5" r="4.6" fill="#000" />
          <circle cx="32" cy="33.5" r="1.3" fill="#fff" />
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#${mask})`}>
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} transform={`rotate(${i * 72} 32 33.5)`} d={PETAL} />
        ))}
        <circle cx="32" cy="33.5" r="6" />
      </g>
    </svg>
  );
}

interface LogoLockupProps {
  className?: string;
  markSize?: number;
  /** Show the small "Sanur · Bali" line under the name. */
  showTagline?: boolean;
}

/** Emblem + wordmark (set in the site's display serif). */
export function LogoLockup({ className, markSize = 36, showTagline = true }: LogoLockupProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span className="font-serif uppercase tracking-[0.3em] text-[1.05em]">{SITE.shortName}</span>
        {showTagline && (
          <span className="mt-1.5 font-sans uppercase tracking-[0.34em] text-[0.5em] opacity-70">Sanur · Bali</span>
        )}
      </span>
    </span>
  );
}
