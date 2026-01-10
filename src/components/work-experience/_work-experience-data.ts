import { createId } from "@paralleldrive/cuid2";

export type TWorkExperience = {
  id: string;
  company: string;
  website: string;
  role: string;
  description: string;
  stacks: string[];
};

const workExperiences: TWorkExperience[] = [
  {
    id: createId(),
    company: "Bez",
    website: "https://usebez.ai/",
    role: "Software Engineer",
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
  },
  {
    id: createId(),
    company: "CallPrep",
    website: "https://www.callprep.io/",
    role: "Software Engineer (Intern)",
    description:
      "Built a scraper that scraped 60k PDFs (financial docs of banks) / hour, implemented RAG, & built a chatbot.",
    stacks: ["Django", "Celery", "Redis", "React", "Selenium"],
  },
  {
    id: createId(),
    company: "EOD Adventure Park",
    website: "https://student.eodparks.com/",
    role: "Full Stack Developer",
    description:
      "I solo handle the entire software and infra of EOD Adventure Park, Delhi. I built CRM, dashboards, chatbots, landing pages.",
    stacks: ["AWS", "MERN"],
  },
];

export default workExperiences;
