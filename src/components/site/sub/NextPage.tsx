import { ArrowRight } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { ParallaxImage } from "../motion/ParallaxImage";
import { Reveal } from "../ui/Reveal";
import { DISPLAY, EYEBROW } from "../ui/styles";

interface NextPageProps {
  title: string;
  href: string;
  image: string;
}

/** Closes a page with a full-width photograph that points to the next one. */
export function NextPage({ title, href, image }: NextPageProps) {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[color:var(--ts-deep)] text-center text-[color:var(--ts-canvas)] md:min-h-[520px]">
      <div className="absolute inset-0">
        <ParallaxImage src={image} alt="" sizes="100vw" strength={8} />
        <div className="absolute inset-0 z-10 bg-black/55" />
      </div>
      <div className="relative z-20 px-6 py-20">
        <Reveal>
          <p className={`${EYEBROW} mb-4 !text-[color:var(--ts-canvas)]/80`}>Next page</p>
          <h2 className={`${DISPLAY} mb-8 text-5xl leading-none md:text-7xl`}>{title}</h2>
          <div className="flex justify-center">
            <GlowButton href={href} icon={ArrowRight}>
              Continue to {title}
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
