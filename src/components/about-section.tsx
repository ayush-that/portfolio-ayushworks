"use client";
// import { useEffect, useRef } from "react";
// import { annotate, annotationGroup } from "rough-notation";
// import { RoughAnnotationConfig, RoughAnnotationGroup } from "rough-notation/lib/model";

import config from "~/config";
import { useMediaQuery } from "~/hooks";
import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";
import Image from "next/image";
import livethecode from "~/assets/images/live-the-code.webp";
// import { annotationsConfig } from "~/constants/anime";

const AboutSection = () => {
  const isSmallDevice = useMediaQuery("(max-width: 500px)");
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
        <h1 className="font-ubuntu text-lg font-semibold sm:text-xl">
          Ayush Singh <span className="text-italic font-normal text-white">aka shydev</span>
        </h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">
            About Me <br />
          </span>
          Hello! I'm a developer from Delhi, India. I enjoy programming and exploring technology.
          I've participated in{" "}
          <span className="text-white">
            <a href="https://docs.google.com/spreadsheets/d/12_9qHndKpcrtrfCzGFSlu9Cb07TkeHIRHsQtRZdIeJ8/edit?usp=sharing">
              15+ hackathons
            </a>
          </span>{" "}
          & ideathons and won 6 of them.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">
            What I do? <br />
          </span>{" "}
          I've delivered 10+ freelance projects, interned at two startups and failed to build my own
          startup twice. <span className="text-white">#LifeGoesOn</span>. I'm super active on X
          where I share funnies and <span className="text-white">#BuildInPublic</span>.{" "}
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I'm an <span className="text-white">AWS Cloud Club Captain</span>, a maintainer and
          contributor of open-source projects. When not coding, I read books, go out for a run or
          binge YouTube.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}></p>

        <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
          I'm <span className="text-white">open to work</span>, freelance, or collaborate.{" "}
          <a
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="el-focus-styles text-ring"
          >
            Contact Me.
          </a>
        </p>
      </div>

      <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block">
        <div className="absolute inset-0 -z-10 size-full rounded-md bg-[#00adb5]"></div>
        <Image
          alt="Speaking on stage at for a hackathon presentation"
          src={livethecode}
          placeholder="blur"
          className="size-full -rotate-3 transform rounded-md shadow-md"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;
