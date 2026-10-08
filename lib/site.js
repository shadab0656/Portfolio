// Public address of the site, used for canonical URLs, the sitemap and social previews.
// Set NEXT_PUBLIC_SITE_URL to your real domain (e.g. https://shadabhussain.in). On Vercel it falls back to the production domain.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  name: "Shadab Hussain",
  url: siteUrl,
  tagline: "Stand-up comedy for weddings, college fests and every crowd in between.",
  email: "jokekarshadab@gmail.com",
  years: 5,
  shows: 2000,
  region: "Delhi NCR",
  instagram: {
    url: "https://www.instagram.com/shadabasitis",
    handle: "@shadabasitis",
    followersK: 25, // shown as 25K+ (update here as it grows)
  },
  youtube: {
    url: "https://www.youtube.com/@Shadabasitis",
    handle: "@Shadabasitis",
  },
  featuredVideo: {
    id: "Mp7cIvKXkgY",
    title: "Shadab Hussain stand-up set",
  },
};

export const eventTypes = [
  "Wedding / Sangeet",
  "Corporate event",
  "College fest",
  "Birthday / Private party",
  "Other",
];

export function buildMailto(form = {}) {
  const subject = `Booking request: ${form.eventType || "Event"}${form.city ? ` in ${form.city}` : ""}${form.date ? ` on ${form.date}` : ""}`;
  const body = [
    "Hi Shadab,",
    "",
    "I'd like to book you for an event.",
    "",
    `Name: ${form.name || ""}`,
    `Contact: ${form.contact || ""}`,
    `Event type: ${form.eventType || ""}`,
    `City: ${form.city || ""}`,
    `Date: ${form.date || ""}`,
    form.message ? `\nDetails: ${form.message}` : "",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
