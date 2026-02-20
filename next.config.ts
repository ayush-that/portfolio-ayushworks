import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/1H0mKGg6zKlIv4JX1op4lCwsDkWdYutu4/view?usp=sharing",
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
