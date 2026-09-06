import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F2A44",
          "navy-deep": "#0A1D31",
          blue: "#1B7FA6",
          "blue-dark": "#145F7D",
          "blue-light": "#4FA8CB",
          sky: "#E8F3F8",
          "sky-soft": "#F4F9FB",
          sand: "#F8F5EF",
          coral: "#E8683C",
          "coral-dark": "#CF5327",
          ink: "#1F2933",
          slate: "#52606D",
          mist: "#9AA5B1",
          line: "#D9E2EC",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        heading: ['"Manrope"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 42, 68, 0.04), 0 8px 24px -12px rgba(15, 42, 68, 0.18)",
        "card-hover": "0 2px 4px rgba(15, 42, 68, 0.06), 0 16px 32px -12px rgba(15, 42, 68, 0.24)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: "0.35" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "pulse-dot": "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
