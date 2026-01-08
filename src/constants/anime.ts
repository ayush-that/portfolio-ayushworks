import { RoughAnnotationConfig } from "rough-notation/lib/model";

interface AnnotateConfig extends RoughAnnotationConfig {
  ref: string;
}
export const annotationsConfig: AnnotateConfig[] = [
  {
    ref: "a1Ref",
    type: "underline",
    color: "#fff",
    multiline: true,
    iterations: 1,
  },

  {
    ref: "a2Ref",
    type: "underline",
    color: "white",
    multiline: true,
    iterations: 1,
  },
  {
    ref: "a3Ref",
    type: "underline",
    color: "white",
    multiline: true,
    iterations: 1,
  },
  {
    ref: "a4Ref",
    type: "underline",
    color: "white",
    multiline: true,
    iterations: 1,
  },
  {
    ref: "a5Ref",
    type: "underline",
    color: "white",
    multiline: true,
    iterations: 1,
  },
];
