import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import { shadcnPreset } from "./src/lib/shadcn-ui";

const config = {
  presets: [shadcnPreset],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--foreground))",
            a: {
              color: "#00adb5",
              "&:hover": {
                color: "#008c96",
              },
            },
            blockquote: {
              borderLeftColor: "#00adb5",
              color: "rgb(var(--muted-foreground))",
            },
            "h1,h2,h3,h4,h5,h6": {
              color: "rgb(var(--foreground))",
            },
            hr: {
              borderColor: "rgb(var(--border))",
            },
            code: {
              color: "rgb(var(--foreground))",
              backgroundColor: "rgb(var(--muted))",
            },
            pre: {
              backgroundColor: "rgb(var(--muted))",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
