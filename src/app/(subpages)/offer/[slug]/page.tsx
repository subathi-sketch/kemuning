import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOffer, offers } from "@/components/site/data";
import { OfferDetail } from "@/components/site/sub/OfferDetail";

export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return {
    title: offer.title,
    description: offer.heading,
    alternates: { canonical: `/offer/${slug}` },
    openGraph: { title: offer.title, description: offer.heading, images: [offer.heroImage] },
  };
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) notFound();
  return <OfferDetail offer={offer} />;
}
