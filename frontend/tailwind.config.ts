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
          DEFAULT: "#0B0F19",
          50: "#F6F7F9",
          100: "#ECEEF2",
          200: "#D5D9E2",
          300: "#AEB4C2",
          400: "#7C8294",
          500: "#535A6E",
          600: "#363C4D",
          700: "#22273A",
          800: "#141826",
          900: "#0B0F19",
        },
        accent: {
          DEFAULT: "#0F5C4A",
          50: "#EAF6F2",
          100: "#D2EDE4",
          200: "#A2DAC8",
          300: "#6FC2A8",
          400: "#3FA585",
          500: "#1F8869",
          600: "#0F5C4A",
          700: "#0B463A",
          800: "#08332B",
          900: "#04211C",
        },
        paper: "#FBFBF8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightish: "-0.015em",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,15,25,0.04), 0 8px 24px rgba(11,15,25,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
