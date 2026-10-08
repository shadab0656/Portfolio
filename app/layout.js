import { Fraunces, Caveat, Hind, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { site } from "@/lib/site";

// Fraunces is the headline face on every page (font-poster and font-serif both use it)
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

const sans = Hind({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: `${site.name} | Stand-up Comedian for Weddings & Events`,
  description: `${site.name} is a stand-up comedian with ${site.years}+ years on stage and ${site.shows}+ shows. Book him for weddings, sangeets, corporate events and college fests.`,
  openGraph: {
    title: `${site.name} | Stand-up Comedian`,
    description: site.tagline,
    images: ["/profile.jpeg"],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#131115",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poster.variable} ${hand.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
