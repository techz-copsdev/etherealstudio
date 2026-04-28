import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A1830",
          50: "#F4F6FA",
          100: "#E5EAF1",
          200: "#C8D2E0",
          300: "#99A8BF",
          400: "#6B7B96",
          500: "#495773",
          600: "#2F3D58",
          700: "#1F2C44",
          800: "#142036",
          900: "#0A1830",
        },
        accent: {
          DEFAULT: "#B8924E",
          50: "#FBF6EB",
          100: "#F4E8CD",
          200: "#E8D29C",
          300: "#DBBB6B",
          400: "#C8A04E",
          500: "#B8924E",
          600: "#9C7A3D",
          700: "#7E612F",
          800: "#604923",
          900: "#432F16",
        },
        paper: "#FBFAF6",
        cream: "#F3EFE6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightish: "-0.015em",
        widest2: "0.22em",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,24,48,0.04), 0 8px 24px rgba(10,24,48,0.06)",
        plate: "0 1px 0 rgba(10,24,48,0.04), 0 24px 48px -16px rgba(10,24,48,0.18)",
        glow: "0 0 0 1px rgba(184,146,78,0.25), 0 24px 60px -20px rgba(184,146,78,0.45)",
      },
      backgroundImage: {
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
    },
  },
  plugins: [],
};

export default config;
