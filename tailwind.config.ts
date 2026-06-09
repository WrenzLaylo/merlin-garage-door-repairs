import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F9FAFB",
        surface: "#FFFFFF",
        ink: "#111111",
        muted: "#444444",
        line: "#D1D5DB",
        brand: {
          DEFAULT: "#66C42B",
          dark: "#57A826",
          deep: "#2E6B14",
          tint: "#E9F6E0",
        },
        accent: {
          DEFAULT: "#E64833",
          dark: "#CF3F2E",
          tint: "#FFF1EF",
        },
        gold: "#FFB400",
        navy: { DEFAULT: "#0F172A", soft: "#1E293B" },
      },
      fontFamily: {
        display: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 28px rgba(0,0,0,0.08)",
        card: "0 4px 14px rgba(2,6,23,0.05)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
