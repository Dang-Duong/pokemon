import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pokemon: {
          // Types
          normal: "#A8A878",
          fire: "#F08030",
          water: "#6890F0",
          electric: "#F8D030",
          grass: "#78C850",
          ice: "#98D8D8",
          fighting: "#C03028",
          poison: "#A040A0",
          ground: "#E0C068",
          flying: "#A890F0",
          psychic: "#F85888",
          bug: "#A8B820",
          rock: "#B8A038",
          ghost: "#705898",
          dragon: "#7038F8",
          dark: "#705848",
          steel: "#B8B8D0",
          fairy: "#EE99AC",
          // Stats
          hp: "#f87171",
          attack: "#fb923c",
          defense: "#60a5fa",
          "special-attack": "#c084fc",
          "special-defense": "#4ade80",
          speed: "#facc15",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        "pokemon-solid": ["var(--font-pokemon-solid)"],
        "pokemon-hollow": ["var(--font-pokemon-hollow)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
