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
          "https://drive.google.com/file/d/19hgxz_4PJF-NIv3QgFCEORadIzCaoxQY/view?usp=sharing",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/ayush-that/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/ayush-that",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://buymeacoffee.com/shydev69",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/fitlesshot/",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/shydev69",
        permanent: true,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@ayush-that",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://www.x.com/shydev69",
        permanent: true,
      },
      {
        source: "/peerlist",
        destination: "https://peerlist.io/shydev69",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/users/fitlesshot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
