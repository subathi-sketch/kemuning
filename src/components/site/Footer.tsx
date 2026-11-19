"use client";

import { useContext } from "react";
import Link from "next/link";
import { ArrowUp, CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { GlowButton } from "./GlowButton";
import { LogoLockup } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { ScrollRootContext } from "./motion/ScrollRoot";
import { BOOKING, SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const EXPLORE = [
  { title: "Our Story", href: "/" },
  { title: "Bungalows", href: "/bungalows" },
  { title: "Dining", href: "/dining" },
  { title: "Cultures", href: "/cultures" },
  { title: "Gallery", href: "/gallery" },
];
const STAY = [
  { title: "Packages & Activities", href: "/packages-and-activities" },
  { title: "Our Community", href: "/community" },
  { title: "Getting Here", href: "/getting-here" },
  { title: "Restaurant Menu", href: "/restaurant-menu" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
];

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const letter: Variants = {
  hidden: { y: "105%" },
  show: { y: 0, transition: { duration: 1, ease: EASE } },
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block py-1 text-[15px] text-[color:var(--ts-canvas)]/70 transition-colors duration-300 hover:text-[color:var(--ts-canvas)]"
    >
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{children}</span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--ts-accent)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

/**
 * Site footer. `panel` makes it the last panel of the sideways-scrolling home page;
 * otherwise it is a normal full-width block at the end of a page.
 */
export function Footer({ panel = false }: { panel?: boolean }) {
  const rootRef = useContext(ScrollRootContext);

  const toTop = () => {
    const root = rootRef?.current;
    if (root && window.innerWidth >= 768) root.scrollTo({ left: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toStartIfHome = () => {
    if (window.location.pathname === "/") toTop();
  };

  return (
    <footer
      className={`relative overflow-hidden bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)] ${
        panel ? "w-full shrink-0 md:h-screen md:w-[1180px]" : "w-full"
      }`}
    >
      {/* slow drifting glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[color:var(--ts-accent)]/20 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2, root: rootRef ?? undefined }}
        className={`relative flex flex-col justify-between gap-14 px-7 pb-8 pt-16 md:px-16 lg:px-20 ${
          panel ? "md:h-full md:py-16" : "md:pt-24"
        }`}
      >
        {/* CTA */}
        <motion.div variants={rise} className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading1 max-w-xl text-4xl leading-[1.1] md:text-5xl">
            Come for a night, <em className="not-italic text-[color:var(--ts-accent)]">stay for the sea.</em>
          </h2>
          <GlowButton href={BOOKING.room} icon={CalendarCheck}>
            Plan your stay
          </GlowButton>
        </motion.div>

        {/* Columns */}
        <div className="grid gap-12 border-t-[1px] border-[color:var(--ts-canvas)]/15 pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <motion.div variants={rise} className="max-w-xs">
            <Link href="/" onClick={toStartIfHome} aria-label={`${SITE.name} Home`} className="inline-block">
              <LogoLockup markSize={40} />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-[color:var(--ts-canvas)]/65">{SITE.tagline}</p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </motion.div>

          <motion.nav variants={rise} aria-label="Explore">
            <p className="font-subtitle1 mb-4 text-xs tracking-[0.22em] text-[color:var(--ts-canvas)]/45">Explore</p>
            <ul className="space-y-1">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.title}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav variants={rise} aria-label="Stay with us">
            <p className="font-subtitle1 mb-4 text-xs tracking-[0.22em] text-[color:var(--ts-canvas)]/45">Stay with us</p>
            <ul className="space-y-1">
              {STAY.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.title}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={rise}>
            <p className="font-subtitle1 mb-4 text-xs tracking-[0.22em] text-[color:var(--ts-canvas)]/45">Find us</p>
            <ul className="space-y-3 text-[15px] text-[color:var(--ts-canvas)]/70">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[color:var(--ts-accent)]" />
                <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--ts-canvas)]">
                  {SITE.address.oneLine}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[color:var(--ts-accent)]" />
                <a href={SITE.phoneLink} className="transition-colors hover:text-[color:var(--ts-canvas)]">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[color:var(--ts-accent)]" />
                <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-[color:var(--ts-canvas)]">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Wordmark + bottom bar */}
        <div>
          <div className="overflow-hidden" aria-hidden="true">
            <motion.div variants={group} className="flex justify-between font-medium font-[family-name:var(--font-display)] text-[17vw] leading-[0.95] tracking-tight text-[color:var(--ts-canvas)]/10 md:text-[110px] lg:text-[150px]">
              {SITE.shortName
                .toUpperCase()
                .split("")
                .map((c, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span variants={letter} className="inline-block">
                      {c}
                    </motion.span>
                  </span>
                ))}
            </motion.div>
          </div>

          <motion.div
            variants={rise}
            className="mt-6 flex flex-col gap-4 border-t-[1px] border-[color:var(--ts-canvas)]/15 pt-6 text-xs text-[color:var(--ts-canvas)]/55 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms-and-conditions" className="transition-colors hover:text-[color:var(--ts-canvas)]">
                Terms
              </Link>
              <button
                type="button"
                onClick={toTop}
                className="group inline-flex cursor-pointer items-center gap-2 transition-colors hover:text-[color:var(--ts-canvas)]"
              >
                {panel ? "Back to start" : "Back to top"}
                <span className="glow-rim grid size-8 place-items-center rounded-full border-[1px] border-[color:var(--ts-canvas)]/30 transition-colors group-hover:bg-[color:var(--ts-canvas)] group-hover:text-[color:var(--ts-ink)]">
                  <ArrowUp size={14} className={panel ? "-rotate-90" : ""} />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
