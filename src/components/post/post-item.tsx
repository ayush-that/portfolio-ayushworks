import { Post } from "#site/content";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import PostMetadata from "./post-metadata";
import Tags from "../tags";

const PostItem: React.FC<Post> = ({
  date,
  title,
  description,
  metadata,
  slugAsParams,
  tags,
  cover,
}) => {
  return (
    <li role="listitem" className="border-b pb-4 last:!border-b-0">
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
                priority
                quality={95}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <PostMetadata title={title} metadata={metadata} date={date} />
        </Link>

        <p className={"mb-2 mt-1 line-clamp-2 font-ubuntu text-sm text-muted-foreground"}>
          {description}
        </p>

        <CardContent className="p-0">
          <Tags tags={tags} />
        </CardContent>
      </Card>
    </li>
  );
};

export default PostItem;
