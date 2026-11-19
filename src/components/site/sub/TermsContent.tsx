"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { WRAP } from "../ui/styles";
import { PageHero } from "./PageHero";

interface TermsContentProps {
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
}

/** Terms & conditions: a sticky index that follows the scroll, beside the clauses as cards. */
export function TermsContent({ title, sections }: TermsContentProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHero title={title} image={`/site/stock/garden-2.webp`} subtitle="Sample terms for bookings, cancellations and use of this website." />

      <section className="bg-[color:var(--ts-canvas)] py-16 md:py-24">
        <div className={`${WRAP} grid items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16`}>
          <nav aria-label="Sections" className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">On this page</p>
            <ul className="space-y-1 border-l-[1px] border-[color:var(--ts-hairline)]">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    className={`-ml-px block w-full cursor-pointer border-l-2 py-2 pl-4 text-left text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                      i === active
                        ? "border-[color:var(--ts-accent)] font-medium text-[color:var(--ts-ink)]"
                        : "border-transparent text-[color:var(--ts-muted)] hover:text-[color:var(--ts-ink)]"
                    }`}
                  >
                    {s.heading}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6">
            {sections.map((s, i) => (
              <Reveal key={s.heading}>
                <article
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="scroll-mt-28 rounded-[24px] border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-oat)]/60 p-7 md:p-9"
                >
                  <p className="mb-2 text-xs tabular-nums text-[color:var(--ts-accent)]">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-medium uppercase tracking-wide md:text-3xl">{s.heading}</h2>
                  <div className="space-y-3 text-sm leading-relaxed text-[color:var(--ts-ink)]/80 md:text-base">
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
