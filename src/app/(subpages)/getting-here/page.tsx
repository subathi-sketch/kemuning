import type { Metadata } from "next";
import Image from "next/image";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { GlowButton } from "@/components/site/GlowButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/ui/Reveal";
import { BODY, EYEBROW, H2, WRAP } from "@/components/site/ui/styles";
import { Landmarks } from "@/components/site/sub/Landmarks";
import { NewsletterForm } from "@/components/site/sub/NewsletterForm";
import { NextPage } from "@/components/site/sub/NextPage";
import { PageHero } from "@/components/site/sub/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Getting Here",
  description: "Where to find Kemuning Sanur, how to reach it from the airport and what is nearby.",
};

const TITLE = "Kemuning Sanur sits a few minutes' walk from Sanur Beach, close to the airport and well placed for exploring Bali.";

const LANDMARKS: [string, string][] = [
  ["Sanur Beach promenade", "0.2 km"],
  ["Sanur morning market", "1.1 km"],
  ["Denpasar city centre", "7 km"],
  ["Bali Arts Centre", "8 km"],
  ["Ngurah Rai Airport", "14 km"],
  ["Ubud", "27 km"],
];

const NOTES = [
  "More than forty restaurants and cafés are within a ten-minute walk",
  "To the airport: about 35 minutes by car",
  "To Ubud: about 1 hour 15 minutes by car",
  "To Seminyak: about 1 hour by car",
  "To Canggu: about 1 hour 15 minutes by car (distances are approximate and depend on traffic)",
];

export default function GettingHerePage() {
  const contacts = [
    { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneLink },
    { icon: Mail, label: "Mail", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: "Location", value: SITE.address.oneLine, href: SITE.mapUrl },
  ];

  return (
    <>
      <PageHero title="Getting Here" image={`/site/stock/aerial-1.webp`} subtitle="A few minutes from the beach and about thirty-five from the airport." />

      <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
        <div className={WRAP}>
          <Reveal>
            <h2 className={`${H2} mb-14 max-w-4xl text-[color:var(--ts-ink)]`}>{TITLE}</h2>
          </Reveal>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {contacts.map((c) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  {...(c.label === "Location" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block h-full rounded-[24px] border-[1px] border-[color:var(--ts-hairline)] bg-[color:var(--ts-oat)] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[color:var(--ts-accent)]/50 hover:shadow-2xl"
                >
                  <span className="mb-6 grid size-14 place-items-center rounded-full bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)] transition-colors duration-500 group-hover:bg-[color:var(--ts-accent)]">
                    <c.icon size={22} />
                  </span>
                  <p className={`${EYEBROW} mb-2`}>{c.label}</p>
                  <p className="break-words text-lg leading-snug text-[color:var(--ts-ink)]">{c.value}</p>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-[color:var(--ts-oat)] py-20 md:py-28">
        <div className={`${WRAP} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
          <Reveal from="left">
            <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" aria-label="View on Google Maps" className="group relative block aspect-[4/3] overflow-hidden rounded-[28px] shadow-2xl">
              <Image src={`/site/stock/aerial-3.webp`} alt="Aerial view of the Sanur coastline" fill className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 560px" />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--ts-accent)]/60" />
                <span className="relative grid size-14 place-items-center rounded-full bg-[color:var(--ts-accent)] text-white shadow-xl">
                  <MapPin size={24} />
                </span>
              </span>
              <span className="absolute bottom-5 left-5 rounded-full border-[1px] border-white/40 bg-black/35 px-5 py-2 text-sm text-white backdrop-blur-md">Open in Google Maps</span>
            </a>
          </Reveal>
          <div>
            <Reveal>
              <p className={`${EYEBROW} mb-3`}>Nearby</p>
              <h3 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-medium md:text-4xl">Distances at a glance</h3>
            </Reveal>
            <Landmarks items={LANDMARKS} />
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--ts-canvas)] py-20 md:py-28">
        <div className={WRAP}>
          <Reveal>
            <p className={`${EYEBROW} mb-3`}>Good to know</p>
            <h3 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-medium md:text-4xl">Travel times</h3>
          </Reveal>
          <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.07}>
            {NOTES.map((n) => (
              <RevealItem key={n}>
                <div className="flex items-start gap-4 rounded-2xl border-[1px] border-[color:var(--ts-hairline)] p-5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[color:var(--ts-sea-deep)] text-[color:var(--ts-canvas)]">
                    <Check size={14} />
                  </span>
                  <p className={`${BODY} text-sm`}>{n}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--ts-sea-deep)] py-20 text-[color:var(--ts-canvas)] md:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 size-[420px] rounded-full bg-[color:var(--ts-accent)]/30 blur-[120px]" />
        <div className={`${WRAP} relative grid items-center gap-12 md:grid-cols-[0.6fr_1fr] md:gap-20`}>
          <Reveal from="left">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-t-[999px] shadow-2xl">
              <Image src={`/site/stock/garden-5.webp`} alt="" fill className="object-cover" sizes="(max-width: 768px) 70vw, 320px" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[color:var(--ts-accent)]">Join us</p>
              <h2 className={`${H2} mb-8`}>Sign up for news and seasonal offers from Kemuning Sanur</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <NewsletterForm />
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <GlowButton href={SITE.whatsapp} icon={Phone}>
                  Message us on WhatsApp
                </GlowButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <NextPage title="Gallery" href="/gallery" image={`/site/stock/ceremony-4.webp`} />
    </>
  );
}
