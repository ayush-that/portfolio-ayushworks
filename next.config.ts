import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without this, a stray lockfile in a
  // parent directory (e.g. ~/bun.lock) makes Turbopack treat $HOME as the root,
  // which causes runaway memory/disk usage that can freeze the whole machine.
  // See https://github.com/vercel/next.js/issues/92978
  turbopack: {
    root: __dirname,
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: {
    // Tree-shake heavy barrel packages so dev only compiles the icons/components
    // actually used (huge dev-compile speedup for react-icons / lucide / framer).
    optimizePackageImports: [
      "react-icons/ai",
      "react-icons/bi",
      "react-icons/bs",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/fi",
      "react-icons/gr",
      "react-icons/md",
      "react-icons/si",
      "react-icons/tb",
      "lucide-react",
      "framer-motion",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    qualities: [75, 85, 95],
    minimumCacheTTL: 2592000,
    remotePatterns: [{ protocol: "https", hostname: "cdn.ayushworks.com" }],
  },
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/14R-EhYkw0C7D-Gg4cWPHoth13VrUWn72/view?usp=sharing",
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
        source: "/donate",
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
        destination: "https://www.youtube.com/@shydev69",
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
        source: "/hi",
        destination: "https://sticky-alder-474.notion.site/shydev",
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

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
