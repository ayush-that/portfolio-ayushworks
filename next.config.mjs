import { build } from "velite";

import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/constants/env");

const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/1hjYXa-4jvB7SmEN7CsopiI_hX4fn0eVq/view",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
