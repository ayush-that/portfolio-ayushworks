import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animatePlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

const shadcnPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": "0 0% 0%",
        "--foreground": "0 0% 100%",
        "--card": "0 0% 0%",
        "--card-foreground": "0 0% 100%",
        "--popover": "0 0% 0%",
        "--popover-foreground": "0 0% 100%",
        "--primary": "0 0% 100%",
        "--primary-foreground": "0 0% 0%",
        "--secondary": "0 0% 10%",
        "--secondary-foreground": "0 0% 100%",
        "--muted": "0 0% 15%",
        "--muted-foreground": "0 0% 65%",
        "--accent": "0 0% 15%",
        "--accent-foreground": "0 0% 100%",
        "--destructive": "0 0% 30%",
        "--destructive-foreground": "0 0% 100%",
        "--border": "0 0% 20%",
        "--input": "0 0% 15%",
        "--ring": "0 0% 100%",
        "--radius": "0.5rem",
      },
    });
    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    });
  },

  {
    theme: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "57rem",
        },
      },
      extend: {
        typography: {
          DEFAULT: {
            css: {
              maxWidth: "100ch",
            },
          },
        },
        fontFamily: {
          sans: ["var(--font-inter-tight)", ...fontFamily.sans],
          serif: ["var(--font-instrument-serif)", ...fontFamily.serif],
          heading: ["var(--font-instrument-serif)", ...fontFamily.serif],
          mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
        },
        screens: {
          xs: "380px",
          sm: "500px",
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
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  },
);

const shadcnPreset = {
  prefix: "",
  darkMode: ["selector"],
  content: [],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;

const config = {
  presets: [shadcnPreset],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--foreground))",
              "&:hover": {
                color: "hsl(var(--muted-foreground))",
              },
            },
            blockquote: {
              borderLeftColor: "hsl(var(--foreground))",
              color: "hsl(var(--muted-foreground))",
            },
            "h1,h2,h3,h4,h5,h6": {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-instrument-serif)",
            },
            hr: {
              borderColor: "hsl(var(--border))",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
            },
            pre: {
              backgroundColor: "hsl(var(--muted))",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
