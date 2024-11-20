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
          Ayush Kumar Singh
        </h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">
            About Me <br />
          </span>
          Hello! I'm a developer from Delhi, India. I enjoy programming and
          exploring technology. I've participated in{" "}
          <span className="text-white" ref={annotationRefs[0]}>
            <a href="https://docs.google.com/spreadsheets/d/12_9qHndKpcrtrfCzGFSlu9Cb07TkeHIRHsQtRZdIeJ8/edit?usp=sharing">
              ~15 hackathons
            </a>
          </span>{" "}
          & ideathons and won 4 of them.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          <span className="text-white">
            What I do? <br />
          </span>{" "}
          Currently, I'm handling tech in my agency,{" "}
          <span ref={annotationRefs[1]} className="text-white">
            <a className="text-white" href="https://cryptoniclabs.com/">
              Cryptonic Labs
            </a>
          </span>
          . I'm super active on X where I share my thoughts and{" "}
          <span ref={annotationRefs[2]} className="text-white">
            #BuildInPublic
          </span>
          .{" "}
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          I'm an{" "}
          <span ref={annotationRefs[3]} className="text-white">
            AWS Cloud Club Captain
          </span>
          , a maintainer and contributor of open-source projects. When not
          coding, I read books, go out for a run or binge YouTube.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}></p>

        <p
          className={cn(
            typo({ variant: "paragraph", font: "sans" }),
            "sm:!mt-4"
          )}
        >
          I'm{" "}
          <span ref={annotationRefs[4]} className="text-white">
            open to work
          </span>
          , freelance, or collaborate.{" "}
          <a
            ref={annotationRefs[5] as React.RefObject<HTMLAnchorElement>}
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="text-ring el-focus-styles"
          >
            Contact Me.
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
