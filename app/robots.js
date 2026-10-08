import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // API endpoints and the draft poster designs shouldn't show up in search
        disallow: ["/api/", "/art", "/art-dark"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
