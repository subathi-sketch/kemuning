import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cultures, getCulture } from "@/components/site/data";
import { CultureDetail } from "@/components/site/sub/CultureDetail";

export function generateStaticParams() {
  return cultures.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const culture = getCulture(slug);
  if (!culture) return {};
  const description = culture.block1?.heading ?? `${culture.title}: a Balinese ceremony you may meet during a stay in Sanur.`;
  return {
    title: culture.title,
    description,
    alternates: { canonical: `/culture/${slug}` },
    openGraph: { title: culture.title, description, images: [culture.heroImage] },
  };
}

export default async function CulturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const culture = getCulture(slug);
  if (!culture) notFound();
  // The "next page" teaser links to the following culture in the listing order.
  const index = cultures.findIndex((c) => c.slug === slug);
  const nextHref = cultures[index + 1] ? `/culture/${cultures[index + 1].slug}` : null;
  return <CultureDetail culture={culture} nextHref={nextHref} />;
}
