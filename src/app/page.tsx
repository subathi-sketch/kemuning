import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { HeroSection } from "@/components/site/sections/HeroSection";
import { StorySection } from "@/components/site/sections/StorySection";
import { BungalowsPreview } from "@/components/site/sections/BungalowsPreview";
import { DayAtKemuningSection } from "@/components/site/sections/DayAtKemuningSection";
import { DiningCultureSection } from "@/components/site/sections/DiningCultureSection";
import { GalleryStrip } from "@/components/site/sections/GalleryStrip";

export default function Home() {
  return (
    <div className="relative bg-[color:var(--ts-canvas)] font-sans text-[color:var(--ts-ink)]">
      <Header />
      <RevealOnScroll />
      <main id="main">
        <HeroSection />
        <StorySection />
        <BungalowsPreview />
        <DayAtKemuningSection />
        <DiningCultureSection />
        <GalleryStrip />
      </main>
      <Footer />
    </div>
  );
}
