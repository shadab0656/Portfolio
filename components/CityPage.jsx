import ArtNavbar from "./art/ArtNavbar";
import ArtShell from "./art/ArtShell";
import { ArtCityAreas, ArtCityEvents, ArtFaq, ArtPageHero } from "./art/ArtCity";
import { ArtBook, ArtFooter, ArtTicker, ArtWatch } from "./art/ArtSections";
import { RoughFilter } from "./art/Riso";
import { site } from "@/lib/site";

const cityLinks = [
  ["#events", "Events"],
  ["#watch", "Watch"],
  ["#faq", "FAQ"],
  ["#book", "Book"],
];

export default function CityPage({ city, faq, crumbs }) {
  return (
    <ArtShell tone="dark">
      <RoughFilter />
      <ArtNavbar links={cityLinks} logoHref="/" city={city.name} />
      <main>
        <ArtPageHero
          crumbs={crumbs}
          note={`now booking in ${city.name}…`}
          title={city.headline}
          intro={city.intro}
          city={city}
          cta={`Book Shadab in ${city.name}`}
          photoAlt={`${site.name}, stand-up comedian, available for events in ${city.name}`}
        />
        <ArtTicker />
        <ArtCityEvents city={city} page="01" />
        <ArtWatch
          page="02"
          heading={
            <>
              See what your {city.name} guests <span className="italic">are in for.</span>
            </>
          }
        />
        <ArtCityAreas city={city} page="03" />
        <ArtFaq
          page="04"
          title={
            <>
              Booking in {city.name}? <span className="italic text-riso">Read this first.</span>
            </>
          }
          items={faq}
        />
        <ArtBook page="05" city={city} />
      </main>
      <ArtFooter />
    </ArtShell>
  );
}
