import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(circle at 18% 14%, rgba(255,255,255,0.14), transparent 34%), linear-gradient(180deg, #0b0b0b, #070707)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          AWOD.AI
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 86,
            fontWeight: 700,
            lineHeight: 1.02,
            maxWidth: 940,
          }}
        >
          Cinematic AI visuals that feel real.
        </div>
      </div>
    ),
    { ...size },
  );
}
