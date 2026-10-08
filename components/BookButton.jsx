"use client";

import { useBooking } from "./Providers";

export function Arrow({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function BookButton({ children = "Book for Wedding Party / Event", variant = "primary", className = "", onClick, city }) {
  const { open } = useBooking();
  const handle = () => {
    onClick?.();
    open(city);
  };

  if (variant === "small") {
    return (
      <button
        type="button"
        onClick={handle}
        className={`rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-night transition-colors duration-300 hover:bg-ember ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      className={`group inline-flex items-center gap-4 rounded-full bg-ember py-2 pl-6 pr-2 text-base font-medium text-night transition-colors duration-300 hover:bg-cream ${className}`}
    >
      {children}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-night text-cream transition-transform duration-500 group-hover:-rotate-45">
        <Arrow />
      </span>
    </button>
  );
}
