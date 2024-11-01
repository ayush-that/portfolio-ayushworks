"use client";
import { useEffect, useRef } from "react";
import { annotate, annotationGroup } from "rough-notation";
import {
  RoughAnnotationConfig,
  RoughAnnotationGroup,
} from "rough-notation/lib/model";

import config from "~/config";
import { useMediaQuery } from "~/hooks";
import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";
import Image from "next/image";
import dubaiCon from "~/assets/images/f-dubai-police.webp";
import { annotationsConfig } from "~/constants/anime";

const AboutSection = () => {
  const isSmallDevice = useMediaQuery("(max-width: 500px)");
  const annotationRefs = annotationsConfig.map(() =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLSpanElement | HTMLAnchorElement>(null)
  );

  useEffect(() => {
    const annotations = annotationsConfig.map((config, index) => {
      const { ref, ...options } = config;
      return annotate(
        annotationRefs[index]!.current!,
        options as RoughAnnotationConfig
      );
    });

    const annotationGroupInstance: RoughAnnotationGroup =
      annotationGroup(annotations);

    if (!isSmallDevice) {
      annotationGroupInstance.show();
    }

    return () => annotationGroupInstance.hide();
  }, [annotationRefs, isSmallDevice]);

  return (
    <section className=" grid md:grid-cols-3 gap-8 sm:gap-4" aria-label="About">
      <div className="space-y-3 md:col-span-2 order-2 sm:order-1">
        <h1 className="font-semibold text-lg sm:text-xl font-ubuntu">
          Hi, I&apos;m Ayush.
        </h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          Self-taught developer with with hands-on experience across{" "}
          <span className="text-white" ref={annotationRefs[0]}>
            15+ hackathons{" "}
          </span>{" "}
          and ideathons, winning 4 of them. I'm an{" "}
          <span ref={annotationRefs[1]} className="text-white">
            AWS Cloud Club Captain
          </span>
          , open-source contributor, and project maintainer.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I{" "}
          <span ref={annotationRefs[2]} className="text-white">
            love building
          </span>{" "}
          tools that are user friendly, simple and scalable.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          When I’m not coding, I enjoy reading,{" "}
          <span ref={annotationRefs[3]} className="text-white">
            making people laugh
          </span>
          , and staying active by running. These experiences outside of tech
          help fuel{" "}
          <span ref={annotationRefs[4]} className="text-white">
            fresh ideas
          </span>
          , which I bring back to my work.
        </p>

        <p
          className={cn(
            typo({ variant: "paragraph", font: "sans" }),
            "sm:!mt-4"
          )}
        >
          I&apos;m currently looking for a new role as a developer.{" "}
          <a
            ref={annotationRefs[5] as React.RefObject<HTMLAnchorElement>}
            href={`mailto:${config.social.email}`}
            aria-label="Hire me"
            className="text-ring el-focus-styles"
          >
            Hire me?
          </a>
        </p>
      </div>

      <div className="relative block sm:hidden md:block aspect-square order-1 sm:order-2">
        <div className="bg-[#00adb5] absolute inset-0 size-full rounded-md -z-10"></div>
        <Image
          alt="Speaking on stage at Dubai police station during a presentation"
          src={dubaiCon}
          placeholder="blur"
          className="rounded-md shadow-md size-full  transform -rotate-3"
          priority
        />
      </div>
    </section>
  );
};

export default AboutSection;
