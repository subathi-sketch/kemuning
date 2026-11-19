import Link from "next/link";
import { Sparkles, type LucideIcon } from "lucide-react";

interface GlowButtonProps {
  children?: React.ReactNode;
  /** Renders a link when given, otherwise a real <button>. */
  href?: string;
  /** Icon shown before the label (or alone, in a round button). */
  icon?: LucideIcon;
  /** Smaller padding, for use inside the header. */
  compact?: boolean;
  /** A circular icon-only button (arrows and the like). */
  round?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  /** Use "submit" inside a form. */
  type?: "button" | "submit";
}

/**
 * Dark glass pill with a white light that travels around its whole edge (see `.glow-rim` in polish.css).
 * Renders a Next link for in-site paths, a plain anchor for external ones, a <button> without `href`.
 */
export function GlowButton({
  children,
  href,
  icon: Icon = Sparkles,
  compact = false,
  round = false,
  className = "",
  onClick,
  disabled,
  ariaLabel,
  type = "button",
}: GlowButtonProps) {
  const size = round ? "size-11 shrink-0 justify-center overflow-hidden p-0" : compact ? "px-5 py-2 text-[13px] gap-2" : "px-7 py-3.5 text-sm gap-2.5";
  const cls = `${round ? "" : "glow-rim"} group inline-flex ${round ? "" : "w-fit"} items-center rounded-full border-[1px] border-white/10 bg-[#0e1b1a] tracking-wide text-[color:var(--ts-canvas)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors duration-300 hover:bg-[#13292a] disabled:cursor-default disabled:opacity-35 ${size} ${className}`;
  const content = (
    <>
      <Icon size={round ? 20 : compact ? 15 : 18} className="shrink-0 text-white" aria-hidden="true" />
      {children}
    </>
  );

  if (!href) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={`${cls} cursor-pointer`}>
        {content}
      </button>
    );
  }
  return /^(https?:|mailto:|tel:)/.test(href) ? (
    <a href={href} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {content}
    </a>
  ) : (
    <Link href={href} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {content}
    </Link>
  );
}
