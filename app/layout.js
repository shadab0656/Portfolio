import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { site } from "@/lib/site";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const description = `Book stand-up comedian ${site.name} for weddings, sangeets, corporate events and college fests in Delhi, Gurugram, Noida and across Delhi NCR. ${site.years}+ years on stage, ${site.shows}+ live shows.`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Stand-up Comedian for Weddings & Corporate Events in Delhi NCR`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "entertainment",
  keywords: [
    "stand-up comedian Delhi",
    "comedian for wedding Delhi NCR",
    "book comedian for corporate event Gurugram",
    "stand-up comedian Noida",
    "comedian for sangeet",
    "hire comedian for college fest",
    "comedy show booking Delhi NCR",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Stand-up Comedian in Delhi NCR`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Stand-up Comedian in Delhi NCR`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Paste the code from Google Search Console / Bing Webmaster Tools into these env vars to verify ownership
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#0D0C0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-night font-sans text-cream antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
