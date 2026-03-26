import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "bg-card-hover": "var(--bg-card-hover)",
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
        "border-focus": "var(--border-focus)",
        "indigo-soft": "var(--indigo-soft)",
        "indigo-vivid": "var(--indigo-vivid)",
        "indigo-glow": "var(--indigo-glow)",
        "cyan-soft": "var(--cyan-soft)",
        "cyan-vivid": "var(--cyan-vivid)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-accent": "var(--text-accent)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", fontWeight: "800" }],
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-brand": "var(--gradient-brand)",
        "gradient-warm": "var(--gradient-warm)",
      },
      boxShadow: {
        "glow-indigo": "var(--glow-indigo)",
        "glow-cyan": "var(--glow-cyan)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "count-up": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
