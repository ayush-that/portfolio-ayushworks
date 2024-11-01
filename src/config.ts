import { ConfigProps } from "./types/config";

const config = {
  appName: "Ayush Singh",
  appDesignation: "Software Developer",
  appDescription: `Hi, I'm Ayush, Software developer from India. I'm funny.`,

  domainName: "ayush.top",

  colors: {
    theme: "dark",
  },

  social: {
    github: "https://github.com/ayush-that",
    linkedin: "https://www.linkedin.com/in/ayush-that/",
    instagram: "https://www.instagram.com/fitlesshot/",
    discord: "https://discordapp.com/users/fitlesshot",
    email: "ayush1337@hotmail.com",
    phone: "",
  },

  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
