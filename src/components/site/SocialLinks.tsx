import { SITE } from "@/lib/site";

const LINK =
  "p-2 rounded-full bg-[color:var(--ts-canvas)]/10 hover:bg-[color:var(--ts-canvas)]/20 transition-colors text-[color:var(--ts-canvas)]";

const stroke = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Simple outline icons drawn for this project (no third-party artwork). */
export function SocialLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex items-center gap-4">
      <a href={`mailto:${SITE.email}`} className={LINK} aria-label="Email Us" onClick={onNavigate}>
        <svg {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
        </svg>
      </a>
      <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className={LINK} aria-label="Instagram">
        <svg {...stroke}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
        </svg>
      </a>
      <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className={LINK} aria-label="Facebook">
        <svg {...stroke}>
          <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" />
        </svg>
      </a>
      <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className={LINK} aria-label="YouTube">
        <svg {...stroke}>
          <rect x="3" y="6" width="18" height="12" rx="3.5" />
          <path d="m10.5 9.5 4 2.5-4 2.5Z" />
        </svg>
      </a>
      <a
        href={SITE.social.tripadvisor}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK}
        aria-label="TripAdvisor"
      >
        <svg {...stroke}>
          <circle cx="8" cy="13" r="3.2" />
          <circle cx="16" cy="13" r="3.2" />
          <path d="M4 10.5C6 8 9 7 12 7s6 1 8 3.5M12 7V5" />
        </svg>
      </a>
    </div>
  );
}
