import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, drawn at build time (no photograph, so no licensing questions). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #1b2f2d 0%, #243d3b 55%, #945c26 140%)",
          color: "#fffef2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, letterSpacing: 10, textTransform: "uppercase" }}>
          <div style={{ width: 18, height: 18, borderRadius: 18, background: "#ff7a1a" }} />
          {SITE.shortName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 112, lineHeight: 1.02, fontFamily: "serif" }}>Slow days by the sea</div>
          <div style={{ fontSize: 36, opacity: 0.8 }}>{SITE.tagline}</div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.6, letterSpacing: 4, textTransform: "uppercase" }}>
          {`${SITE.name} · Since ${SITE.founded}`}
        </div>
      </div>
    ),
    size,
  );
}
