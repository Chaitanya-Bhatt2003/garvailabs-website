import { ImageResponse } from "next/og";

export const alt = "GARV AI LABS — Intelligence that finishes the work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, drawn from the design tokens at build time rather than kept as a
 * static file, so it cannot drift from the site. System fonts only — fetching
 * Syne here would make the build depend on the network.
 */
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
          background: "#FAF9F7",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* the brand orange, used as a single edge rather than a wash */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: "#EE6352",
            display: "flex",
          }}
        />

        {/* wordmark: the dotted-g tile set in type, matching the real mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#EE6352",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2A0F0A",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            g
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#121110" }}>
            <span style={{ color: "#EE6352" }}>GARV</span>
            <span>&nbsp;AI LABS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#625C58",
              marginBottom: 22,
            }}
          >
            AI · Software · Mobile · Web · SEO · GEO
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2.5,
              color: "#121110",
              maxWidth: 940,
            }}
          >
            Intelligence that&nbsp;<span style={{ color: "#C24632" }}>finishes the work.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, color: "#625C58", fontSize: 22 }}>
          <span>Noida, Uttar Pradesh</span>
          <span style={{ color: "rgba(18,17,16,0.22)" }}>|</span>
          <span>garvailabs.com</span>
        </div>
      </div>
    ),
    size,
  );
}
