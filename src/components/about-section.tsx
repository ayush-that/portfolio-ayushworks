"use client";

import Image from "next/image";
import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";
import codingImage from "~/assets/images/coding.png";

function getAge() {
  const birth = new Date("2005-03-20T00:00:00+05:30");
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

const AboutSection = () => {
  return (
    <section className="grid gap-8 sm:gap-4 md:grid-cols-3" aria-label="About">
      <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
        <h1 className="font-serif text-2xl sm:text-3xl">Shydev, {getAge()}</h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Product-focused Engineer who ships fast. I turn ideas into polished products and obsess
          over the details that make software feel right.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Currently building{" "}
          <a
            href="https://usebez.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Bez
          </a>
          , the AI Copilot for Jewellers. Multi-agent orchestrator routing Claude Sonnet to 6
          specialized Gemini agents, multimodal search across 25,000+ images, and a custom memory
          system that eliminated 40% duplicate designs.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Before that: scaled{" "}
          <a
            href="https://eodparks.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            EOD Adventure Parks
          </a>{" "}
          to 163K+ pageviews/month and 800+ bookings/week. Built the booking engine, financial
          reconciliation pipeline, EventCRM, ops dashboard, and a React Native QR scanner app.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          15+ Hackathons. <span className="text-white">30+ Freelance Products</span> shipped. Grand
          Finalist in Smart India Hackathon 2024 out of 492,960 participants.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">40K+ Followers</span> across socials. Key Opinion Leader at
          Minimax. Created content for Firecrawl (694K+ views). When I&apos;m not shipping,
          I&apos;m reading, running, or lost in YouTube rabbit holes.
        </p>

        <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
          <span className="text-white">Open to Work</span>: Full-Time, Freelance, or Collabs.{" "}
          <a
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="el-focus-styles text-ring"
          >
            Let&apos;s talk.
          </a>
        </p>
      </div>

      <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block md:h-[360px] md:w-[360px] md:self-center">
        <div className="absolute inset-0 -z-10 size-full rounded-md bg-gradient-to-br from-muted via-secondary to-background opacity-80" />
        <Image
          alt="Locked In"
          src={codingImage}
          placeholder="blur"
          className="size-full -rotate-3 transform rounded-md object-cover shadow-md brightness-90 contrast-125 grayscale saturate-0"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;
