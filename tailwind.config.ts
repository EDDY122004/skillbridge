import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfeff",
          500: "#22d3ee",
          600: "#06b6d4",
          700: "#0f766e",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(34, 211, 238, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
