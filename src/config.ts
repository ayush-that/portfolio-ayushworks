import { ConfigProps } from "./types/config";

export const config = {
  appName: "$whoami",
  appDesignation: "Software Engineer",
  appDescription: `Hi, I'm Shydev. I'm funny.`,

  domainName: "ayushworks.com",
  // Cloudflare R2 bucket (ayushworks-media) behind a custom domain.
  // Bucket layout: site/ (logo, photos), projects/ (covers), cover/ (post covers), posts/ (inline images)
  cdnUrl: "https://cdn.ayushworks.com",

  colors: {
    theme: "dark",
    main: "#000000",
  },

  social: {
    github: "https://github.com/ayush-that",
    linkedin: "https://www.linkedin.com/in/ayush-that/",
    instagram: "https://www.instagram.com/fitlesshot/",
    discord: "https://discordapp.com/users/shydev69",
    email: "ayush1337@hotmail.com",
    phone: "+918810289569",
    youtube: "https://www.youtube.com/@shydev69",
    twitter: "https://x.com/shydev69",
    buymeacoffee: "https://buymeacoffee.com/shydev69",
  },

  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
