import { Post } from "#site/content";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import PostMetadata from "./post-metadata";

interface PostItemProps extends Post {
  layout?: "vertical" | "horizontal";
  eager?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
  date,
  title,
  description,
  metadata,
  slugAsParams,
  cover,
  layout = "vertical",
  eager = false,
}) => {
  if (layout === "horizontal") {
    return (
      <li role="listitem">
        <Card className="rounded-none border-0 p-0 shadow-none">
          <Link
            href={`/blog/${slugAsParams}`}
            className="el-focus-styles group flex gap-4 rounded-md"
          >
            <div className="flex-shrink-0 overflow-hidden rounded-md">
              <div className="relative h-20 w-32">
                <Image
                  src={cover}
                  alt={title}
                  fill
                  priority={eager}
                  loading={eager ? undefined : "lazy"}
                  quality={85}
                  className="size-full object-cover"
                  sizes="128px"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <PostMetadata title={title} metadata={metadata} date={date} />
              <p className="mb-2 mt-1 line-clamp-2 font-sans text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </Link>
        </Card>
      </li>
    );
  }

  return (
    <li role="listitem">
      <Card className="rounded-none border-0 p-0 shadow-none">
        <Link
          href={`/blog/${slugAsParams}`}
          className="el-focus-styles group inline-block w-full rounded-md"
        >
          <div className="mb-4 overflow-hidden rounded-md">
            <div className="relative aspect-video w-full">
              <Image
                src={cover}
                alt={title}
                fill
                priority={eager}
                loading={eager ? undefined : "lazy"}
                quality={85}
                className="size-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <PostMetadata title={title} metadata={metadata} date={date} />
        </Link>

        <p className={"mb-2 mt-1 line-clamp-2 font-sans text-sm text-muted-foreground"}>
          {description}
        </p>
      </Card>
    </li>
  );
};

export default PostItem;
