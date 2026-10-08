import { Fraunces, Caveat } from "next/font/google";

const poster = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-poster",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
  display: "swap",
});

// Wraps the poster design. tone="dark" swaps cream paper for black stock (see .art-dark in globals.css).
export default function ArtShell({ tone = "light", children }) {
  return (
    <div className={`${poster.variable} ${hand.variable} ${tone === "dark" ? "art-dark" : ""} min-h-screen overflow-x-hidden bg-paper text-ink`}>
      {children}
    </div>
  );
}
