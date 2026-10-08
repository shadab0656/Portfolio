"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import BookButton from "./BookButton";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1];
// Each crowd is a room that is famously hard to crack
const crowds = [
  "your strictest chacha",
  "the bride's nani",
  "the HR team, on record",
  "a hall full of backbenchers",
  "both sides of the shaadi",
  "even the DJ",
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

function RotatingCrowd() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % crowds.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.p {...fadeUp(0.5)} className="mt-5 font-poster text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.2] text-cream/85">
      <span className="sr-only">
        The comedian who makes your strictest chacha, the bride&apos;s nani, the HR team, a hall full of backbenchers
        and even the DJ laugh out loud.
      </span>
      <span aria-hidden>
        The comedian who makes
        <br />
        <span className="relative inline-flex overflow-hidden pb-[0.08em] align-bottom">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={crowds[i]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="italic text-ember"
            >
              {crowds[i]}
            </motion.span>
          </AnimatePresence>
        </span>
        <br />
        laugh out loud.
      </span>
    </motion.p>
  );
}

// A speech bubble from the crowd that pops in and bobs gently
function Bubble({ children, className, delay, rotate = 0, tail = "left", tone = "cream" }) {
  const colors = tone === "ember" ? "bg-ember text-night" : "bg-cream text-night";
  return (
    <div className={`absolute z-10 ${className}`} aria-hidden>
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: rotate * 4 }}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ type: "spring", stiffness: 260, damping: 13, delay }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
          className={`relative whitespace-nowrap rounded-2xl px-4 py-1.5 font-hand text-2xl font-bold shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6)] sm:text-2xl ${colors}`}
        >
          {children}
          <span className={`absolute -bottom-1.5 h-3.5 w-3.5 rotate-45 rounded-[2px] ${tone === "ember" ? "bg-ember" : "bg-cream"} ${tail === "left" ? "left-5" : "right-5"}`} />
        </motion.div>
      </motion.div>
    </div>
  );
}

const BARS = 16;

function ApplauseMeter() {
  return (
    <div className="absolute -bottom-8 -right-2 z-10 sm:-right-10">
      <motion.div
        {...fadeUp(1.8)}
        className="rounded-2xl border border-cream/10 bg-night/85 px-4 pb-3.5 pt-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md"
      >
        <p className="eyebrow flex justify-between gap-8 text-[0.6rem] text-cream/55">
          <span>Applause meter</span>
          <span className="text-ember">Peak</span>
        </p>
        <div className="mt-2.5 flex h-9 items-end gap-[3px]" aria-hidden>
          {Array.from({ length: BARS }, (_, i) => {
            const max = 0.3 + (i / (BARS - 1)) * 0.7;
            return (
              <motion.span
                key={i}
                className={`h-full w-[5px] origin-bottom rounded-full ${i >= BARS - 4 ? "bg-ember" : "bg-cream/80"}`}
                initial={{ scaleY: 0.15 }}
                animate={{ scaleY: [max * 0.35, max, max * 0.6, max * 0.95] }}
                transition={{ duration: 1.1 + (i % 4) * 0.18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 + i * 0.04 }}
              />
            );
          })}
        </div>
        <span className="sr-only">Applause meter at peak</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  // The spotlight follows the pointer and drifts back to Shadab when it leaves
  const mx = useMotionValue(-2000);
  const my = useMotionValue(-2000);
  const x = useSpring(mx, { stiffness: 60, damping: 18 });
  const y = useSpring(my, { stiffness: 60, damping: 18 });
  const mask = useMotionTemplate`radial-gradient(circle 360px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.6) 45%, #000 100%)`;
  const warm = useMotionTemplate`radial-gradient(circle 420px at ${x}px ${y}px, rgba(255, 186, 130, 0.14), transparent 70%)`;

  const home = useCallback(() => {
    const s = sectionRef.current?.getBoundingClientRect();
    const p = photoRef.current?.getBoundingClientRect();
    if (!s || !p) return;
    mx.set(p.left - s.left + p.width / 2);
    my.set(p.top - s.top + p.height * 0.4);
  }, [mx, my]);

  useEffect(() => {
    home();
    window.addEventListener("resize", home);
    return () => window.removeEventListener("resize", home);
  }, [home]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onMove}
      onMouseLeave={home}
      className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20"
    >
      {/* Stage: brick wall, darkness with a hole cut by the spotlight, warm light, floor fade */}
      <div aria-hidden className="bricks absolute inset-0 -z-30" />
      <motion.div aria-hidden style={{ WebkitMaskImage: mask, maskImage: mask }} className="absolute inset-0 -z-20 bg-night/[0.94]" />
      <motion.div aria-hidden style={{ background: warm }} className="pointer-events-none absolute inset-0 -z-20 mix-blend-screen" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-night" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="neon-tube neon-flicker inline-flex items-center gap-2.5 rounded-full px-5 py-1.5"
          >
            <span className="neon font-hand text-2xl font-bold">On stage tonight</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.35)}
            className="mt-7 font-poster text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
          >
            Shadab <span className="font-normal italic">Hussain</span>
            <span className="text-ember">.</span>
          </motion.h1>

          <RotatingCrowd />

          <motion.p {...fadeUp(0.65)} className="mt-6 max-w-md text-lg leading-relaxed text-cream/65">
            Live stand-up for weddings, corporate nights and college fests across {site.region}. Clean enough for nani,
            sharp enough for the cousins, and wrapped up before the food gets cold.
          </motion.p>

          <motion.div {...fadeUp(0.8)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <BookButton />
            <a href="#watch" className="group inline-flex items-center gap-3 py-2 text-base font-medium text-cream">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 transition-colors duration-300 group-hover:border-cream group-hover:bg-cream group-hover:text-night">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              </span>
              Watch a set first
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.9)} className="mt-4 -rotate-1 font-hand text-xl text-ember/90">
            psst… shaadi season dates go first ↑
          </motion.p>

          <motion.dl {...fadeUp(0.95)} className="mt-10 flex max-w-md divide-x divide-cream/10 border-t border-cream/10 pt-6">
            {[
              [`${site.years}+`, "Years on mic"],
              [`${site.shows.toLocaleString("en-IN")}+`, "Rooms cracked"],
              [`${site.instagram.followersK}K+`, "Insta fam"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-1 flex-col-reverse px-5 first:pl-0">
                <dt className="eyebrow mt-1 text-cream/45">{label}</dt>
                <dd className="font-poster text-3xl font-semibold">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div ref={photoRef} className="relative mx-auto w-full max-w-[18rem] sm:max-w-[21rem] lg:mr-6">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, ease, delay: 0.4 }}
            className="relative aspect-[4/5] overflow-hidden rounded-b-[1.5rem] rounded-t-full border border-cream/15 bg-surface shadow-[0_40px_120px_-30px_rgba(255,120,70,0.45)]"
          >
            <Image
              src="/profile.jpeg"
              alt="Shadab Hussain, stand-up comedian"
              fill
              priority
              sizes="(min-width: 640px) 336px, 288px"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
          </motion.div>

          <Bubble className="-left-3 top-[14%] sm:-left-16" delay={1.4} rotate={-6} tail="right">
            Arey wah! 😂
          </Bubble>
          <Bubble className="-right-2 top-[44%] sm:-right-14" delay={2.1} rotate={5} tone="ember">
            Once more!
          </Bubble>
          <ApplauseMeter />
        </div>
      </div>
    </section>
  );
}
