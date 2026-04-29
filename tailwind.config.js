/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["Atkinson Hyperlegible", "Verdana", "sans-serif"],
      },
      colors: {
        ink: "#161512",
        paper: "#f5f0e7",
        graphite: "#2d3035",
        signal: "#e7482e",
        moss: "#526b4a",
        steel: "#3f6f8f",
        flax: "#d8b45a",
      },
      boxShadow: {
        rail: "0 18px 60px rgba(22, 21, 18, 0.18)",
        insetLine: "inset 0 0 0 1px rgba(22, 21, 18, 0.12)",
      },
    },
  },
  plugins: [],
};
