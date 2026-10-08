import ArtNavbar from "@/components/art/ArtNavbar";
import ArtShell from "@/components/art/ArtShell";
import { ArtCityGrid, ArtPageHero } from "@/components/art/ArtCity";
import { ArtBook, ArtFooter, ArtTicker, ArtWatch } from "@/components/art/ArtSections";
import { RoughFilter } from "@/components/art/Riso";
import JsonLd from "@/components/JsonLd";
import { nearbyCities, ncrCities } from "@/lib/cities";
import { bookingService, breadcrumbs, cityUrl, graph, person } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "Book a Stand-up Comedian in Delhi NCR for Weddings & Corporate Events";
const description = `Hire stand-up comedian ${site.name} for weddings, sangeets, corporate events and college fests in Delhi, Gurugram, Noida, Greater Noida, Ghaziabad, Faridabad and nearby cities. ${site.shows}+ shows.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: "/book-comedian" },
  openGraph: { type: "website", locale: "en_IN", url: "/book-comedian", siteName: site.name, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const crumbs = [
  ["Home", "/"],
  ["Book a comedian", "/book-comedian"],
];

const links = [
  ["#ncr", "Delhi NCR"],
  ["#nearby", "Nearby"],
  ["#watch", "Watch"],
  ["#book", "Book"],
];

export default function BookComedianPage() {
  const all = [...ncrCities, ...nearbyCities];
  return (
    <ArtShell tone="dark">
      <JsonLd
        data={graph(person, bookingService(), breadcrumbs(crumbs), {
          "@type": "ItemList",
          name: "Cities where you can book Shadab Hussain",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: cityUrl(c) })),
        })}
      />
      <RoughFilter />
      <ArtNavbar links={links} logoHref="/" />
      <main>
        <ArtPageHero
          crumbs={crumbs}
          note="have mic, will travel…"
          title={
            <>
              Book a stand-up comedian in <span className="italic text-riso">Delhi NCR</span>
            </>
          }
          intro={[
            `${site.name} has done ${site.shows}+ live shows over ${site.years}+ years: wedding sangeets, corporate nights, college fests and comedy clubs.`,
            "He takes bookings across Delhi, Gurugram, Noida, Greater Noida, Ghaziabad and Faridabad, and travels to nearby cities like Meerut, Sonipat, Panipat, Jaipur and Chandigarh.",
          ]}
          cta="Check availability"
          photoAlt={`${site.name}, stand-up comedian, available for events across Delhi NCR`}
        />
        <ArtTicker />
        <ArtCityGrid
          id="ncr"
          page="01"
          note="the home turf"
          heading={
            <>
              Every corner of <span className="italic text-riso">Delhi NCR.</span>
            </>
          }
          list={ncrCities}
        />
        <ArtCityGrid
          id="nearby"
          page="02"
          note="worth the drive"
          heading={
            <>
              And the cities <span className="italic text-accent">a short trip away.</span>
            </>
          }
          list={nearbyCities}
        />
        <ArtWatch page="03" />
        <ArtBook page="04" />
      </main>
      <ArtFooter />
    </ArtShell>
  );
}
