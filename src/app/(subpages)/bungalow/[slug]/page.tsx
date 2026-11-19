import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bungalows, getBungalow } from "@/components/site/data";
import { BungalowDetail } from "@/components/site/sub/BungalowDetail";

export function generateStaticParams() {
  return bungalows.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bungalow = getBungalow(slug);
  if (!bungalow) return {};
  return {
    title: bungalow.title,
    description: bungalow.summary,
    alternates: { canonical: `/bungalow/${slug}` },
    openGraph: { title: bungalow.title, description: bungalow.summary, images: [bungalow.heroImage] },
  };
}

export default async function BungalowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bungalow = getBungalow(slug);
  if (!bungalow) notFound();
  return <BungalowDetail bungalow={bungalow} />;
}
