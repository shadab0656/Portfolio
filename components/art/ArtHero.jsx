"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBooking } from "../Providers";
import DoodleCanvas from "./DoodleCanvas";
import {
  blend,
  Circled,
  CurlyArrow,
  INK,
  Misprint,
  RisoPhoto,
  Sparkle,
  Squiggle,
  Tape,
} from "./Riso";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export function InkButton({
  children = "Book for Wedding Party / Event",
  className = "",
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={open}
      className={`rounded-full border-2 border-ink bg-ink px-6 py-3.5 font-medium text-paper shadow-[4px_4px_0_#FF5B35] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#FF5B35] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_#FF5B35] ${className}`}
    >
      {children}
    </button>
  );
}

export function ArtHeader() {
  const links = [
    ["#about", "Backstory"],
    ["#watch", "Watch"],
    ["#follow", "Follow"],
    ["#book", "Book"],
  ];
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      <a href="#top" className="font-hand text-3xl leading-none text-ink">
        Shadab<span className="text-ember">!</span>
      </a>
      <nav aria-label="Main" className="flex items-center gap-6">
        <ul className="hidden items-center gap-7 md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-[0.95rem] text-ink/75 underline decoration-transparent decoration-wavy decoration-2 underline-offset-[6px] transition-colors hover:text-ink hover:[text-decoration-color:#FF5B35]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <InkButton className="!px-4 !py-2 text-sm">Book a show</InkButton>
      </nav>
    </header>
  );
}

function Starburst() {
  const spikes = 18;
  const points = Array.from({ length: spikes * 2 }, (_, i) => {
    const r = i % 2 ? 40 : 50;
    const a = (Math.PI * i) / spikes;
    return `${(50 + r * Math.sin(a)).toFixed(2)},${(50 - r * Math.cos(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <motion.div
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: -12 }}
      transition={{ type: "spring", stiffness: 220, damping: 12, delay: 1.2 }}
      className="absolute -right-4 -top-8 z-20 h-28 w-28 sm:-right-10 sm:h-32 sm:w-32"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        style={blend}
        aria-hidden
      >
        <polygon points={points} fill={INK.orange} />
      </svg>
      <p className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none text-night">
        <span className="font-poster text-2xl font-semibold sm:text-3xl">
          {site.shows}+
        </span>
        <span className="mt-1 font-hand text-lg sm:text-xl">shows!</span>
      </p>
    </motion.div>
  );
}
export function BookingStrips() {
  return (
    <div className="border-y-2 border-ink">
      <p className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink sm:px-8">
        <span>Live stand-up</span>
        <span className="hidden sm:inline">
          Weddings ✶ Corporate ✶ Colleges ✶ Parties
        </span>
        <span className="text-accent">Now booking</span>
      </p>
    </div>
  );
}
export default function ArtHero() {
  const [drawn, setDrawn] = useState(false);
  const [clearSignal, setClearSignal] = useState(0);

  return (
    <section id="top" className="relative overflow-hidden pb-24">
      <ArtHeader />

      {/* Poster strip */}
      <BookingStrips />

      <Sparkle className="absolute left-[6%] top-[38%] hidden h-8 w-8 rotate-12 lg:block" />
      <Sparkle
        className="absolute bottom-[12%] left-[46%] hidden h-6 w-6 lg:block"
        color={INK.orange}
      />

      <div className="mx-auto mt-14 grid max-w-6xl items-center gap-20 px-5 sm:px-8 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <motion.p
            {...fadeUp(0.2)}
            className="-rotate-2 font-hand text-2xl text-accent sm:text-3xl"
          >
            presenting, for your next event&hellip;
          </motion.p>

          <motion.h1
            {...fadeUp(0.3)}
            className="mt-3 font-poster text-[clamp(3rem,7.5vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.02em]"
          >
            <Misprint>Shadab</Misprint>
            <br />
            <Misprint className="italic">Hussain</Misprint>
          </motion.h1>

          <motion.div {...fadeUp(0.45)} className="relative mt-3 w-60">
            <Squiggle className="h-4 w-full" delay={0.9} inView={false} />
          </motion.div>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-6 max-w-md font-poster text-xl leading-relaxed text-ink/80 sm:text-2xl"
          >
            {site.tagline}
          </motion.p>

          <motion.ul
            {...fadeUp(0.7)}
            className="mt-9 flex flex-wrap gap-x-9 gap-y-5 text-ink"
          >
            <li className="font-hand text-2xl">
              <Circled delay={1.3}>
                <strong className="font-poster text-2xl font-semibold">
                  {site.years}+
                </strong>
              </Circled>{" "}
              years on stage
            </li>
            <li className="font-hand text-2xl">
              <Circled delay={1.6} color={INK.blue}>
                <strong className="font-poster text-2xl font-semibold">
                  {site.instagram.followersK}K+
                </strong>
              </Circled>{" "}
              followers
            </li>
          </motion.ul>

          <motion.div
            {...fadeUp(0.85)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <InkButton />
            <a
              href="#watch"
              className="font-hand text-2xl text-ink underline decoration-riso decoration-wavy decoration-2 underline-offset-[7px] hover:text-riso"
            >
              or watch a set first
            </a>
          </motion.div>
        </div>

        {/* The poster */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 7 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem]"
        >
          <Tape className="-left-6 top-3 z-10 -rotate-[30deg]" />
          <Tape className="-right-6 top-3 z-10 rotate-[32deg]" />
          <div className="relative border-2 border-ink bg-frame p-3 shadow-[10px_12px_0_rgb(var(--ink)/0.12)]">
            <div className="relative aspect-[4/5]">
              <RisoPhoto
                src="/profile.jpg"
                alt="Shadab Hussain, stand-up comedian"
                className="absolute inset-0"
              />
              <DoodleCanvas
                onDraw={() => setDrawn(true)}
                clearSignal={clearSignal}
              />
            </div>
            <p className="flex items-center justify-between px-1 pb-1 pt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/70">
              <span>Shadab Hussain</span>
              <span>Live</span>
            </p>
          </div>
          <Starburst />

          <div className="absolute inset-x-0 top-full mt-4 flex items-start justify-between gap-4">
            <div className="pointer-events-none flex items-start gap-1">
              <CurlyArrow
                className="h-11 w-16 shrink-0 -scale-x-100 rotate-[200deg]"
                color={INK.blue}
                delay={1.6}
              />
              <p className="mt-3 -rotate-3 font-hand text-[1.4rem] leading-tight text-riso">
                {drawn
                  ? "a masterpiece. honestly."
                  : "go on, draw him a moustache"}
              </p>
            </div>
            {drawn && (
              <button
                type="button"
                onClick={() => {
                  setClearSignal((n) => n + 1);
                  setDrawn(false);
                }}
                className="mt-3 shrink-0 font-hand text-xl text-ink underline decoration-ember decoration-2 underline-offset-4 hover:text-accent"
              >
                start over
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
