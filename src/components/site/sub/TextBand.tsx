import { Reveal } from "../ui/Reveal";
import { BODY, EYEBROW, H2, WRAP } from "../ui/styles";

interface TextBandProps {
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: "light" | "oat";
  children?: React.ReactNode;
}

/** A centred introduction: label, headline, paragraph and optional buttons. */
export function TextBand({ eyebrow, title, text, tone = "light", children }: TextBandProps) {
  return (
    <section className={`py-20 md:py-28 ${tone === "oat" ? "bg-[color:var(--ts-oat)]" : "bg-[color:var(--ts-canvas)]"}`}>
      <div className={`${WRAP} text-center`}>
        <div className="mx-auto max-w-3xl">
          {eyebrow && (
            <Reveal>
              <p className={`${EYEBROW} mb-4`}>{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h2 className={`${H2} mb-6 text-[color:var(--ts-ink)]`}>{title}</h2>
          </Reveal>
          {text && (
            <Reveal delay={0.16}>
              <p className={`${BODY} mx-auto mb-8 max-w-2xl`}>{text}</p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center justify-center gap-4">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
