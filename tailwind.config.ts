import type { Config } from "tailwindcss";

const config = {
  // Tailwind will scan these files to generate the utility classes.
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Keep this minimal. Most theme values come from CSS variables in globals.css.
    },
  },
  plugins: [],
} satisfies Config;

export default config;