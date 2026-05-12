import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MYG Import – Importation automobile Luxembourg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Red accent bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#e30613", display: "flex" }} />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            ///MYG
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#e30613",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: 40,
            display: "flex",
          }}
        >
          POWERED BY PASSION
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          Import voiture Luxembourg & Japon
        </div>

        {/* Sub */}
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            color: "#999999",
            textAlign: "center",
            display: "flex",
          }}
        >
          Stock Europe & JDM · Simulateur en ligne · Accompagnement clé en main
        </div>

        {/* CTA pill */}
        <div
          style={{
            marginTop: 40,
            background: "#e30613",
            color: "#ffffff",
            fontSize: 20,
            fontWeight: 700,
            padding: "14px 40px",
            borderRadius: 999,
            letterSpacing: "1px",
            display: "flex",
          }}
        >
          DEVIS GRATUIT · myg-import.lu
        </div>

        {/* Red accent bar bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#e30613", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
