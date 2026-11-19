"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { EYEBROW, H2, WRAP } from "../ui/styles";
import { PageHero } from "./PageHero";

export interface MenuSection {
  id: string;
  title: string;
  desktop: string[];
  mobile: string[];
}

interface MenuListProps {
  items: MenuSection[];
  labels: { title: string }[];
  notes: string[];
}

/** Restaurant menus: a sticky section index, a spy that follows the scroll, and a print-to-PDF button. */
export function MenuList({ items, labels, notes }: MenuListProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const sections = useRef<Record<string, HTMLElement | null>>({});

  // scroll spy + deep links (`/restaurant-menu#drinks`)
  useEffect(() => {
    const spy = () => {
      const line = window.innerHeight * 0.4;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = sections.current[item.id];
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };
    const toHash = () => {
      const id = window.location.hash.slice(1);
      if (id && sections.current[id]) sections.current[id]?.scrollIntoView({ block: "start" });
    };
    toHash();
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("hashchange", toHash);
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("hashchange", toHash);
    };
  }, [items]);

  const go = (id: string) => {
    sections.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  /** Prints (or saves as PDF) only the menu currently in view. */
  const downloadMenu = () => {
    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-section]"));
    for (const el of all) {
      if (el.dataset.menuSection !== active) el.setAttribute("data-print-skip", "true");
    }
    document.body.setAttribute("data-print-menu", "true");
    const cleanup = () => {
      document.body.removeAttribute("data-print-menu");
      all.forEach((el) => el.removeAttribute("data-print-skip"));
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  };

  return (
    <>
      <PageHero title="Restaurant Menu" image={`/site/stock/dinner-1.webp`} subtitle="Breakfast, all-day dining and drinks at Kemuning Kitchen." />

      <section className="bg-[color:var(--ts-canvas)] pb-20">
        {/* sticky index */}
        <div data-print-hide className="sticky top-20 z-30 py-4">
          <div className={`${WRAP} flex flex-wrap items-center justify-center gap-3`}>
            <ul className="flex flex-wrap items-center justify-center gap-2 rounded-full border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-canvas)]/85 p-1.5 shadow-lg backdrop-blur-xl" role="tablist">
              {items.map((item) => {
                const on = item.id === active;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => go(item.id)}
                      className={`cursor-pointer rounded-full px-5 py-2 text-sm tracking-wide transition-colors duration-300 ${
                        on ? "bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)]" : "text-[color:var(--ts-ink)] hover:bg-[color:var(--ts-oat)]"
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <GlowButton icon={Download} compact onClick={downloadMenu}>
              Download menu
            </GlowButton>
          </div>
        </div>

        <div className={`${WRAP} space-y-24 pt-12`}>
          {items.map((item) => (
            <div
              key={item.id}
              id={item.id}
              data-menu-section={item.id}
              ref={(el) => {
                sections.current[item.id] = el;
              }}
              className="scroll-mt-40"
            >
              <Reveal>
                <p className={`${EYEBROW} mb-3`}>Kemuning Kitchen</p>
                <h2 className={`${H2} mb-10 text-[color:var(--ts-ink)]`}>{item.title}</h2>
              </Reveal>
              <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
                {item.desktop.map((src, i) => (
                  <RevealItem key={`${src}-${i}`}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[color:var(--ts-oat)] shadow-lg transition-shadow duration-500 hover:shadow-2xl">
                      <Image src={src} alt={`${item.title} menu page ${i + 1}`} fill className="object-cover transition-transform duration-[1000ms] hover:scale-105" sizes="(max-width: 640px) 100vw, 380px" />
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}

          <Reveal>
            <div className="flex flex-wrap items-center gap-3 rounded-[24px] bg-[color:var(--ts-oat)] p-7">
              {labels.map((l) => (
                <span key={l.title} className="rounded-full border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-canvas)] px-4 py-1.5 text-xs tracking-wide">
                  {l.title}
                </span>
              ))}
              <ul className="mt-3 w-full space-y-1 text-sm text-[color:var(--ts-muted)]">
                {notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
