"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

// Fades and lifts its content into place the first time it scrolls into view
export default function Reveal({ as = "div", delay = 0, y = 28, amount = 0.3, className = "", children }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
