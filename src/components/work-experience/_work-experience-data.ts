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
      "Built a multi-agent orchestrator on Vercel AI SDK with Claude Sonnet routing to 6 specialized Gemini agents generating 100+ design variations per batch. Implemented multimodal search across 25,000+ images on Milvus vector DB.",
    stacks: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "GCP",
      "Vercel AI SDK",
      "Redis",
      "Milvus",
      "Docker",
      "Langfuse",
    ],
  },
  {
    id: createId(),
    company: "EOD Adventure Parks",
    website: "https://eodparks.com/",
    role: "Software Engineer",
    description:
      "Scaled to 163K+ pageviews/month and 800+ bookings/week across 4 parks. Built the booking engine, financial reconciliation pipeline, EventCRM, ops dashboard, and a React Native QR scanner app.",
    stacks: [
      "Next.js",
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Razorpay",
      "Inngest",
    ],
  },
];

export default workExperiences;
