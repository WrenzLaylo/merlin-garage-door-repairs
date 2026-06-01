import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1116",
        "ink-soft": "#161B22",
        "ink-line": "#232A33",
        teal: { DEFAULT: "#16B8A6", dark: "#0E8C7E", light: "#5BE0D0" },
        flame: { DEFAULT: "#FF6A2C", dark: "#E5551B" },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(22,184,166,0.45)",
        flame: "0 4px 12px -6px rgba(255,106,44,0.08)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
