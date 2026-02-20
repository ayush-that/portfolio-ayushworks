import { createId } from "@paralleldrive/cuid2";

export const navData = [
  {
    id: createId(),
    label: "$whoami",
    path: "/",
  },
  {
    id: createId(),
    label: "Projects",
    path: "/projects",
  },
  {
    id: createId(),
    label: "Blog",
    path: "/blog",
  },
];

export type NavType = typeof navData;
