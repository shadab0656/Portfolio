const items = ["Weddings", "Sangeets", "Corporate nights", "College fests", "Private parties", "Comedy clubs"];

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ember sm:h-6 sm:w-6" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
    </svg>
  );
}

function Row({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li
          key={item}
          className={`flex items-center gap-8 pr-8 font-serif text-3xl leading-none sm:gap-12 sm:pr-12 sm:text-5xl ${
            i % 2 ? "text-cream/30" : "italic text-cream"
          }`}
        >
          {item}
          <Star />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Events Shadab performs at" className="overflow-hidden border-y border-cream/10 py-7 sm:py-9">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
