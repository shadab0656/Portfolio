import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

// Native <details> keeps every answer in the HTML for search engines and works without JavaScript
export default function Faq({ index, label = "FAQ", title, items, id = "faq" }) {
  return (
    <section id={id} className="border-t border-cream/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel index={index}>{label}</SectionLabel>
          </Reveal>
          <div>
            <Reveal as="h2" className="font-serif text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
              {title}
            </Reveal>
            <Reveal delay={0.1} className="mt-12 border-t border-cream/10">
              {items.map(([q, a]) => (
                <details key={q} className="group border-b border-cream/10">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-lg text-cream transition-colors hover:text-ember sm:text-xl [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans font-medium">{q}</h3>
                    <span aria-hidden className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cream/20 transition-transform duration-300 group-open:rotate-45">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-7 pr-12 text-lg leading-relaxed text-cream/65">{a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
