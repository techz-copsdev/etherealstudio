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
          DEFAULT: "#161513",
          50: "#F4F2EE",
          100: "#E5E1D9",
          200: "#C9C2B5",
          300: "#9E9586",
          400: "#6F695C",
          500: "#4A453B",
          600: "#2E2B25",
          700: "#23211C",
          800: "#1B1916",
          900: "#161513",
        },
        accent: {
          DEFAULT: "#B85C38",
          50: "#FAEFE9",
          100: "#F1D7C7",
          200: "#E4B49A",
          300: "#D38C6A",
          400: "#C57147",
          500: "#B85C38",
          600: "#9C4A2A",
          700: "#7C3920",
          800: "#5C2A18",
          900: "#3D1C10",
        },
        paper: "#ECE7DD",
        cream: "#F2EFE8",
        mute: "#8A847B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.015em",
        tight2: "-0.025em",
        widest2: "0.22em",
        widest3: "0.34em",
      },
      maxWidth: {
        prose: "62ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22,21,19,0.04), 0 8px 24px rgba(22,21,19,0.06)",
        plate: "0 1px 0 rgba(22,21,19,0.04), 0 24px 48px -16px rgba(22,21,19,0.18)",
        glow: "0 0 0 1px rgba(184,92,56,0.20), 0 24px 60px -20px rgba(184,92,56,0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
