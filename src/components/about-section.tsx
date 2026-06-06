"use client";

import Image from "next/image";
import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";

// ?v= busts the Cloudflare edge cache + next/image cache when the image is re-uploaded.
const codingImage = `${config.cdnUrl}/site/coding.webp?v=2`;

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
        <h1 className="font-serif text-2xl sm:text-3xl">{`Shydev, ${getAge()}`}</h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Product-focused Engineer who ships fast. I turn ideas into polished products and obsess
          over the details that make software feel right.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I’ve worked on applied AI, multimodal RAG, full-stack web apps, and mobile apps. Mostly
          with TypeScript, Python, or whatever gets the job done.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <a
            href="https://docs.google.com/spreadsheets/d/12_9qHndKpcrtrfCzGFSlu9Cb07TkeHIRHsQtRZdIeJ8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline"
          >
            15+ Hackathons
          </a>
          . <span className="text-white">69+ Freelance Products</span> shipped. 2 Startup
          Internships. 2 failed Startups of my own, each one worth the lessons.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">42.0K+ Followers</span> across socials. When I’m not
          shipping, I’m either exploring niche topics (that normies don’t care about), running,
          sleeping, eating, talking to my side chicks or doing your mom.
        </p>

        <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
          <span className="text-white">Open to Work</span>: Full-Time, Freelance, or Collabs.{" "}
          <a
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="el-focus-styles text-ring"
          >
            Let’s talk.
          </a>
        </p>
      </div>

      <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block md:h-[360px] md:w-[360px] md:self-center">
        <Image
          alt="Locked In"
          src={codingImage}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="size-full rounded-md object-cover shadow-md"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;
