"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { InkButton } from "./ArtHero";

const homeLinks = [
  ["#about", "Backstory"],
  ["#watch", "Watch"],
  ["#follow", "Follow"],
  ["#book", "Book"],
];

// Other pages pass their own section links, and logoHref="/" so the logo goes home
export default function ArtNavbar({ links = homeLinks, logoHref = "#top", city }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 font-poster transition-colors duration-500 ${
        scrolled || menuOpen
          ? "bg-paper/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href={logoHref} className="font-hand text-3xl leading-none text-ink">
          Shadab<span className="text-ember">!</span>
        </a>

        <nav aria-label="Main" className="flex items-center gap-4 md:gap-6">
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
          <InkButton city={city} className="hidden !px-4 !py-2 text-sm sm:inline-block">
            Book a show
          </InkButton>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-ink text-ink md:hidden"
          >
            <span
              className={`absolute h-0.5 w-4 bg-current transition-transform duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 bg-current transition-transform duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t-2 border-ink md:hidden"
          >
            <ul className="flex flex-col px-5 pb-6 pt-2">
              {links.map(([href, label], i) => (
                <motion.li
                  key={href}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="border-b border-ink/15"
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between py-3 text-2xl text-ink"
                  >
                    {label}
                    <span className="font-mono text-xs text-accent">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-5" onClick={() => setMenuOpen(false)}>
                <InkButton city={city} className="w-full !py-3 text-sm">Book a show</InkButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-y-2 border-ink bg-paper">
        <p className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink sm:px-8">
          <span>Live stand-up</span>
          <span className="hidden sm:inline">
            Weddings ✶ Corporate ✶ Colleges ✶ Parties
          </span>
          <span className="text-accent">Now booking</span>
        </p>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-ember"
        aria-hidden
      />
    </header>
  );
}
