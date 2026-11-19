/** Shared class strings so every page uses the same type and spacing. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DISPLAY = "font-[family-name:var(--font-display)] font-medium";
export const H1 = `${DISPLAY} text-4xl leading-[1.08] md:text-6xl`;
export const H2 = `${DISPLAY} text-3xl leading-[1.12] md:text-5xl`;
export const H3 = `${DISPLAY} text-2xl leading-tight md:text-3xl`;
export const EYEBROW = "text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]";
export const BODY = "text-base leading-relaxed text-[color:var(--ts-ink)]/80";
export const WRAP = "mx-auto w-full max-w-6xl px-6 md:px-16";
export const SECTION = "relative overflow-hidden py-20 md:py-28";
