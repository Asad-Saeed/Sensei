import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        "dm-serif": ["var(--font-dm-serif)", "DM Serif Text", "serif"],
        audiowide: ["var(--font-audiowide)", "Audiowide", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
