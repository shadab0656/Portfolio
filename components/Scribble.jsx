"use client";

import { motion } from "framer-motion";

// A marker-pen underline that draws itself under a word when it scrolls into view
export default function Scribble({ children, color = "#FF5B35" }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible"
        aria-hidden
      >
        <motion.path
          d="M3 13 C 40 5, 85 4, 118 9 S 172 16, 197 5"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </span>
  );
}
