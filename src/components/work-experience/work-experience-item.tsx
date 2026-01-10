import React from "react";
import { FaExternalLinkAlt, FaGithub, FaPlay } from "react-icons/fa";
import { cn } from "~/lib/utils";
import { CustomLink } from "../mdx";
import { typo } from "../ui/typograpghy";
import { TWorkExperience } from "./_work-experience-data";

type WorkExperienceItemProps = TWorkExperience & {
  isLast?: boolean;
};

const linkClass =
  "!p-0 h-full hover:!text-foreground !flex items-center gap-2 !text-sm !text-ring";

const getLinkIcon = (type: string) => {
  switch (type) {
    case "github":
      return <FaGithub size={12} />;
    case "demo":
      return <FaPlay size={10} />;
    default:
      return <FaExternalLinkAlt size={12} />;
  }
};

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
  company,
  role,
  description,
  stacks,
  links,
  isLast = false,
}) => {
  return (
    <li role="listitem" className="relative pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 size-3 rounded-full border-2 border-ring bg-background" />

      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[5px] top-5 h-[calc(100%+1.5rem)] w-[2px] bg-border" />
      )}

      <div className="space-y-2">
        <hgroup className="space-y-1">
          <h3 className="font-serif text-lg">{company}</h3>
          <p className="text-sm text-ring">{role}</p>
        </hgroup>

        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "line-clamp-3"
          )}
        >
          {description}
        </p>

        <p className="text-xs text-ring" aria-label="tech stack">
          {stacks.join(" / ")}
        </p>

        <div className="!mt-3 flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <CustomLink
              key={link.url}
              aria-label={`visit ${link.label}`}
              href={link.url}
              className={linkClass}
            >
              {getLinkIcon(link.type)}
              <span>{link.label}</span>
            </CustomLink>
          ))}
        </div>
      </div>
    </li>
  );
};

export default WorkExperienceItem;
