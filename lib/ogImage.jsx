import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

// The preview card shown when the site is shared on WhatsApp, Instagram, LinkedIn, X, etc.
export async function renderOg({ kicker = "Stand-up comedian", title = site.name, line = "Book for weddings, corporate events & college fests across Delhi NCR" } = {}) {
  const photo = await readFile(join(process.cwd(), "public", "profile.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0D0C0B", color: "#F3EEE4" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#FF5B35" }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, background: "#FF5B35" }} />
            {kicker}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, lineHeight: 1.02, fontFamily: "serif", letterSpacing: -1 }}>{title}</div>
            <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.35, color: "rgba(243,238,228,0.75)", maxWidth: 620 }}>{line}</div>
          </div>
          <div style={{ display: "flex", gap: 36, fontSize: 26, color: "rgba(243,238,228,0.6)" }}>
            <span>{site.years}+ years</span>
            <span>{site.shows.toLocaleString("en-IN")}+ shows</span>
            <span>{site.instagram.followersK}K+ followers</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={src} width={420} height={630} style={{ objectFit: "cover", objectPosition: "center top" }} />
      </div>
    ),
    ogSize
  );
}
