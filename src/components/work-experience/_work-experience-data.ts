import { createId } from "@paralleldrive/cuid2";

export type TWorkExperience = {
  id: string;
  company: string;
  role: string;
  description: string;
  stacks: string[];
  links: {
    label: string;
    url: string;
    type: "website" | "demo" | "github" | "project";
  }[];
};

const workExperiences: TWorkExperience[] = [
  {
    id: createId(),
    company: "Bez",
    role: "Cursor for Jewellery Designing",
    description:
      "Helps you to create original jewel designs, visuals, and marketing materials in minutes using AI agents.",
    stacks: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "GCP",
      "OpenAI SDK",
      "FastAPI",
      "Express",
      "Langfuse",
      "BullMQ",
      "Redis",
      "TailwindCSS",
      "shadcn",
    ],
    links: [
      { label: "Website", url: "https://usebez.ai/", type: "website" },
      {
        label: "Demo",
        url: "https://www.youtube.com/watch?v=8NqfMcrGwYQ",
        type: "demo",
      },
    ],
  },
  {
    id: createId(),
    company: "CallPrep",
    role: "Software Engineer",
    description:
      "Built a scraper that scraped 60k PDFs (financial docs of banks) / hour, implemented RAG, & built a chatbot.",
    stacks: ["Django", "Celery", "Redis", "React", "Selenium"],
    links: [
      { label: "Website", url: "https://www.callprep.io/", type: "website" },
      {
        label: "Scraper",
        url: "https://github.com/ayush-that/bank-scraper",
        type: "github",
      },
    ],
  },
  {
    id: createId(),
    company: "EOD Adventure Park",
    role: "Software & Infrastructure Lead",
    description:
      "I solo handle the entire software and infra of EOD Adventure Park, Delhi. I built CRM, dashboards, chatbots, landing pages.",
    stacks: ["AWS", "MERN"],
    links: [
      { label: "Student", url: "https://student.eodparks.com/", type: "project" },
      { label: "Mela", url: "https://mela.eodparks.com/", type: "project" },
      { label: "Agra", url: "https://chaupati.eodparks.com/", type: "project" },
    ],
  },
];

export default workExperiences;
