import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -1 }}>
            Alfa Beauty Cosmetica
          </div>
          <div style={{ fontSize: 28, opacity: 0.9, lineHeight: 1.25 }}>
            Products • Education • Partnership
          </div>
          <div style={{ fontSize: 18, opacity: 0.75 }}>
            No public pricing • WhatsApp consultation
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
