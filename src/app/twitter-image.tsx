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
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background:
            "radial-gradient(circle at 22% 12%, rgba(255,255,255,0.12), transparent 36%), linear-gradient(180deg, #0c0c0c, #060606)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 7,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          AWOD.AI
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.02,
            maxWidth: 940,
          }}
        >
          AI creative portfolio and booking.
        </div>
      </div>
    ),
    { ...size },
  );
}
