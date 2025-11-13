"use client";
// import { useEffect, useRef } from "react";
// import { annotate, annotationGroup } from "rough-notation";
// import { RoughAnnotationConfig, RoughAnnotationGroup } from "rough-notation/lib/model";

import config from "~/config";
import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";
import Image from "next/image";
import codingImage from "~/assets/images/coding.jpeg";
// import { annotationsConfig } from "~/constants/anime";

const AboutSection = () => {
  // const annotationRefs = annotationsConfig.map(() =>
  //   useRef<HTMLSpanElement | HTMLAnchorElement>(null)
  // );

  // useEffect(() => {
  //   const annotations = annotationsConfig
  //     .map((config, index) => {
  //       const element = annotationRefs[index]?.current;
  //       if (!element) return null;

  //       const { ref, ...options } = config;
  //       return annotate(element, options as RoughAnnotationConfig);
  //     })
  //     .filter((annotation): annotation is NonNullable<typeof annotation> => annotation !== null);

  //   if (annotations.length === 0) return;

  //   const annotationGroupInstance: RoughAnnotationGroup = annotationGroup(annotations);

  //   if (!isSmallDevice) {
  //     annotationGroupInstance.show();
  //   }

  //   return () => annotationGroupInstance.hide();
  // }, [annotationRefs, isSmallDevice]);

  return (
    <section className="grid gap-8 sm:gap-4 md:grid-cols-3" aria-label="About">
      <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
        <h1 className="font-ubuntu text-lg font-semibold sm:text-xl">Shydev</h1>

        <div className="space-y-1">
          <p className={cn(typo({ variant: "paragraph", font: "sans" }), "text-white")}>
            Last Updated: 1 February 2025
          </p>
          <p className={typo({ variant: "paragraph", font: "sans" })}>
            Hello! I&apos;m a product-focused engineer from Delhi, India. I love turning ideas into
            polished experiences and exploring whatever new technology ships next.
          </p>
        </div>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I&apos;ve participated in{" "}
          <span className="text-white">
            <a href="https://docs.google.com/spreadsheets/d/12_9qHndKpcrtrfCzGFSlu9Cb07TkeHIRHsQtRZdIeJ8/edit?usp=sharing">
              15+ hackathons
            </a>
          </span>{" "}
          and ideathons, and I&apos;m proud to have won six of them. These sprints keep me sharp,
          collaborative, and hungry to ship fast.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Beyond events, I&apos;ve delivered 10+ freelance products end-to-end, interned at two
          startups, and even failed twice while building my own—each one taught me something worth
          sharing on <span className="text-white">#BuildInPublic</span>.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I&apos;m an <span className="text-white">AWS Cloud Club Captain</span>, maintain
          open-source projects, and mentor builders whenever I can. When I&apos;m not coding,
          you&apos;ll catch me reading, running, or deep in a YouTube rabbit hole.
        </p>

        <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
          I&apos;m <span className="text-white">open to work</span>, freelance, or collaborate.{" "}
          <a
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="el-focus-styles text-ring"
          >
            Contact Me.
          </a>
        </p>
      </div>

      <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block md:h-[360px] md:w-[360px] md:self-center">
        <div className="absolute inset-0 -z-10 size-full rounded-md bg-[#00adb5]"></div>
        <Image
          alt="Locked In"
          src={codingImage}
          placeholder="blur"
          className="size-full -rotate-3 transform rounded-md shadow-md"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;
