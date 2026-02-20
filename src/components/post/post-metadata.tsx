import { Post } from "#site/content";
import { Calendar, Timer } from "lucide-react";
import React from "react";
import { cn, formatDate } from "~/lib/utils";
import PostViews from "./post-views";

interface PostMetaProps {
  title: string;
  date: string;
  metadata: Post["metadata"];
  isDetailPage?: boolean;
  views?: number;
}
const PostMetadata: React.FC<PostMetaProps> = ({ title, date, metadata, isDetailPage, views }) => {
  return (
    <hgroup className={cn("space-y-2 p-0", { "p-0": isDetailPage })}>
      <h3
        className={cn(`font-serif text-xl transition-colors group-hover:text-ring`, {
          "text-2xl": isDetailPage,
        })}
      >
        {title}
      </h3>

      <div
        className={cn("flex items-center gap-2", {
          "flex-wrap justify-between": isDetailPage,
        })}
      >
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd
            className={cn("flex items-center gap-1 text-xs text-muted-foreground", {
              "block gap-2 text-sm": isDetailPage,
            })}
          >
            {isDetailPage ? (
              <span>Published on </span>
            ) : (
              <Calendar className={cn("size-3", { "size-4": isDetailPage })} aria-hidden="true" />
            )}
            <time dateTime={date} aria-label={`Published on ${formatDate(date)}`}>
              {formatDate(date)}
            </time>
          </dd>
        </dl>

        <div className="flex items-center gap-3">
          <dl>
            <dt className="sr-only">Reading time</dt>
            <dd
              className={cn("flex items-center gap-1 text-xs text-muted-foreground", {
                "gap-1 text-sm": isDetailPage,
              })}
            >
              <Timer className={cn("size-3", { "size-4": isDetailPage })} aria-hidden="true" />
              <span>{metadata.readingTime} min read</span>
            </dd>
          </dl>
          {isDetailPage && views !== undefined && <PostViews views={views} />}
        </div>
      </div>
    </hgroup>
  );
};

export default PostMetadata;
