"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow } from "./BookButton";
import { buildMailto, eventTypes, site } from "@/lib/site";
import { cities } from "@/lib/cities";

const blank = { name: "", contact: "", eventType: "", city: "", date: "", message: "", company: "" };
const labelClass = "eyebrow mb-2.5 block text-cream/60";

export default function BookingForm({ idPrefix = "booking", autoFocus = false, defaultCity = "" }) {
  const empty = { ...blank, city: defaultCity };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [lastSent, setLastSent] = useState(null);
  const [minDate, setMinDate] = useState("");

  // Set on the client so the minimum date follows the visitor's own timezone
  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const id = (name) => `${idPrefix}-${name}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The booking request couldn't be sent.");
      setLastSent(form);
      setForm(empty);
      setStatus("sent");
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "You appear to be offline. Check your connection and try again." : err.message);
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="py-8 text-center"
          role="status"
        >
          <motion.svg viewBox="0 0 52 52" className="mx-auto h-16 w-16" aria-hidden>
            <circle cx="26" cy="26" r="25" fill="#FF5B35" />
            <motion.path
              d="M15 27l7 7 15-16"
              fill="none"
              stroke="#0D0C0B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.svg>
          <h3 className="mt-6 font-serif text-4xl text-cream">
            Request <span className="italic">sent.</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-lg text-cream/65">
            Shadab will reply to {lastSent?.contact ? <strong className="font-medium text-cream">{lastSent.contact}</strong> : "the contact you shared"} about
            availability for your {lastSent?.eventType?.toLowerCase() || "event"}.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 border-b border-ember pb-0.5 text-base text-cream transition-colors hover:text-ember"
          >
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className={labelClass}>Your name</label>
              <input
                id={id("name")} name="name" type="text" required minLength={2} maxLength={100}
                autoComplete="name" autoFocus={autoFocus}
                value={form.name} onChange={update} className="field" placeholder="Priya Sharma"
              />
            </div>

            <div>
              <label htmlFor={id("contact")} className={labelClass}>Phone or email</label>
              <input
                id={id("contact")} name="contact" type="text" required maxLength={120}
                autoComplete="tel"
                value={form.contact} onChange={update} className="field" placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={id("eventType")} className={labelClass}>Event type</label>
              <div className="relative">
                <select
                  id={id("eventType")} name="eventType" required
                  value={form.eventType} onChange={update}
                  className={`field appearance-none pr-10 ${form.eventType ? "" : "text-cream/35"}`}
                >
                  <option value="" disabled>Choose one</option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t} className="bg-surface text-cream">{t}</option>
                  ))}
                </select>
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/60" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor={id("date")} className={labelClass}>Event date</label>
              <input
                id={id("date")} name="date" type="date" required min={minDate || undefined}
                value={form.date} onChange={update} className="field [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label htmlFor={id("city")} className={labelClass}>City / venue area</label>
            <input
              id={id("city")} name="city" type="text" maxLength={80} list={id("city-options")}
              autoComplete="address-level2"
              value={form.city} onChange={update} className="field" placeholder="Delhi, Gurugram, Noida…"
            />
            <datalist id={id("city-options")}>
              {cities.map((c) => (
                <option key={c.slug} value={c.name} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor={id("message")} className={labelClass}>
              Event details <span className="normal-case tracking-normal text-cream/35">(optional)</span>
            </label>
            <textarea
              id={id("message")} name="message" rows={3} maxLength={1500}
              value={form.message} onChange={update} className="field resize-none"
              placeholder="City, venue, audience size, set length"
            />
          </div>

          {/* Honeypot field, hidden from people and screen readers */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={id("company")}>Company</label>
            <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update} />
          </div>

          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
                role="alert"
              >
                <div className="rounded-xl border border-ember/50 bg-ember/10 p-4 text-cream">
                  <p>{error}</p>
                  <a href={buildMailto(form)} className="mt-2 inline-block text-ember underline underline-offset-4">
                    Email the request to {site.email}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group flex w-full items-center justify-between gap-3 rounded-full bg-ember py-2 pl-7 pr-2 text-base font-medium text-night transition-colors duration-300 hover:bg-cream disabled:cursor-wait disabled:opacity-80"
          >
            {status === "sending" ? "Sending request" : "Send booking request"}
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-night text-cream transition-transform duration-500 group-hover:-rotate-45">
              {status === "sending" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" aria-hidden />
              ) : (
                <Arrow />
              )}
            </span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
