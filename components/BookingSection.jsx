"use client";

import BookingForm from "./BookingForm";
import Scribble from "./Scribble";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { site } from "@/lib/site";

const helpful = ["City and venue", "How many guests you expect", "How long you'd like the set to be", "Your event date"];

export default function BookingSection({ index = "06", city }) {
  return (
    <section id="book" className="rounded-t-[2rem] bg-cream py-24 text-night sm:rounded-t-[3rem] sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel index={index} tone="light">Book</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="mt-8 font-serif text-[clamp(2.1rem,4.4vw,3.75rem)] leading-[1.05] tracking-[-0.02em]">
            {city ? (
              <>
                Book Shadab in {city.name}. <span className="italic">Make it the one they <Scribble>talk about.</Scribble></span>
              </>
            ) : (
              <>
                Make your event <span className="italic">the one they <Scribble>talk about.</Scribble></span>
              </>
            )}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-[32rem] text-lg leading-relaxed text-night/70">
            Weddings, sangeets, corporate nights, college fests and birthdays{city ? ` in ${city.name}` : " across Delhi NCR and nearby cities"}.
            Share a few details and Shadab will get back to you about availability and fees.
          </Reveal>

          <Reveal delay={0.15} className="mt-12 max-w-[32rem]">
            <p className="eyebrow text-night/50">Helpful to mention</p>
            <ol className="mt-4">
              {helpful.map((h, i) => (
                <li key={h} className="flex items-baseline gap-6 border-t border-night/10 py-4 text-lg last:border-b">
                  <span className="font-mono text-xs text-emberdeep">0{i + 1}</span>
                  {h}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <p className="eyebrow text-night/50">Prefer email?</p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Booking enquiry")}`}
              className="mt-2 inline-block break-all font-serif text-3xl text-night underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-emberdeep"
            >
              {site.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={48} amount={0.15} className="relative self-start rounded-[1.75rem] bg-night p-6 text-cream shadow-[0_40px_80px_-30px_rgba(13,12,11,0.55)] sm:p-10 lg:sticky lg:top-28">
          <div className="mb-8 flex items-center justify-between border-b border-cream/10 pb-5">
            <p className="eyebrow text-cream/60">Booking request</p>
            <p className="eyebrow text-cream/40">No payment needed now</p>
          </div>
          <BookingForm idPrefix="section" defaultCity={city?.name} />
        </Reveal>
      </div>
    </section>
  );
}
