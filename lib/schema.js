// schema.org structured data (JSON-LD) so search engines understand who Shadab is, what can be booked and where.
// Everything here must match what's visible on the page. No invented ratings, prices or addresses.
import { cities, cityPath } from "./cities";
import { eventTypes, site } from "./site";

const id = (hash) => `${site.url}/#${hash}`;

const place = (c) => ({
  "@type": "City",
  name: c.name,
  ...(c.alt ? { alternateName: c.alt } : {}),
  containedInPlace: { "@type": "State", name: c.state },
});

export const person = {
  "@type": "Person",
  "@id": id("person"),
  name: site.name,
  jobTitle: "Stand-up Comedian",
  description: `${site.name} is a stand-up comedian with ${site.years}+ years on stage and ${site.shows}+ live shows, available for weddings, corporate events and college fests across Delhi NCR.`,
  url: site.url,
  image: `${site.url}/profile.jpeg`,
  email: `mailto:${site.email}`,
  sameAs: [site.instagram.url, site.youtube.url],
  knowsAbout: ["Stand-up comedy", "Wedding entertainment", "Corporate event entertainment", "Live comedy shows"],
  award: "Winner of multiple college comedy competitions",
};

export const website = {
  "@type": "WebSite",
  "@id": id("website"),
  url: site.url,
  name: `${site.name}, Stand-up Comedian`,
  inLanguage: "en-IN",
  publisher: { "@id": id("person") },
};

export function bookingService(areas = cities) {
  return {
    "@type": "Service",
    "@id": id("booking"),
    name: `Book stand-up comedian ${site.name}`,
    serviceType: "Stand-up comedy performance",
    description: "Live stand-up comedy for weddings, sangeets, corporate events, college fests and private parties.",
    provider: { "@id": id("person") },
    areaServed: areas.map(place),
    url: `${site.url}/#book`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Events",
      itemListElement: eventTypes
        .filter((t) => t !== "Other")
        .map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `Stand-up comedy for ${t.toLowerCase()}` } })),
    },
  };
}

export function faqPage(qa, url) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: qa.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${site.url}${path}`,
    })),
  };
}

export const cityUrl = (c) => `${site.url}${cityPath(c)}`;

export const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });
