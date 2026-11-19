import type { MetadataRoute } from "next";
import { bungalows, cultures, offers } from "@/components/site/data";
import { SITE } from "@/lib/site";

const STATIC: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/bungalows", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dining", priority: 0.8, changeFrequency: "monthly" },
  { path: "/restaurant-menu", priority: 0.7, changeFrequency: "monthly" },
  { path: "/packages-and-activities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cultures", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/community", priority: 0.5, changeFrequency: "yearly" },
  { path: "/getting-here", priority: 0.7, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    ...STATIC.map((s) => entry(s.path, s.priority, s.changeFrequency)),
    ...bungalows.map((b) => entry(`/bungalow/${b.slug}`, 0.8, "monthly")),
    ...offers.map((o) => entry(`/offer/${o.slug}`, 0.7, "monthly")),
    ...cultures.map((c) => entry(`/culture/${c.slug}`, 0.5, "yearly")),
  ];
}
