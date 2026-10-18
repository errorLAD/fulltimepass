import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        funky: {
          yellow: "#FFE600",
          pink: "#FF007A",
          orange: "#FF5C00",
          neonGreen: "#00F59B",
          purple: "#9D00FF",
          cyan: "#00E5FF",
          cardDark: "#131828",
          darkBg: "#0B0E1B",
          border: "#2A324B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        pulseNeon: {
          "0%, 100%": { filter: "drop-shadow(0 0 12px rgba(255, 230, 0, 0.7))" },
          "50%": { filter: "drop-shadow(0 0 4px rgba(255, 0, 122, 0.4))" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        floatSlow: "floatSlow 4s ease-in-out infinite",
        pulseNeon: "pulseNeon 2s ease-in-out infinite",
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-hover': '8px 8px 0px 0px #000000',
        'brutal-yellow': '5px 5px 0px 0px #FFE600',
        'brutal-pink': '5px 5px 0px 0px #FF007A',
        'brutal-cyan': '5px 5px 0px 0px #00E5FF',
        'brutal-green': '5px 5px 0px 0px #00F59B',
      },
    },
  },
  plugins: [],
};
export default config;
