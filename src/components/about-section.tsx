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
          yo wassup wassup fambruh 😽
        </h1>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          i'm ayush, a developer who attended{" "}
          <span className="text-white" ref={annotationRefs[0]}>
            15+ hackathons{" "}
          </span>{" "}
          and ideathons for free food but ended up winning 4 of them.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          i'm — full of latent, an{" "}
          <span ref={annotationRefs[1]} className="text-white">
            aws cloud club captain
          </span>
          , open-source contributor, and mother of{" "}
          <a className="text-white" href="finveda.xyz">
            finveda.xyz
          </a>
          .
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          i{" "}
          <span ref={annotationRefs[2]} className="text-white">
            love building
          </span>{" "}
          apps that are user friendly, simple and scalable.
        </p>

        <p className={typo({ variant: "paragraph", font: "sans" })}>
          when not coding, i watch brainrot or scroll twitter (please follow
          🙏🏻). i'm{" "}
          <span ref={annotationRefs[3]} className="text-white">
            funny and
          </span>{" "}
          pursuing{" "}
          <span ref={annotationRefs[4]} className="text-white">
            phd in yappology
          </span>{" "}
          and btech it.
        </p>

        <p
          className={cn(
            typo({ variant: "paragraph", font: "sans" }),
            "sm:!mt-4"
          )}
        >
          wanna rizz up your ideas with my development skills???{" "}
          <a
            ref={annotationRefs[5] as React.RefObject<HTMLAnchorElement>}
            href={`mailto:${config.social.email}`}
            aria-label="Hire Me"
            className="text-ring el-focus-styles"
          >
            hire me? ( ͡❛ ͜ʖ ͡❛)
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
