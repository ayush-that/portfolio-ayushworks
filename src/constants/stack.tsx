import { BiLogoPostgresql } from "react-icons/bi";
import { BsFillBootstrapFill, BsRobot } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import {
  SiCss3,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiKeras,
  SiTensorflow,
  SiCplusplus,
  SiBun,
  SiC,
  SiPython,
  SiSolidity,
  SiHtml5,
  SiFlask,
  SiArchlinux,
  SiMongodb,
} from "react-icons/si";

export type stacksProps = Record<
  string,
  {
    Icon: IconType;
    className: string;
  }
>;

export const FRONTEND_STACKS: stacksProps = {
  JavaScript: { Icon: SiJavascript, className: "" },
  TypeScript: { Icon: SiTypescript, className: "" },
  "Next.js": { Icon: SiNextdotjs, className: "" },
  "React.js": { Icon: SiReact, className: "" },
  TailwindCSS: { Icon: SiTailwindcss, className: "" },
  Bootstrap: { Icon: BsFillBootstrapFill, className: "" },
  "C++": { Icon: SiCplusplus, className: "" },
  CSS: { Icon: SiCss3, className: "" },
  C: { Icon: SiC, className: "" },
  Python: { Icon: SiPython, className: "" },
  Solidity: { Icon: SiSolidity, className: "" },
  HTML: { Icon: SiHtml5, className: "" },
};

export const BACKEND_STACKS = {
  postgreSql: { Icon: BiLogoPostgresql, className: "" },
  "Node.js": { Icon: SiNodedotjs, className: "" },
  Firebase: { Icon: SiFirebase, className: "" },
  "Artificial Intelligence": { Icon: BsRobot, className: "" },
  Nginx: { Icon: SiNginx, className: "" },
  Express: { Icon: SiExpress, className: "" },
  TensorFlow: { Icon: SiTensorflow, className: "" },
  Keras: { Icon: SiKeras, className: "" },
  Bun: { Icon: SiBun, className: "" },
  Flask: { Icon: SiFlask, className: "" },
  "Arch Linux": { Icon: SiArchlinux, className: "" },
  MongoDB: { Icon: SiMongodb, className: "" },
};
