export default function SectionLabel({ index, children, tone = "dark" }) {
  const light = tone === "light";
  return (
    <p className={`eyebrow flex items-center gap-3 ${light ? "text-night/60" : "text-cream/55"}`}>
      <span className={light ? "text-emberdeep" : "text-ember"}>({index})</span>
      <span className="h-px w-8 bg-current opacity-40" aria-hidden />
      {children}
    </p>
  );
}
