import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px — mobile-first breathing room
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px", // cap content width, Apple-like
      },
    },
    extend: {
      colors: {
        // ── Nexus brand ────────────────────────────────
        // Neon used strictly as accent (rule: 95% preto/branco, 4% verde, 1% roxo)
        nexus: {
          green: "hsl(var(--nexus-green))",
          "green-soft": "hsl(var(--nexus-green) / 0.14)",
          purple: "hsl(var(--nexus-purple))",
          ink: "hsl(var(--nexus-ink))", // near-black surface
        },
        // ── shadcn/ui semantic tokens ──────────────────
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        prose: "42ch",
      },
      boxShadow: {
        // ── Nexus elevation system (soft, never default) ──────────
        elegant: "0 24px 60px -28px rgba(0, 0, 0, 0.85)",
        card: "0 8px 30px -16px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        // hover: deeper elevation + an extremely discreet green halo
        "card-hover":
          "0 34px 70px -28px rgba(0, 0, 0, 0.95), 0 0 34px -16px hsl(var(--nexus-green) / 0.32), inset 0 1px 0 0 rgba(255, 255, 255, 0.09)",
        // discreet green halo (accent only)
        "glow-green": "0 0 34px -10px hsl(var(--nexus-green) / 0.5)",
        "glow-green-sm": "0 0 22px -10px hsl(var(--nexus-green) / 0.45)",
      },
      transitionTimingFunction: {
        // Apple-like easing
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "35%": { opacity: "1" },
          "70%": { transform: "translateY(9px)", opacity: "0" },
          "100%": { transform: "translateY(9px)", opacity: "0" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 2.4s var(--tw-ease, ease-in-out) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
