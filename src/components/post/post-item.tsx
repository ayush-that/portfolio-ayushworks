import { Post } from "#site/content";
import React from "react";

import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import PostMetadata from "./post-metadata";
import Tags from "../tags";

const PostItem: React.FC<Post> = ({ date, title, description, metadata, slugAsParams, tags }) => {
  return (
    <li role="listitem" className="border-b pb-4 last:!border-b-0">
      <Card className="rounded-none border-0 p-0 shadow-none">
        <Link
          href={`/blog/${slugAsParams}`}
          className="el-focus-styles group inline-block w-full rounded-md"
        >
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
