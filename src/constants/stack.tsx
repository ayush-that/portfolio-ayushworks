import { BiLogoPostgresql } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiCplusplus,
  SiPython,
  SiSolidity,
  SiMongodb,
  SiDocker,
  SiRedis,
  SiAmazonwebservices,
  SiGooglecloud,
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
  "React Native": { Icon: SiReact, className: "" },
  TailwindCSS: { Icon: SiTailwindcss, className: "" },
  "C++": { Icon: SiCplusplus, className: "" },
  Python: { Icon: SiPython, className: "" },
  Solidity: { Icon: SiSolidity, className: "" },
};

export const BACKEND_STACKS = {
  PostgreSQL: { Icon: BiLogoPostgresql, className: "" },
  "Node.js": { Icon: SiNodedotjs, className: "" },
  Firebase: { Icon: SiFirebase, className: "" },
  MongoDB: { Icon: SiMongodb, className: "" },
  Redis: { Icon: SiRedis, className: "" },
  Milvus: { Icon: BsRobot, className: "" },
  Express: { Icon: SiExpress, className: "" },
  Docker: { Icon: SiDocker, className: "" },
  AWS: { Icon: SiAmazonwebservices, className: "" },
  GCP: { Icon: SiGooglecloud, className: "" },
};
