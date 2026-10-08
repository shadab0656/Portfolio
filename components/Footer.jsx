import Link from "next/link";
import { cities, cityPath } from "@/lib/cities";
import { site } from "@/lib/site";

const linkClass = "text-lg text-cream/80 transition-colors hover:text-ember";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden pb-8 pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow text-cream/45">Bookings</p>
            <a href={`mailto:${site.email}`} className={`mt-3 inline-block break-all ${linkClass}`}>{site.email}</a>
          </div>
          <div>
            <p className="eyebrow text-cream/45">Elsewhere</p>
            <ul className="mt-3 space-y-1">
              <li><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
              <li><a href={site.youtube.url} target="_blank" rel="noopener noreferrer" className={linkClass}>YouTube</a></li>
            </ul>
          </div>
          <div className="sm:text-right">
            <a href="#top" className={`inline-flex items-center gap-2 ${linkClass}`}>
              Back to top
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Book by city" className="mt-14 border-t border-cream/10 pt-8">
          <p className="eyebrow text-cream/45">
            <Link href="/book-comedian" className="hover:text-ember">Book a stand-up comedian in</Link>
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={cityPath(c)} className="text-cream/70 transition-colors hover:text-ember">{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-20 flex justify-center sm:mt-28">
          <p className="neon-tube neon-flicker rounded-[2rem] px-8 py-5 text-center sm:px-14 sm:py-7">
            <span className="neon font-serif text-[clamp(2rem,5.5vw,4rem)] italic leading-none">You&apos;ve been great. Goodnight!</span>
          </p>
        </div>

        <div className="eyebrow mt-8 flex flex-col gap-2 border-t border-cream/10 pt-6 text-cream/40 sm:flex-row sm:justify-between">
          <span>© {year} {site.name}</span>
          <span>Stand-up comedian</span>
        </div>
      </div>
    </footer>
  );
}
