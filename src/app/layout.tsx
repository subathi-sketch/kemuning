import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./theme.css";
import "./polish.css";
import { SITE } from "@/lib/site";
import { hotelJsonLd, jsonLdScript } from "@/lib/seo";
import { PageLoader } from "@/components/site/PageLoader";
import { ScrollTopRing } from "@/components/site/ScrollTopRing";

// Open-licence (SIL OFL) variable fonts, committed to the repo so builds never need the network.
// Latin subset: Cormorant Garamond (display) and DM Sans (body), both from Google Fonts.
const display = localFont({
  src: [
    { path: "./fonts/cormorant-normal.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const body = localFont({
  src: [{ path: "./fonts/dmsans.woff2", weight: "100 1000", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["Sanur hotel", "Bali bungalows", "beachside bungalows Sanur", "boutique hotel Bali", SITE.name],
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} | ${SITE.tagline}`, description: SITE.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1b2f2d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[color:var(--ts-canvas)] text-[color:var(--ts-ink)]">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[role=status]{display:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-[color:var(--ts-canvas)] px-5 py-2.5 text-sm text-[color:var(--ts-ink)] shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(hotelJsonLd()) }} />
        <PageLoader />
        {children}
        <ScrollTopRing />
      </body>
    </html>
  );
}
