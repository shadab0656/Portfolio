import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import JsonLd from "@/components/JsonLd";
import { cities, cityFaq, cityPath, getCity } from "@/lib/cities";
import { bookingService, breadcrumbs, cityUrl, faqPage, graph, person } from "@/lib/schema";
import { site } from "@/lib/site";

// Only the cities listed in lib/cities.js exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const city = getCity((await params).city);
  if (!city) return {};
  const where = city.alt ? `${city.name} (${city.alt})` : city.name;
  const title = `Stand-up Comedian in ${where} for Weddings & Events`;
  const description = `Book ${site.name}, stand-up comedian with ${site.shows}+ shows, for weddings, sangeets, corporate events and college fests in ${city.name}. Covering ${city.areas.slice(0, 3).join(", ")} and more. Check availability online.`;
  return {
    title,
    description,
    alternates: { canonical: cityPath(city) },
    openGraph: { type: "website", locale: "en_IN", url: cityPath(city), siteName: site.name, title: `${title} | ${site.name}`, description },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export default async function Page({ params }) {
  const city = getCity((await params).city);
  if (!city) notFound();

  const faq = cityFaq(city);
  const crumbs = [
    ["Home", "/"],
    ["Book a comedian", "/book-comedian"],
    [city.name, cityPath(city)],
  ];

  return (
    <>
      <JsonLd
        data={graph(
          person,
          { ...bookingService([city]), "@id": `${cityUrl(city)}#booking`, url: cityUrl(city), name: `Book stand-up comedian ${site.name} in ${city.name}` },
          faqPage(faq, cityUrl(city)),
          breadcrumbs(crumbs)
        )}
      />
      <CityPage city={city} faq={faq} crumbs={crumbs} />
    </>
  );
}
