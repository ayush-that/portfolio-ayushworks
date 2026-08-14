import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  globalIgnores([
    ".next/**",
    ".open-next/**",
    ".velite/**",
    ".wrangler/**",
    "tina/__generated__/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
