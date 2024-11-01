import { createId } from "@paralleldrive/cuid2";
import { ChainGpt } from "~/assets/svg";

// Project cover images
import nykaaCover from "~/assets/images/cover/nykaa-product-advisor.png";
import finvedaCover from "~/assets/images/cover/finveda.png";
import solopongCover from "~/assets/images/cover/solopong.png";
import whatsmytrashCover from "~/assets/images/cover/whatsmytrash.png";
import mathcamCover from "~/assets/images/cover/mathcam.png";
import desinftCover from "~/assets/images/cover/desinft.png";
import cryptoniclabsCover from "~/assets/images/cover/cryptonic-labs.png";
import wattxCover from "~/assets/images/cover/wattx.png";
import typingCover from "~/assets/images/cover/100xtyping.png";
import cookinghubCover from "~/assets/images/cover/cookinghub.png";
import kooberCover from "~/assets/images/cover/koober.png";
import webstCover from "~/assets/images/cover/webst.png";

const projects = [
  {
    id: createId(),
    Icon: ChainGpt,
    title: `Nykaa Product Advisor`,
    description:
      "Web scraping application enhanced with AI that helps users to find the best product for their skin type and concerns.",
    deployedURL: "https://nykaa-product-advisor.onrender.com/",
    cover: nykaaCover,
    stacks: [
      "Python",
      "Selenium",
      "Beautiful Soup",
      "Tailwind CSS",
      "Flask",
      "Gemini",
    ],
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/Nykaa-Product-Advisor",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `DesiNFT`,
    description:
      "NFT marketplace promoting Indian culture. Mint, buy and sell NFTs with a user-friendly, responsive interface.",
    stacks: ["Next.js", "Tailwind CSS", "Polygon", "Solidity", "Chai.js"],
    cover: desinftCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/HackOn-Blocks-2024",
    deployedURL: "https://desinft.vercel.app/",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `Cryptonic Labs`,
    cover: cryptoniclabsCover,
    description:
      "Dark-themed modern animated agency landing page with integrated content management system.",
    stacks: ["Next.js", "GSAP", "Framer", "Tailwind CSS", "Sanity.io"],
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/Cryptonic-Labs",
    deployedURL: "https://cryptoniclabs.com/",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `WattX`,
    description:
      "Landing page for a blockchain-based energy trading platform with a modern design and smooth animations.",
    stacks: ["Next.js", "Framer", "Tailwind CSS", "Clerk"],
    cover: wattxCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/WattX",
    deployedURL: "https://watt-x.vercel.app/",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `Koober`,
    description:
      "Your personal financial adviosr powered by AI. Delivers advice tailored to your unique income, budget, and expenses.",
    stacks: ["Next.js", "PostgreSQL", "Tailwind CSS", "TypeScript", "Gemini"],
    cover: kooberCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/Live-The-Code-3.0",
    deployedURL: "https://koober.vercel.app/",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `WebST`,
    description:
      "Web terminal interface that replicates my home build's st terminal. Supports over 50 unique commands.",
    stacks: ["Next.js", "Tailwind CSS", "TypeScript"],
    cover: webstCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/msc-project",
    deployedURL: "https://mscproject-drab.vercel.app/",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `FinVeda`,
    description:
      "Dynamic financial literacy platform with AI advisor, blogs, trends, calculators, and a quiz for effortless finance learning.",
    deployedURL: "https://finveda.vercel.app/",
    cover: finvedaCover,
    stacks: ["HTML", "CSS", "JavaScript", "BootStrap", "ChatGPT"],
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/FinVeda",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `WhatsMyTrash`,
    description:
      "Web app that helps users to identify the type of waste they have and how to dispose of it properly.",
    stacks: ["Python", "Flask", "TensorFlow", "Keras", "BootStrap"],
    cover: whatsmytrashCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/IOSC_whatsmytrash",
  },

  {
    id: createId(),
    title: "MathCam",
    Icon: ChainGpt,
    description:
      "Apple calculator inspired math-solver that uses Computer Vision and AI to solve mathematical problems.",
    isRepo: true,
    repoUrl:
      "https://github.com/ayush-that/Apple-Calculator-Using-Computer-Vision",
    cover: mathcamCover,
    stacks: ["Python", "Flask", "OpenCV", "Gemini"],
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `100xTyping`,
    description:
      "Minimal terminal themed Typing Test. Returns WPM and accuracy. Dark mode available.",
    stacks: ["HTML", "CSS", "JavaScript"],
    cover: typingCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/100xTyping",
    deployedURL: "https://100xtyping.ayush.top/",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `SoloPong`,
    cover: solopongCover,
    description:
      "Classic pong game with a twist of Computer Vision. Play against yourself and see how long you can last.",
    isRepo: true,
    stacks: ["Python", "Flask", "OpenCV"],
    repoUrl: "https://github.com/ayush-that/SoloPong",
  },

  {
    id: createId(),
    Icon: ChainGpt,
    title: `Cooking Hub`,
    description:
      "BloatFree Recipe sharing platform where users can learn to cook without encountering ads, trackers or cookies",
    stacks: ["HTML", "CSS", "JavaScript"],
    cover: cookinghubCover,
    isRepo: true,
    repoUrl: "https://github.com/ayush-that/CookingHub",
    deployedURL: "https://cooking-hub.vercel.app/",
  },
];

export default projects;
export type TProject = (typeof projects)[0];
