"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BookingForm from "./BookingForm";

export default function BookingModal({ isOpen, onClose, city = "" }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Keep keyboard focus inside the dialog
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll('button, [href], input:not([tabindex="-1"]), select, textarea');
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-night/85 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="relative max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-[1.75rem] border border-cream/10 bg-surface px-6 pb-8 pt-6 sm:rounded-[1.75rem] sm:px-10 sm:pb-10 sm:pt-9"
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-cream/20 sm:hidden" aria-hidden />
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-ember">Booking request</p>
                <h2 id="booking-title" className="mt-3 font-serif text-4xl leading-[1.05] text-cream sm:text-5xl">
                  Book Shadab <span className="italic">{city ? `in ${city}` : "for your event"}</span>
                </h2>
                <p className="mt-3 text-cream/60">Takes under a minute. No payment needed now.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking form"
                className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <BookingForm idPrefix="modal" defaultCity={city} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
