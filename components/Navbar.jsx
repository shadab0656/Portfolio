"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import BookButton from "./BookButton";

// Root-relative so they also work from the city pages
const links = [
  { href: "/#about", label: "About" },
  { href: "/#watch", label: "Watch" },
  { href: "/#cities", label: "Cities" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#book", label: "Book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        scrolled || menuOpen ? "border-cream/10 bg-night/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8" aria-label="Main">
        <a href="/" aria-label="Shadab Hussain, home" className="font-serif text-2xl leading-none text-cream" onClick={() => setMenuOpen(false)}>
          Shadab <span className="italic text-cream/60">Hussain</span>
          <span className="text-ember">.</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} className="group relative flex items-start gap-1.5 py-1 text-[0.95rem] text-cream/70 transition-colors hover:text-cream">
                <span className="font-mono text-[0.6rem] leading-none text-ember">0{i + 1}</span>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-cream transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li>
            <BookButton variant="small">Book a show</BookButton>
          </li>
        </ul>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`absolute h-px w-6 bg-cream transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-6 bg-cream transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-cream/10 md:hidden"
          >
            <ul className="flex flex-col px-5 pb-8 pt-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="border-b border-cream/10"
                >
                  <a href={l.href} onClick={() => setMenuOpen(false)} className="flex items-baseline justify-between py-4 font-serif text-4xl text-cream">
                    {l.label}
                    <span className="font-mono text-xs text-ember">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <BookButton className="w-full justify-between" onClick={() => setMenuOpen(false)} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX: progress }} className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-ember" aria-hidden />
    </header>
  );
}
