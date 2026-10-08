import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0C0B" }}>
        <span style={{ fontSize: 120, fontStyle: "italic", color: "#F3EEE4", fontFamily: "serif" }}>S</span>
        <span style={{ width: 22, height: 22, borderRadius: 11, background: "#FF5B35", marginLeft: 4, marginTop: 64 }} />
      </div>
    ),
    size
  );
}
