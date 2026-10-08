import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import BookButton, { Arrow } from "./BookButton";
import VideoShowcase from "./VideoShowcase";
import Faq from "./Faq";
import BookingSection from "./BookingSection";
import { cities, cityPath } from "@/lib/cities";
import { site } from "@/lib/site";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow text-cream/45">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map(([name, href], i) => (
          <li key={href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < items.length - 1 ? (
              <Link href={href} className="transition-colors hover:text-ember">{name}</Link>
            ) : (
              <span aria-current="page" className="text-cream/75">{name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CityHero({ city, crumbs }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-36">
      <div aria-hidden className="beam pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[48rem] w-[34rem] sm:right-[4%]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          <Breadcrumbs items={crumbs} />
          <div className="neon-tube mt-8 inline-flex rounded-full px-4 py-1">
            <span className="neon font-serif text-lg italic">Now booking in {city.name}</span>
          </div>
          <h1 className="mt-6 font-serif text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.02] tracking-[-0.02em]">
            {city.headline}
          </h1>
          {city.intro.map((p) => (
            <p key={p.slice(0, 24)} className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              {p}
            </p>
          ))}
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <BookButton city={city.name}>Book Shadab in {city.name}</BookButton>
            <a href="#watch" className="border-b border-cream/30 pb-1 text-cream transition-colors hover:border-ember hover:text-ember">
              Watch a set first
            </a>
          </div>
          <dl className="mt-12 flex max-w-md divide-x divide-cream/10 border-t border-cream/10 pt-6">
            {[
              [`${site.years}+`, "Years on stage"],
              [`${site.shows.toLocaleString("en-IN")}+`, "Live shows"],
              [`${site.instagram.followersK}K+`, "Followers"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-1 flex-col-reverse px-5 first:pl-0">
                <dt className="eyebrow mt-1 text-cream/45">{label}</dt>
                <dd className="font-serif text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[1.5rem] rounded-t-full border border-cream/15 bg-surface shadow-[0_40px_120px_-30px_rgba(255,120,70,0.45)]">
            <Image
              src="/profile.jpg"
              alt={`${site.name}, stand-up comedian, available for events in ${city.name}`}
              fill
              priority
              sizes="(min-width: 640px) 304px, 272px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CityEvents({ city }) {
  return (
    <section id="events" className="border-t border-cream/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="01">Events</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
            Comedy for every kind of <span className="italic">{city.name} event.</span>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-cream/10 bg-cream/10 md:grid-cols-3">
          {city.events.map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.08} className="bg-night p-7 sm:p-9">
              <span className="font-mono text-xs text-ember">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-3xl leading-tight">{title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-cream/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["Send the details", "Event type, city, date and anything about the audience, through the form or by email."],
  ["Get a reply", "Shadab confirms availability and shares the fee for your date and set length."],
  ["Lock the date", "Agree the slot in your event's schedule, and the set gets planned around your crowd."],
];

function CityAreas({ city }) {
  const others = cities.filter((c) => c.slug !== city.slug);
  return (
    <section id="areas" className="border-t border-cream/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="03">Areas</SectionLabel>
          </Reveal>
          <div>
            <Reveal as="h2" className="font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
              Across {city.name}, <span className="italic text-cream/45">and how booking works.</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="eyebrow mt-10 text-cream/50">Areas covered in {city.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {city.areas.map((a) => (
                  <li key={a} className="rounded-full border border-cream/15 px-4 py-2 text-cream/80">{a}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} as="ol" className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-cream/10 bg-cream/10 md:grid-cols-3">
              {steps.map(([title, text], i) => (
                <li key={title} className="bg-night p-7">
                  <span className="font-mono text-xs text-ember">Step {i + 1}</span>
                  <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/65">{text}</p>
                </li>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="eyebrow mt-14 text-cream/50">Also booking in</h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link href={cityPath(c)} className="group inline-flex items-center gap-1.5 text-lg text-cream/80 transition-colors hover:text-ember">
                      Comedian in {c.name}
                      <Arrow className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CityPage({ city, faq, crumbs }) {
  return (
    <>
      <Navbar />
      <main>
        <CityHero city={city} crumbs={crumbs} />
        <CityEvents city={city} />
        <VideoShowcase
          index="02"
          heading={
            <>
              See what your {city.name} guests <span className="italic">are in for.</span>
            </>
          }
        />
        <CityAreas city={city} />
        <Faq
          index="04"
          title={
            <>
              Booking in {city.name}: <span className="italic text-cream/45">your questions.</span>
            </>
          }
          items={faq}
        />
        <BookingSection index="05" city={city} />
      </main>
      <Footer />
    </>
  );
}
