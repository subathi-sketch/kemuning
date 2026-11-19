import type { Metadata } from "next";
import gallery from "@/components/site/data/gallery.json";
import { GalleryGrid, type GalleryImage } from "@/components/site/sub/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of the bungalows and restaurant, and the island around the hotel.",
};

export default function GalleryPage() {
  const images = [...gallery.bungalows, ...gallery.dining, ...gallery.bali] as GalleryImage[];
  return <GalleryGrid images={images} />;
}
