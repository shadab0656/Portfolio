/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0D0C0B",   // the club after the house lights go down
        surface: "#171513",
        cream: "#F3EEE4",   // warm spotlight white
        ember: "#FF5B35",   // the "on air" light
        emberdeep: "#C2381A", // ember for small text on cream (passes contrast)
        // Risograph poster palette for /art and /art-dark (values swap per tone in globals.css)
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        riso: "rgb(var(--riso) / <alpha-value>)",   // riso blue
        accent: "rgb(var(--accent) / <alpha-value>)", // orange that passes contrast on the current paper
        frame: "rgb(var(--frame) / <alpha-value>)",
      },
      fontFamily: {
        poster: ["var(--font-poster)", "Georgia", "serif"],
        hand: ["var(--font-hand)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
