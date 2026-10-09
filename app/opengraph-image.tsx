import { ImageResponse } from "next/og";

import { site } from "@/data/site";
import { OG_IMAGE } from "@/lib/og-image";

/**
 * The card every pasted link renders as. Under `output: export` this is
 * prerendered to a static PNG at build time — no runtime, no edge function.
 *
 * It is a file convention, so Next attaches it to every route that does not
 * declare its own `openGraph` object; the ones that do restate it from
 * lib/og-image.ts. Colours are the light-theme tokens, written out literally
 * because Satori resolves no custom properties.
 *
 * `dynamic = "force-static"` is required under `output: export`: the route has
 * to be prerendered rather than served.
 */
export const dynamic = "force-static";

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

const BG = "#ffffff";
const FG = "#0d1117";
const MUTED = "#565f6e";
const BORDER = "#e4e6eb";
const ACCENT = "#4b34d1";

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
          backgroundColor: BG,
          padding: "72px 80px",
          // Stands in for the hairline grid without shipping an asset.
          backgroundImage: `linear-gradient(to right, ${BORDER} 1px, transparent 1px), linear-gradient(to bottom, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 18,
              backgroundColor: ACCENT,
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: MUTED,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {site.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              color: FG,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 38,
              color: MUTED,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            borderTop: `2px solid ${BORDER}`,
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: FG }}>
            {site.availability}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
