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
        desi: {
          orange: "#FF6F00",
          saffron: "#FF9933",
          yellow: "#FFD600",
          pink: "#FF1361",
          purple: "#7928CA",
          blue: "#0070F3",
          green: "#00DF72",
          dark: "#0F172A",
          card: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "cursive", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(255, 111, 0, 0.6))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 5px rgba(255, 19, 97, 0.4))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        'desi-pop': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'desi-pop-hover': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'desi-pop-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'desi-glow': '0 0 25px -5px rgba(255, 111, 0, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
