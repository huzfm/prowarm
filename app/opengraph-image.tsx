import { ImageResponse } from "next/og";

export const alt = "ProWarm India — Underfloor Heating Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          backgroundImage: "linear-gradient(135deg, #111110 0%, #1a1a1a 55%, #30190e 100%)",
          color: "#faf7f2",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#c8763a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            🔥
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>ProWarm India</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 700, maxWidth: 900 }}>
            Warmth you feel. Heating you never see.
          </div>
          <div style={{ fontSize: 32, color: "#d5945e" }}>
            Underfloor heating, engineered for Indian homes · prowarm.in
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
