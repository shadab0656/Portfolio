// Fonts (Fraunces poster + Caveat hand) are loaded once in app/layout.js
// Wraps the poster design. tone="dark" swaps cream paper for black stock (see .art-dark in globals.css).
export default function ArtShell({ tone = "light", children }) {
  return (
    <div className={`${tone === "dark" ? "art-dark" : ""} min-h-screen overflow-x-hidden bg-paper text-ink`}>
      {children}
    </div>
  );
}
