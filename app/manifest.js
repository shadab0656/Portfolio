import { site } from "@/lib/site";

export default function manifest() {
  return {
    name: `${site.name} | Stand-up Comedian`,
    short_name: site.name,
    description: "Book stand-up comedian Shadab Hussain for weddings, corporate events and college fests in Delhi NCR.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0C0B",
    theme_color: "#0D0C0B",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
