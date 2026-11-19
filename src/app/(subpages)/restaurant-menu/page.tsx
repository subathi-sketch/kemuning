import type { Metadata } from "next";
import menu from "@/components/site/data/menu.json";
import { MenuList } from "@/components/site/sub/MenuList";

export const metadata: Metadata = {
  title: "Restaurant Menu",
  description: "Breakfast, all-day dining and drinks at Kemuning Kitchen.",
};

export default function RestaurantMenuPage() {
  return (
    <MenuList
      items={menu.items.map((i) => ({ id: i.id, title: i.title, desktop: i.desktop as string[], mobile: i.mobile as string[] }))}
      labels={menu.labels as { title: string }[]}
      notes={menu.notes}
    />
  );
}
