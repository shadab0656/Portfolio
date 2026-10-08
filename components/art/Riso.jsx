"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const INK = { orange: "#FF5B35", blue: "rgb(var(--riso))", black: "rgb(var(--ink))" };
export const blend = { mixBlendMode: "var(--blend)" };

// Two ink passes, like a two-drum riso print. The blue pass is sparser (shadows only) and lands slightly off.
const passes = [
  { ink: "#FF5B35", spacing: 5, angle: 15, gamma: 0.9, shift: [0, 0] },
  { ink: "var(--riso)", spacing: 6.5, angle: 45, gamma: 2.2, shift: [4, 3] },
];

function drawHalftone(canvas, img) {
  const { width: w, height: h } = canvas.getBoundingClientRect();
  if (!w || !h) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Sample the photo at layout size, cropped like object-fit: cover; object-position: top
  const src = document.createElement("canvas");
  src.width = Math.round(w);
  src.height = Math.round(h);
  const sctx = src.getContext("2d", { willReadFrequently: true });
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  sctx.filter = "grayscale(1) blur(1px)";
  sctx.drawImage(img, (w - dw) / 2, 0, dw, dh);
  const px = sctx.getImageData(0, 0, src.width, src.height).data;

  // Auto-levels: stretch the 3rd–97th percentile of brightness to the full range
  const lum = new Float32Array(src.width * src.height);
  for (let i = 0; i < lum.length; i++) lum[i] = px[i * 4] / 255;
  const sorted = Float32Array.from(lum).sort();
  const lo = sorted[Math.floor(sorted.length * 0.03)];
  const hi = sorted[Math.floor(sorted.length * 0.97)];
  const level = (v) => Math.min(1, Math.max(0, (v - lo) / (hi - lo || 1)));

  // Light paper: ink where the photo is dark. Black stock: ink where it is light.
  const style = getComputedStyle(canvas);
  const dark = style.getPropertyValue("--blend").trim() === "screen";
  const riso = style.getPropertyValue("--riso").trim();
  ctx.globalCompositeOperation = dark ? "screen" : "multiply";

  for (const p of passes) {
    ctx.fillStyle = p.ink === "var(--riso)" ? `rgb(${riso.split(" ").join(",")})` : p.ink;
    const a = (p.angle * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const reach = Math.hypot(w, h);
    for (let u = -reach; u < reach; u += p.spacing) {
      for (let v = -reach; v < reach; v += p.spacing) {
        const x = u * cos - v * sin;
        const y = u * sin + v * cos;
        if (x < -p.spacing || y < -p.spacing || x > w + p.spacing || y > h + p.spacing) continue;
        const sx = Math.min(src.width - 1, Math.max(0, Math.round(x)));
        const sy = Math.min(src.height - 1, Math.max(0, Math.round(y)));
        const t = level(lum[sy * src.width + sx]);
        const amount = Math.pow(dark ? t : 1 - t, p.gamma);
        const r = (p.spacing / 2) * Math.sqrt(amount) * 1.15;
        if (r < 0.35) continue;
        ctx.beginPath();
        ctx.arc(x + p.shift[0], y + p.shift[1], r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// A photo printed the risograph way, drawn as real halftone dots
export function RisoPhoto({ src, alt, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = new Image();
    let ready = false;
    const redraw = () => ready && drawHalftone(canvas, img);
    img.onload = () => {
      ready = true;
      redraw();
    };
    img.src = src;
    const ro = new ResizeObserver(redraw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [src]);

  return (
    <div role="img" aria-label={alt} className={`isolate overflow-hidden bg-paper ${className || "relative"}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={blend} aria-hidden />
    </div>
  );
}

// Text printed in two inks that didn't quite line up
export function Misprint({ children, back = INK.orange, front = INK.blue, offset = "0.05em", className = "" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span aria-hidden className="absolute left-0 top-0" style={{ color: back, transform: `translate(${offset}, ${offset})` }}>
        {children}
      </span>
      <span className="relative" style={{ ...blend, color: front }}>
        {children}
      </span>
    </span>
  );
}

// Hand-drawn marks. They draw themselves in when they appear.
const draw = (delay = 0, inView = false) => ({
  initial: { pathLength: 0 },
  ...(inView ? { whileInView: { pathLength: 1 }, viewport: { once: true, amount: 0.8 } } : { animate: { pathLength: 1 } }),
  transition: { duration: 0.8, ease: "easeInOut", delay },
});

export function Circled({ children, color = INK.orange, delay = 0.6, inView = false }) {
  return (
    <span className="relative mr-2 inline-block px-1">
      {children}
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="pointer-events-none absolute -left-2 -top-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] overflow-visible" aria-hidden>
        <motion.path
          d="M12 30 C 8 10, 85 0, 95 22 C 102 42, 25 52, 7 34 C 0 22, 35 6, 62 8"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          {...draw(delay, inView)}
        />
      </svg>
    </span>
  );
}

export function CurlyArrow({ className = "", color = INK.black, delay = 0.8, flip = false, inView = false }) {
  return (
    <svg viewBox="0 0 120 70" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} fill="none" aria-hidden>
      <motion.path d="M6 10 C 30 60, 70 70, 88 38 C 96 22, 78 14, 74 30 C 70 46, 92 58, 112 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" {...draw(delay, inView)} />
      <motion.path d="M100 44 L113 52 L101 62" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...draw(delay + 0.7, inView)} />
    </svg>
  );
}

export function Squiggle({ className = "", color = INK.orange, delay = 0.4, inView = true }) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={className} fill="none" aria-hidden>
      <motion.path d="M2 12 Q 14 2, 26 12 T 50 12 T 74 12 T 98 12 T 122 12 T 146 12 T 170 12 T 198 12" stroke={color} strokeWidth="3" strokeLinecap="round" {...draw(delay, inView)} />
    </svg>
  );
}

export function Sparkle({ className = "", color = INK.blue }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z" />
    </svg>
  );
}

export function Tape({ className = "" }) {
  return <span aria-hidden className={`absolute h-7 w-24 bg-[rgb(var(--tape)/var(--tape-a))] shadow-sm ${className}`} style={blend} />;
}

// SVG filter that makes edges wobble like they were drawn by hand
export function RoughFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="3.5" />
      </filter>
    </svg>
  );
}
