import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import BookButton, { Arrow } from "@/components/BookButton";
import BookingSection from "@/components/BookingSection";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/CityPage";
import { cityPath, nearbyCities, ncrCities } from "@/lib/cities";
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

function CityCard({ city, i }) {
  return (
    <Reveal delay={(i % 3) * 0.06} as="li">
      <Link
        href={cityPath(city)}
        className="group flex h-full flex-col justify-between gap-8 bg-night p-7 transition-colors duration-500 hover:bg-surface sm:p-8"
      >
        <div>
          <p className="eyebrow text-cream/45">{city.state}</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight transition-colors group-hover:text-ember">
            Comedian in {city.name}
            {city.alt && <span className="ml-2 font-sans text-base text-cream/40">({city.alt})</span>}
          </h3>
          <p className="mt-3 leading-relaxed text-cream/60">{city.intro[0]}</p>
        </div>
        <span className="eyebrow flex items-center gap-2 text-cream/60 group-hover:text-ember">
          Book in {city.name}
          <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </span>
      </Link>
    </Reveal>
  );
}

function CityGrid({ index, label, heading, list }) {
  return (
    <section className="border-t border-cream/10 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index={index}>{label}</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
            {heading}
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-cream/10 bg-cream/10 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <CityCard key={c.slug} city={c} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function BookComedianPage() {
  const all = [...ncrCities, ...nearbyCities];
  return (
    <>
      <JsonLd
        data={graph(person, bookingService(), breadcrumbs(crumbs), {
          "@type": "ItemList",
          name: "Cities where you can book Shadab Hussain",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: cityUrl(c) })),
        })}
      />
      <Navbar />
      <main>
        <section id="top" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-36">
          <div aria-hidden className="beam pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[48rem] w-[34rem] sm:right-[8%]" />
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-8 max-w-4xl font-serif text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.02] tracking-[-0.02em]">
              Book a stand-up comedian in <span className="italic">Delhi NCR</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              {site.name} has done {site.shows}+ live shows over {site.years}+ years: wedding sangeets, corporate nights,
              college fests and comedy clubs. He takes bookings across Delhi, Gurugram, Noida, Greater Noida, Ghaziabad and
              Faridabad, and travels to nearby cities like Meerut, Sonipat, Panipat, Jaipur and Chandigarh.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <BookButton>Check availability</BookButton>
              <Link href="/#watch" className="border-b border-cream/30 pb-1 text-cream transition-colors hover:border-ember hover:text-ember">
                Watch a set first
              </Link>
            </div>
          </div>
        </section>

        <CityGrid index="01" label="Delhi NCR" heading={<>Every corner of <span className="italic">Delhi NCR.</span></>} list={ncrCities} />
        <CityGrid index="02" label="Nearby" heading={<>And the cities <span className="italic text-cream/45">a short trip away.</span></>} list={nearbyCities} />
        <BookingSection index="03" />
      </main>
      <Footer />
    </>
  );
}
