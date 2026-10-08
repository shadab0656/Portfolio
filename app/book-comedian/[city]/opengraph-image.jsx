import { ogSize, renderOg } from "@/lib/ogImage";
import { cities, getCity } from "@/lib/cities";
import { site } from "@/lib/site";

export const alt = `${site.name}, stand-up comedian available for events`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export default async function Image({ params }) {
  const city = getCity((await params).city);
  return renderOg({
    kicker: `Now booking in ${city.name}`,
    title: `Stand-up comedian in ${city.name}`,
    line: `Book ${site.name} for weddings, sangeets, corporate events and college fests`,
  });
}
