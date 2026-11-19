"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { GlowButton } from "./GlowButton";
import { LogoLockup } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { BOOKING, SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const BUNGALOW_TYPES = [
  { title: "Garden Bungalow", href: "/bungalow/garden-bungalow" },
  { title: "Loft Bungalow", href: "/bungalow/loft-bungalow" },
  { title: "Beach Bungalow", href: "/bungalow/beach-bungalow" },
  { title: "Courtyard Suite", href: "/bungalow/courtyard-suite" },
  { title: "Pool Villa", href: "/bungalow/pool-villa" },
  { title: "Family House", href: "/bungalow/family-house" },
];

const SECONDARY = [
  { title: "Our Community", href: "/community" },
  { title: "Packages & Activities", href: "/packages-and-activities" },
  { title: "Getting Here", href: "/getting-here" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
};
const item: Variants = {
  hidden: { y: 42, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

/** Two bars that cross into an X. */
function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block w-8 h-[10px]" aria-hidden="true">
      <motion.span
        className="absolute left-0 right-0 h-[1.5px] bg-[color:var(--ts-canvas)] origin-center"
        animate={open ? { top: 4, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      <motion.span
        className="absolute left-0 right-0 h-[1.5px] bg-[color:var(--ts-canvas)] origin-center"
        animate={open ? { top: 4, rotate: -45 } : { top: 8, rotate: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
    </span>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [bungalowsOpen, setBungalowsOpen] = useState(false);
  const [origin, setOrigin] = useState("calc(100vw - 40px) 32px");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setIsOpen((open) => {
      if (!open) setOrigin(`${window.innerWidth - 40}px 32px`);
      return !open;
    });
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  // Already on the home page: the link would do nothing, so scroll back to the top instead
  const goHome = useCallback(() => {
    setIsOpen(false);
    if (window.location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Pill state: any scroll source counts (the page on subpages, the horizontal strip on the home page)
  useEffect(() => {
    const onScroll = (e: Event) => {
      const t = e.target;
      setScrolled(t instanceof HTMLElement ? t.scrollLeft > 24 || t.scrollTop > 24 : window.scrollY > 24);
    };
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);


  // Escape closes the menu; the page behind does not scroll while it is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  const primary: { title: string; href: string; children?: typeof BUNGALOW_TYPES }[] = [
    { title: "Our Story", href: "/" },
    { title: "Bungalows", href: "/bungalows", children: BUNGALOW_TYPES },
    { title: "Dining", href: "/dining" },
    { title: "Cultures", href: "/cultures" },
    { title: "Gallery", href: "/gallery" },
  ];

  return (
    <>
      {/* Top bar: full width at the top of the page, a floating glass pill once scrolled */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent transition-opacity duration-500 ${
            scrolled || isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`pointer-events-auto relative flex items-center justify-between text-[color:var(--ts-canvas)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "mt-3 w-[min(94vw,980px)] rounded-full border-[1px] border-white/15 bg-[color:var(--ts-sea-deep)]/70 py-2 pl-6 pr-3 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "mt-0 w-full border-[1px] border-transparent px-5 py-4 lg:px-14 lg:py-6"
          }`}
        >
          <Link href="/" onClick={goHome} aria-label={`${SITE.name} Home`} className="shrink-0 cursor-pointer">
            <LogoLockup markSize={scrolled ? 30 : 36} showTagline={false} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3 font-sans text-[15px]">
              {primary.map((link) => {
                const children = link.children;
                const open = menu === link.title;
                return (
                  <li
                    key={link.title}
                    className="relative"
                    onMouseEnter={() => children && setMenu(link.title)}
                    onMouseLeave={() => children && setMenu(null)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        onClick={() => setMenu(null)}
                        className="group relative block px-3 py-2 opacity-90 transition-opacity hover:opacity-100"
                      >
                        {link.title}
                        <span
                          className={`absolute inset-x-3 bottom-1 h-px origin-left bg-current transition-transform duration-500 ease-out ${
                            isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </Link>
                      {children && (
                        <button
                          type="button"
                          aria-label={`${link.title} menu`}
                          aria-expanded={open}
                          onClick={() => setMenu(open ? null : link.title)}
                          className="-ml-2 cursor-pointer p-1.5"
                        >
                          <ChevronDown size={15} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {children && open && (
                        <motion.ul
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="absolute left-0 top-full w-60 pt-3"
                        >
                          <div className="rounded-2xl border-[1px] border-white/15 bg-[color:var(--ts-sea-deep)]/95 p-2 shadow-2xl backdrop-blur-xl">
                            {children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMenu(null)}
                                  className="block rounded-xl px-4 py-2.5 text-sm text-[color:var(--ts-canvas)]/85 transition-colors hover:bg-white/10 hover:text-[color:var(--ts-canvas)]"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <GlowButton href={BOOKING.room} icon={Phone} compact className="hidden lg:inline-flex">
              Contact us
            </GlowButton>
            <button
              onClick={toggle}
              className="cursor-pointer p-3 lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <Burger open={isOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 bg-[color:var(--ts-deep)] text-[color:var(--ts-canvas)] overflow-y-auto"
            initial={{ clipPath: `circle(0px at ${origin})` }}
            animate={{ clipPath: `circle(170vmax at ${origin})` }}
            exit={{ clipPath: `circle(0px at ${origin})`, transition: { duration: 0.6, ease: EASE } }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {/* faint ornament, clipped so it never creates a scrollbar */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/site/ornament-cream.svg" alt="" className="absolute -right-40 -bottom-40 w-[640px] max-w-none opacity-[0.05]" />
            </div>

            <div className="relative min-h-full flex flex-col md:flex-row md:items-stretch justify-between gap-12 pt-24 md:pt-16 pb-12 px-7 md:px-20">
              {/* Primary links */}
              <motion.nav variants={list} initial="hidden" animate="show" className="flex flex-col justify-center md:flex-1" aria-label="Main">
                <motion.div variants={item} className="mb-8 md:mb-10 text-[color:var(--ts-canvas)] text-lg">
                  <Link href="/" onClick={goHome} aria-label={`${SITE.name} Home`} className="inline-block">
                    <LogoLockup markSize={44} />
                  </Link>
                </motion.div>
                <ul className="space-y-1 md:space-y-2">
                  {primary.map((link, i) => (
                    <motion.li variants={item} key={link.href}>
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="font-sans text-[11px] tracking-[0.25em] text-[color:var(--ts-canvas)]/40 w-6 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Link
                          href={link.href}
                          onClick={close}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className={`group relative inline-block font-heading1 text-4xl md:text-6xl leading-[1.1] transition-all duration-500 ease-out hover:translate-x-3 ${
                            isActive(link.href) ? "text-[color:var(--ts-canvas)]" : "text-[color:var(--ts-canvas)]/80 hover:text-[color:var(--ts-canvas)]"
                          }`}
                        >
                          {link.title}
                          <span
                            className={`absolute left-0 -bottom-1 h-px w-full origin-left bg-[color:var(--ts-canvas)] transition-transform duration-500 ease-out ${
                              isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}
                          />
                        </Link>
                        {link.children && (
                          <button
                            type="button"
                            onClick={() => setBungalowsOpen((o) => !o)}
                            aria-expanded={bungalowsOpen}
                            aria-label={bungalowsOpen ? "Hide bungalow types" : "Show bungalow types"}
                            className="relative size-7 self-center cursor-pointer text-[color:var(--ts-canvas)]/70 hover:text-[color:var(--ts-canvas)] transition-colors"
                          >
                            <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-current" />
                            <motion.span
                              className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-current"
                              animate={{ rotate: bungalowsOpen ? 0 : 90 }}
                              transition={{ duration: 0.4, ease: EASE }}
                            />
                          </button>
                        )}
                      </div>

                      {link.children && (
                        <AnimatePresence initial={false}>
                          {bungalowsOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.55, ease: EASE }}
                              className="overflow-hidden ml-10 md:ml-[3.6rem] border-l border-[color:var(--ts-canvas)]/20"
                            >
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={close}
                                    className="block py-1.5 pl-5 font-sans text-sm tracking-wide text-[color:var(--ts-canvas)]/70 hover:text-[color:var(--ts-canvas)] hover:translate-x-1 transition-all duration-300"
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              {/* Secondary column */}
              <motion.div
                variants={list}
                initial="hidden"
                animate="show"
                className="md:w-[330px] flex flex-col justify-between gap-10 md:border-l md:border-[color:var(--ts-canvas)]/15 md:pl-12 pt-8 md:pt-0 border-t md:border-t-0 border-[color:var(--ts-canvas)]/15"
              >
                <div className="space-y-10">
                  <motion.ul variants={item} className="space-y-3 font-sans text-sm tracking-[0.16em] uppercase">
                    {SECONDARY.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={close}
                          className={`inline-block transition-all duration-300 hover:translate-x-1 ${
                            isActive(l.href) ? "text-[color:var(--ts-canvas)]" : "text-[color:var(--ts-canvas)]/70 hover:text-[color:var(--ts-canvas)]"
                          }`}
                        >
                          {l.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div variants={item}>
                    <GlowButton href={BOOKING.room} icon={Phone} onClick={close}>
                      Contact us
                    </GlowButton>
                  </motion.div>

                  <motion.div variants={item} className="pt-6 border-t border-[color:var(--ts-canvas)]/15">
                    <p className="font-subtitle1 text-xs tracking-widest text-[color:var(--ts-canvas)]/60 mb-4">Get in touch</p>
                    <SocialLinks />
                  </motion.div>
                </div>

                <motion.div variants={item} className="text-xs font-sans text-[color:var(--ts-canvas)]/55 leading-relaxed">
                  <p>{SITE.address.oneLine}</p>
                  <p className="mt-1">
                    <a href={SITE.phoneLink} className="hover:text-[color:var(--ts-canvas)] transition-colors">
                      {SITE.phone}
                    </a>
                  </p>
                  <p className="mt-3">
                    © {new Date().getFullYear()} {SITE.name}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
