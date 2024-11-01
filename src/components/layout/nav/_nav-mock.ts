import { createId } from "@paralleldrive/cuid2";

export const navData = [
  {
    id: createId(),
    label: "Home",
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

  {
    id: createId(),
    label: "Resume",
    path: "https://drive.google.com/file/d/1KxBowYMX0q8_SPDbwjkATommvreypq1H/view?usp=sharing",
  },

  // {
  //   id: createId(),
  //   label: 'Guests',
  //   path: '/guests',
  // },

  // {
  //   id: createId(),
  //   label: 'Contact',
  //   path: '/contact',
  // },
];

export type NavType = typeof navData;
