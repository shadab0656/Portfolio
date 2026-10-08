"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { InkButton } from "./ArtHero";
import { Heading, PageNote } from "./ArtSections";
import { Circled, CurlyArrow, INK, Misprint, RisoPhoto, Sparkle, Squiggle, Tape } from "./Riso";
import { cities, cityPath } from "@/lib/cities";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease, delay },
});
const tilt = [-1.5, 1, -0.5, 1.5, -1, 0.5];

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/55">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map(([name, href], i) => (
          <li key={href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-ember">✶</span>}
            {i < items.length - 1 ? (
              <Link href={href} className="transition-colors hover:text-accent">{name}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Shared poster hero for /book-comedian and every city page
export function ArtPageHero({ crumbs, note, title, intro, city, photoAlt, cta = "Book a show" }) {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
      <Sparkle className="absolute left-[4%] top-[42%] hidden h-8 w-8 rotate-12 lg:block" />
      <Sparkle className="absolute bottom-[10%] left-[48%] hidden h-6 w-6 lg:block" color={INK.orange} />

      <div className="mx-auto grid max-w-6xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <Breadcrumbs items={crumbs} />
          <motion.p {...fadeUp(0.15)} className="mt-8 -rotate-2 font-hand text-2xl text-accent sm:text-3xl">
            {note}
          </motion.p>
          <motion.h1
            {...fadeUp(0.25)}
            className="mt-3 font-poster text-[clamp(2.3rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em]"
          >
            {title}
          </motion.h1>
          <motion.div {...fadeUp(0.4)} className="mt-4 w-52">
            <Squiggle className="h-4 w-full" delay={0.8} inView={false} />
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink/75">
            {intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </motion.div>

          <motion.ul {...fadeUp(0.6)} className="mt-8 flex flex-wrap gap-x-9 gap-y-5 text-ink">
            <li className="font-hand text-2xl">
              <Circled delay={1.2}>
                <strong className="font-poster text-2xl font-semibold">{site.years}+</strong>
              </Circled>{" "}
              years on mic
            </li>
            <li className="font-hand text-2xl">
              <Circled delay={1.5} color={INK.blue}>
                <strong className="font-poster text-2xl font-semibold">{site.shows.toLocaleString("en-IN")}+</strong>
              </Circled>{" "}
              rooms cracked
            </li>
          </motion.ul>

          <motion.div {...fadeUp(0.75)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <InkButton city={city?.name}>{cta}</InkButton>
            <a
              href="#watch"
              className="font-hand text-2xl text-ink underline decoration-riso decoration-wavy decoration-2 underline-offset-[7px] hover:text-riso"
            >
              or watch a set first
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 7 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="relative mx-auto w-full max-w-[18rem] sm:max-w-[21rem]"
        >
          <Tape className="-left-6 top-3 z-10 -rotate-[30deg]" />
          <Tape className="-right-6 top-3 z-10 rotate-[32deg]" />
          <div className="relative border-2 border-ink bg-frame p-3 shadow-[10px_12px_0_rgb(var(--ink)/0.12)]">
            <div className="relative aspect-[4/5]">
              <RisoPhoto src="/profile.jpeg" alt={photoAlt} className="absolute inset-0" />
            </div>
            <p className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/70">
              <span>{site.name}</span>
              <span className="text-accent">{city ? `Live in ${city.name}` : "Live"}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ArtCityEvents({ city, page = "01" }) {
  return (
    <section id="events" className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PageNote page={page}>what&apos;s on</PageNote>
        <Heading className="mt-4 max-w-[22ch]">
          Comedy for every kind of <span className="italic text-riso">{city.name} event.</span>
        </Heading>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {city.events.map(([title, text], i) => (
            <motion.div
              key={title}
              {...reveal(i * 0.08)}
              className="border-2 border-ink bg-frame p-7 shadow-[6px_6px_0_#FF5B35]"
              style={{ rotate: `${tilt[i % tilt.length]}deg` }}
            >
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-poster text-2xl font-semibold leading-tight text-ink">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{text}</p>
            </motion.div>
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

export function ArtCityAreas({ city, page = "03" }) {
  const others = cities.filter((c) => c.slug !== city.slug);
  return (
    <section id="areas" className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PageNote page={page}>where &amp; how</PageNote>
        <Heading className="mt-4 max-w-[22ch]">
          All over {city.name}, <span className="italic text-accent">and how booking works.</span>
        </Heading>

        <motion.div {...reveal(0.1)} className="mt-12">
          <h3 className="font-hand text-2xl text-ink">areas covered in {city.name}:</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {city.areas.map((a, i) => (
              <li
                key={a}
                className="rounded-full border-2 border-ink px-4 py-1.5 text-[0.95rem] text-ink"
                style={{ transform: `rotate(${tilt[i % tilt.length]}deg)` }}
              >
                {a}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.ol {...reveal(0.15)} className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className="font-poster text-5xl font-bold italic leading-none">
                <Misprint>{i + 1}</Misprint>
              </span>
              <h3 className="mt-3 font-poster text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{text}</p>
            </li>
          ))}
          <CurlyArrow className="pointer-events-none absolute -top-10 left-[22%] hidden h-12 w-20 md:block" color={INK.blue} inView />
          <CurlyArrow className="pointer-events-none absolute -top-10 left-[56%] hidden h-12 w-20 md:block" color={INK.orange} inView delay={1.1} />
        </motion.ol>

        <motion.div {...reveal(0.1)} className="mt-16">
          <h3 className="font-hand text-2xl text-ink/70">also booking in:</h3>
          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={cityPath(c)}
                  className="text-lg text-ink/80 underline decoration-transparent decoration-wavy decoration-2 underline-offset-[6px] transition-colors hover:text-ink hover:[text-decoration-color:#FF5B35]"
                >
                  Comedian in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// Native <details> keeps every answer in the HTML for search engines and works without JavaScript
export function ArtFaq({ page, title, items }) {
  return (
    <section id="faq" className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PageNote page={page}>questions, answered</PageNote>
        <Heading className="mt-4 max-w-[22ch]">{title}</Heading>
        <motion.div {...reveal(0.1)} className="mt-12 border-t-2 border-ink">
          {items.map(([q, a]) => (
            <details key={q} className="group border-b-2 border-dashed border-ink/25">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-lg text-ink transition-colors hover:text-accent sm:text-xl [&::-webkit-details-marker]:hidden">
                <h3 className="font-poster font-semibold">{q}</h3>
                <span
                  aria-hidden
                  className="mt-0.5 font-hand text-3xl leading-none text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-7 pr-12 text-lg leading-relaxed text-ink/70">{a}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// City cards for /book-comedian, pinned to the page like flyers
export function ArtCityGrid({ id, page, note, heading, list }) {
  return (
    <section id={id} className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PageNote page={page}>{note}</PageNote>
        <Heading className="mt-4 max-w-[22ch]">{heading}</Heading>
        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <motion.li key={c.slug} {...reveal((i % 3) * 0.06)} style={{ rotate: `${tilt[i % tilt.length]}deg` }}>
              <Link
                href={cityPath(c)}
                className="group flex h-full flex-col justify-between gap-6 border-2 border-ink bg-frame p-7 shadow-[6px_6px_0_rgb(var(--riso))] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_#FF5B35]"
              >
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/55">{c.state}</p>
                  <h3 className="mt-3 font-poster text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
                    Comedian in {c.name}
                    {c.alt && <span className="ml-2 font-sans text-base font-normal text-ink/50">({c.alt})</span>}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{c.intro[0]}</p>
                </div>
                <span className="font-hand text-xl text-ink underline decoration-ember decoration-wavy decoration-2 underline-offset-[6px]">
                  book in {c.name} &rarr;
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
