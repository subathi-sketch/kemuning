"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { RevealOnScroll } from "../RevealOnScroll";

/** Wraps every subpage: the shared header and footer around the page content. */
export function SubpageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Hash links (e.g. /restaurant-menu#drinks, /gallery#dining) are handled by their pages.
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <RevealOnScroll key={pathname} />
      <Header />
      <main id="main" className="bg-[color:var(--ts-canvas)] text-[color:var(--ts-ink)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
