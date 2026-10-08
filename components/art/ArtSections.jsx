"use client";

import { motion } from "framer-motion";
import BookingForm from "../BookingForm";
import YouTubeEmbed from "../YouTubeEmbed";
import CountUp from "../CountUp";
import { InkButton } from "./ArtHero";
import { blend, CurlyArrow, INK, Misprint, Sparkle, Squiggle, Tape } from "./Riso";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease, delay },
});

export function PageNote({ page, children }) {
  return (
    <p className="font-hand text-2xl text-accent">
      p. {page} <span className="text-ink/40">&mdash;</span> {children}
    </p>
  );
}

export function Heading({ children, className = "" }) {
  return (
    <motion.h2 {...reveal()} className={`font-poster text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-ink ${className}`}>
      {children}
    </motion.h2>
  );
}

/* ---------- Ticker ---------- */

const items = ["Weddings", "Sangeets", "Corporate nights", "College fests", "Private parties", "Comedy clubs"];

export function ArtTicker() {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 pr-8 font-poster text-3xl italic text-cream sm:text-4xl">
          {t}
          <span className="text-ember">✶</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Events Shadab performs at" className="relative z-10 -mx-4 -rotate-[1.5deg] overflow-hidden bg-riso py-4 shadow-[0_6px_0_rgba(27,26,31,0.15)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/* ---------- Backstory ---------- */

const stamps = [
  { top: <CountUp to={site.years} suffix="+" />, bottom: "Years on stage", ink: INK.orange, rotate: -8 },
  { top: <CountUp to={site.shows} suffix="+" />, bottom: "Live shows", ink: INK.blue, rotate: 6 },
  { top: <CountUp to={site.instagram.followersK} suffix="K+" />, bottom: "On Instagram", ink: INK.black, rotate: -4 },
  { top: "Winner", bottom: "College comedy", ink: INK.orange, rotate: 9 },
];

function Stamp({ top, bottom, ink, rotate, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.6, rotate: rotate - 12 }}
      whileInView={{ opacity: 0.92, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 380, damping: 18, delay: i * 0.15 }}
      className="mx-auto flex aspect-square w-36 flex-col items-center justify-center rounded-full border-[3px] text-center [filter:url(#rough)] sm:w-44"
      style={{ ...blend, borderColor: ink, color: ink, boxShadow: `inset 0 0 0 5px rgb(var(--paper)), inset 0 0 0 7px ${ink}` }}
    >
      <span className="font-poster text-3xl font-bold leading-none sm:text-4xl">{top}</span>
      <span className="mt-2 max-w-[7rem] font-mono text-[0.62rem] font-medium uppercase leading-tight tracking-[0.18em]">{bottom}</span>
    </motion.div>
  );
}

export function ArtAbout() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PageNote page="01">the backstory</PageNote>
        <Heading className="mt-4 max-w-[20ch]">
          Five years on stage. Over two thousand shows.{" "}
          <span className="italic text-riso">Every kind of crowd.</span>
        </Heading>

        <motion.div {...reveal(0.1)} className="mt-12 grid gap-8 text-lg leading-relaxed text-ink/75 md:grid-cols-2 md:gap-12">
          <p className="drop-cap">
            Shadab Hussain has spent more than five years on stage, starting in the college circuit where he kept
            walking away with the top prize.
          </p>
          <p>
            Since then he has done over 2000 shows: wedding sangeets, corporate nights, college fests and comedy
            clubs. That much stage time teaches you to read a room, from the uncles at the back table to the
            friends who came only for the DJ.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stamps.map((s, i) => (
            <Stamp key={s.bottom} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Watch ---------- */

export function ArtWatch({ page = "02", heading }) {
  return (
    <section id="watch" className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <PageNote page={page}>the evidence</PageNote>
            <Heading className="mt-4">
              {heading ?? (
                <>
                  Don&apos;t take <span className="italic">our</span> word for it.
                </>
              )}
            </Heading>
          </div>
          <a
            href={site.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-hand text-2xl text-ink underline decoration-ember decoration-wavy decoration-2 underline-offset-[7px] hover:text-accent"
          >
            more sets on YouTube &rarr;
          </a>
        </div>

        <motion.div {...reveal(0.1)} className="relative mt-14">
          <Tape className="-top-3 left-8 z-10 -rotate-6" />
          <Tape className="-top-3 right-8 z-10 rotate-[8deg]" />
          <div className="relative -rotate-[0.6deg] bg-ink p-2 shadow-[10px_12px_0_#FF5B35] sm:p-3">
            <YouTubeEmbed id={site.featuredVideo.id} title={site.featuredVideo.title} />
          </div>
          <div className="pointer-events-none absolute -bottom-20 right-4 hidden items-end gap-1 md:flex">
            <CurlyArrow className="h-14 w-24 -scale-y-100 rotate-[160deg]" color={INK.blue} inView />
            <p className="-rotate-3 font-hand text-2xl text-riso">press play. laugh. book him.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Follow ---------- */

function TornCard({ href, bg, text, rotate, delay, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      whileHover={{ rotate: 0, y: -8 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay }}
      className={`torn group relative block min-h-[18rem] px-8 pb-16 pt-9 sm:px-10 ${bg} ${text}`}
    >
      {children}
    </motion.a>
  );
}

export function ArtFollow() {
  return (
    <section id="follow" className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PageNote page="03">find him online</PageNote>
        <Heading className="mt-4">
          The jokes don&apos;t stop <span className="italic text-accent">after the show.</span>
        </Heading>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8">
          <TornCard href={site.instagram.url} bg="bg-ember" text="text-night" rotate={-2} delay={0}>
            <p className="font-mono text-xs uppercase tracking-[0.2em]">Instagram ✶ {site.instagram.handle}</p>
            <p className="mt-8 font-poster text-[clamp(3.25rem,7vw,5rem)] font-bold leading-none">
              <CountUp to={site.instagram.followersK} suffix="K+" />
            </p>
            <p className="mt-2 font-hand text-3xl">people already follow along</p>
            <span className="mt-6 inline-block border-b-2 border-night pb-0.5 font-medium transition-[padding] group-hover:pr-3">Follow &rarr;</span>
          </TornCard>
          <TornCard href={site.youtube.url} bg="bg-riso" text="text-cream" rotate={1.5} delay={0.12}>
            <p className="font-mono text-xs uppercase tracking-[0.2em]">YouTube ✶ {site.youtube.handle}</p>
            <p className="mt-8 font-poster text-[clamp(3.25rem,7vw,5rem)] font-bold italic leading-none">Full sets</p>
            <p className="mt-2 font-hand text-3xl">the whole thing, not just clips</p>
            <span className="mt-6 inline-block border-b-2 border-cream pb-0.5 font-medium transition-[padding] group-hover:pr-3">Subscribe &rarr;</span>
          </TornCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- Book ---------- */

const helpful = ["City and venue", "How many guests", "Set length", "Event date"];

export function ArtBook({ page = "04", city }) {
  return (
    <section id="book" className="border-t-2 border-dashed border-ink/20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <PageNote page={page}>the important bit</PageNote>
          <Heading className="mt-4">
            {city ? <>Book Shadab in {city.name}. </> : "Make your event "}
            <span className="italic text-riso">{city ? "Make it the one they talk about." : "the one they talk about."}</span>
          </Heading>
          <motion.p {...reveal(0.1)} className="mt-7 max-w-md text-lg leading-relaxed text-ink/75">
            Weddings, sangeets, corporate nights, college fests and birthdays{city ? ` in ${city.name}` : ""}. Share a
            few details and Shadab will get back to you about availability and fees.
          </motion.p>

          <motion.div {...reveal(0.15)} className="mt-10">
            <p className="font-hand text-2xl text-ink">helpful to mention:</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {helpful.map((h, i) => (
                <li
                  key={h}
                  className="rounded-full border-2 border-ink px-4 py-1.5 text-[0.95rem] text-ink"
                  style={{ transform: `rotate(${[-2, 1.5, -1, 2][i]}deg)` }}
                >
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...reveal(0.2)} className="mt-10">
            <p className="font-hand text-2xl text-ink/70">or just email:</p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Booking enquiry")}`}
              className="mt-1 inline-block break-all font-poster text-2xl font-semibold text-ink underline decoration-ember decoration-2 underline-offset-[6px] hover:text-accent"
            >
              {site.email}
            </a>
          </motion.div>
        </div>

        {/* Ticket */}
        <motion.div {...reveal(0.1)} className="relative self-start">
          <div className="relative rotate-[0.8deg] bg-night text-cream shadow-[10px_12px_0_rgb(var(--riso))] ring-1 ring-ink/15">
            <span aria-hidden className="absolute -left-4 top-[5.25rem] h-8 w-8 rounded-full bg-paper" />
            <span aria-hidden className="absolute -right-4 top-[5.25rem] h-8 w-8 rounded-full bg-paper" />
            <div className="flex items-end justify-between border-b-2 border-dashed border-cream/25 px-7 pb-5 pt-7 sm:px-10">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cream/55">Admit</p>
                <p className="mt-1 font-poster text-3xl font-semibold italic">all your guests</p>
              </div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ember">No. {site.shows + 1}</p>
            </div>
            <div className="px-7 pb-9 pt-8 sm:px-10">
              <BookingForm idPrefix="art" defaultCity={city?.name} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function ArtFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t-2 border-ink pb-10 pt-20">
      <Sparkle className="absolute left-[10%] top-16 h-8 w-8" color={INK.orange} />
      <Sparkle className="absolute right-[12%] top-28 h-6 w-6 rotate-12" />
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p className="font-poster text-[clamp(2.5rem,6vw,4.5rem)] font-semibold italic leading-none">
          <Misprint>You&apos;ve been great.</Misprint>
        </p>
        <p className="mt-3 -rotate-2 font-hand text-4xl text-accent">Thanks For Visiting!</p>
        <div className="mx-auto mt-4 w-48">
          <Squiggle className="h-4 w-full" color={INK.blue} />
        </div>
        <div className="mt-10">
          <InkButton />
        </div>
        <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-ink/75">
          <li><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Instagram</a></li>
          <li><a href={site.youtube.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">YouTube</a></li>
          <li><a href={`mailto:${site.email}`} className="hover:text-accent">Email</a></li>
          <li><a href="#top" className="hover:text-accent">Back to top ↑</a></li>
        </ul>
        <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/45">
          © {year} {site.name} ✶ printed in orange, blue &amp; black
        </p>
      </div>
    </footer>
  );
}
