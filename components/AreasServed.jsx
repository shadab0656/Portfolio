import Link from "next/link";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import Scribble from "./Scribble";
import { Arrow } from "./BookButton";
import { cityPath, nearbyCities, ncrCities } from "@/lib/cities";

function CityLink({ city, big }) {
  return (
    <li>
      <Link
        href={cityPath(city)}
        className={`group flex items-center justify-between gap-4 border-b border-cream/10 transition-colors hover:border-ember ${big ? "py-5" : "py-4"}`}
      >
        <span className={`font-serif ${big ? "text-3xl sm:text-4xl" : "text-2xl"} text-cream transition-colors group-hover:text-ember`}>
          {city.name}
          {city.alt && <span className="ml-2 font-sans text-sm text-cream/40">({city.alt})</span>}
        </span>
        <span className="eyebrow flex items-center gap-2 text-cream/40 transition-colors group-hover:text-ember">
          <span className="hidden sm:inline">Book in {city.name}</span>
          <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </span>
      </Link>
    </li>
  );
}

export default function AreasServed({ index = "04" }) {
  return (
    <section id="cities" className="border-t border-cream/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index={index}>Cities</SectionLabel>
          </Reveal>
          <div>
            <Reveal as="h2" className="max-w-[24ch] font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
              Booking across <Scribble>Delhi NCR</Scribble> <span className="italic text-cream/45">and the cities next door.</span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/65">
              Shadab performs at weddings, corporate events and college fests all over Delhi NCR, and travels to nearby
              cities for sangeets, destination weddings and fests. Pick your city for details, or{" "}
              <Link href="/book-comedian" className="text-cream underline decoration-ember underline-offset-4 hover:text-ember">
                see all locations
              </Link>
              .
            </Reveal>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
              <Reveal delay={0.1}>
                <h3 className="eyebrow text-cream/50">Delhi NCR</h3>
                <ul className="mt-3">
                  {ncrCities.map((c) => (
                    <CityLink key={c.slug} city={c} big />
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <h3 className="eyebrow text-cream/50">Nearby cities</h3>
                <ul className="mt-3">
                  {nearbyCities.map((c) => (
                    <CityLink key={c.slug} city={c} />
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
