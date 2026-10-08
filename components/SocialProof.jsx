"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";
import Scribble from "./Scribble";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { Arrow } from "./BookButton";
import { site } from "@/lib/site";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9L15.5 12z" />
    </svg>
  );
}

function Card({ href, icon, platform, delay, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className="group relative isolate flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-cream/10 bg-surface p-7 transition-colors duration-500 hover:border-ember/50 sm:min-h-[22rem] sm:p-10"
    >
      <span aria-hidden className="absolute -bottom-32 -right-32 -z-10 h-80 w-80 rounded-full bg-ember/25 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <span className="flex items-center gap-3 text-cream/70">
          {icon}
          <span className="eyebrow">{platform}</span>
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-night">
          <Arrow className="h-5 w-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </div>
      <div className="mt-12">{children}</div>
    </motion.a>
  );
}

export default function SocialProof() {
  return (
    <section id="follow" className="border-t border-cream/10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="03">Follow</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
            The jokes don&apos;t stop <span className="italic">after the <Scribble>show.</Scribble></span>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Card href={site.instagram.url} platform="Instagram" icon={<InstagramIcon className="h-6 w-6" />} delay={0}>
            <p className="font-serif text-[clamp(3.25rem,7vw,5.25rem)] leading-[0.9]">
              <CountUp to={site.instagram.followersK} suffix="K+" />
            </p>
            <p className="mt-4 text-lg text-cream/65">
              people follow <span className="text-cream">{site.instagram.handle}</span>
            </p>
          </Card>

          <Card href={site.youtube.url} platform="YouTube" icon={<YouTubeIcon className="h-6 w-6" />} delay={0.1}>
            <p className="font-serif text-[clamp(3.25rem,7vw,5.25rem)] italic leading-[0.9]">Full sets</p>
            <p className="mt-4 text-lg text-cream/65">
              subscribe to <span className="text-cream">{site.youtube.handle}</span>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
