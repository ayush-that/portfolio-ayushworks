import { ClassValue } from "clsx";
import { Linkedin } from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { TbBrandDiscord } from "react-icons/tb";
import { SiBuymeacoffee } from "react-icons/si";
import config from "~/config";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const socialsIcons = [
  {
    id: 1,
    label: "Github",
    icon: <FiGithub className="size-[1.2rem]" />,
    href: config.social.github,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
  {
    id: 2,
    label: "Linkedin",
    icon: <Linkedin className="size-[1.2rem]" />,
    href: config.social.linkedin,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
  {
    id: 3,
    label: "Instagram",
    icon: <FaInstagram className="size-[1.2rem]" />,
    href: config.social.instagram,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
  {
    id: 4,
    label: "Discord",
    icon: <TbBrandDiscord className="size-[1.2rem]" />,
    href: config.social.discord,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
  {
    id: 5,
    label: "YouTube",
    icon: <FaYoutube className="size-[1.2rem]" />,
    href: config.social.youtube,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
  {
    id: 6,
    label: "Twitter",
    icon: <FaXTwitter className="size-[1.2rem]" />,
    href: config.social.twitter,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
  {
    id: 7,
    label: "Buy Me a Coffee",
    icon: <SiBuymeacoffee className="size-[1.2rem]" />,
    href: config.social.buymeacoffee,
    className: "hover:bg-muted hover:text-foreground" as ClassValue,
  },
];

const Socials = () => {
  return (
    <ul className="flex items-center gap-2">
      {socialsIcons.map((social) => (
        <li key={social.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={social.href}
                className={cn(
                  "flex size-9 items-center justify-center rounded-md border border-input bg-background ring-offset-background transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  social.className,
                )}
                aria-label={social.label}
                target="_blank"
                rel="external"
              >
                {social.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span>{social.label}</span>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
