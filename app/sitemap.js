import { cities, cityPath } from "@/lib/cities";
import { site } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/book-comedian`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...cities.map((c) => ({
      url: `${site.url}${cityPath(c)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: c.group === "ncr" ? 0.8 : 0.7,
    })),
  ];
}
