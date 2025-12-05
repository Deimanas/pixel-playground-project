import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        minecraft: ['"VT323"', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Minecraft specific colors
        grass: "hsl(var(--grass))",
        dirt: "hsl(var(--dirt))",
        stone: "hsl(var(--stone))",
        obsidian: "hsl(var(--obsidian))",
        diamond: "hsl(var(--diamond))",
        gold: "hsl(var(--gold))",
        redstone: "hsl(var(--redstone))",
        emerald: "hsl(var(--emerald))",
        lapis: "hsl(var(--lapis))",
        netherite: "hsl(var(--netherite))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "block-bounce": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-5px) scale(1.05)" },
        },
        "pixelate-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) rotate(45deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--accent))" },
          "50%": { boxShadow: "0 0 40px hsl(var(--accent)), 0 0 60px hsl(var(--accent))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "block-bounce": "block-bounce 0.5s ease-in-out",
        "pixelate-in": "pixelate-in 0.5s ease-out",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      boxShadow: {
        "minecraft": "inset 4px 4px 0 rgba(255,255,255,0.2), inset -4px -4px 0 rgba(0,0,0,0.3), 4px 4px 0 rgba(0,0,0,0.5)",
        "pixel": "4px 4px 0 rgba(0,0,0,0.5)",
        "inset-pixel": "inset 2px 2px 0 rgba(0,0,0,0.5), inset -2px -2px 0 rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
