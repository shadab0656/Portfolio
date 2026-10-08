"use client";

import { motion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";
import Scribble from "./Scribble";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { Arrow } from "./BookButton";
import { site } from "@/lib/site";

export default function VideoShowcase({ index = "02", heading }) {
  return (
    <section id="watch" className="border-t border-cream/10 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index={index}>Watch</SectionLabel>
          </Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal as="h2" className="font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
              {heading ?? (
                <>
                  See how he <span className="italic">works a <Scribble>room.</Scribble></span>
                </>
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={site.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 border-b border-cream/30 pb-1 text-base text-cream transition-colors hover:border-ember hover:text-ember"
              >
                More sets on YouTube
                <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </a>
            </Reveal>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-[1.75rem] border border-cream/10 bg-surface p-2 sm:p-3"
        >
          <div className="overflow-hidden rounded-[1.25rem]">
            <YouTubeEmbed id={site.featuredVideo.id} title={site.featuredVideo.title} />
          </div>
          <div className="eyebrow flex items-center justify-between px-3 pb-2 pt-4 text-cream/45 sm:px-4 sm:pb-3">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
              Featured set
            </span>
            <span>{site.youtube.handle}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
