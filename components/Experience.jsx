"use client";

import CountUp from "./CountUp";
import Scribble from "./Scribble";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { site } from "@/lib/site";

const stats = [
  { value: <CountUp to={site.years} suffix="+" />, label: "Years doing stand-up" },
  { value: <CountUp to={site.shows} suffix="+" />, label: "Live shows" },
  { value: <CountUp to={site.instagram.followersK} suffix="K+" />, label: "Followers on Instagram" },
  { value: <span className="italic">Winner</span>, label: "Multiple college comedy shows" },
];

export default function Experience() {
  return (
    <section id="about" className="py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="01">About</SectionLabel>
          </Reveal>

          <div>
            <Reveal as="h2" className="max-w-[22ch] font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
              Five years on stage. Over two thousand shows.{" "}
              <span className="italic text-cream/45">And the whole room <Scribble>laughing</Scribble> by the end of it.</span>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 grid gap-6 text-lg leading-relaxed text-cream/65 md:grid-cols-2 md:gap-10">
              <p>
                Shadab Hussain has spent more than five years on stage, starting in the college circuit where he
                kept walking away with the top prize.
              </p>
              <p>
                Since then he has done over 2000 shows: wedding sangeets, corporate nights, college fests and
                comedy clubs. That much stage time teaches you to read a room, from the uncles at the back table
                to the friends who came only for the DJ.
                Today he takes bookings across Delhi NCR and nearby cities.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal as="dl" delay={0.1} amount={0.2} className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-cream/10 bg-cream/10 lg:mt-28 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-night p-6 transition-colors duration-500 hover:bg-surface sm:p-9">
              <dt className="eyebrow mt-4 leading-relaxed text-cream/50">{s.label}</dt>
              <dd className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-cream">{s.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
