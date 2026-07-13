/**
 * tailwind.config.ts
 *
 * NOTE: This project uses Tailwind CSS v4, which uses CSS-first configuration.
 * Design tokens are defined in app/globals.css using @theme directives.
 *
 * This file is kept for reference and exit-criteria documentation.
 * The actual token values below mirror what is defined in globals.css.
 *
 * Brand colors in globals.css:
 *   --color-brand-red:      #DB0A2A  → use class: text-brand-red, bg-brand-red, etc.
 *   --color-brand-redDark:  #a80820  → text-brand-redDark, bg-brand-redDark, etc.
 *   --color-brand-dark:     #242222
 *   --color-brand-dark2:    #3D3A3A
 *   --color-brand-grey:     #A3A3A3
 *   --color-brand-offwhite: #F3F2F0
 *
 * Font families in globals.css:
 *   --font-heading: var(--font-archivo-black), sans-serif  → font-heading
 *   --font-body:    var(--font-inter), sans-serif          → font-body
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DB0A2A",
          redDark: "#a80820",
          dark: "#242222",
          dark2: "#3D3A3A",
          grey: "#A3A3A3",
          offwhite: "#F3F2F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-archivo-black)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
