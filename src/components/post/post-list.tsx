import { Post } from "#site/content";
import React from "react";
import ContentNotFound from "../ui/content-not-found";
import { typo } from "../ui/typograpghy";
import PostItem from "./post-item";
import { cn } from "~/lib/utils";

type PostListProps = {
  posts: Post[];
  showRss?: boolean;
  layout?: "single" | "grid";
};

const PostList: React.FC<PostListProps> = ({ posts, showRss, layout = "grid" }) => {
  return (
    <section aria-label="articles" className="mt-5 space-y-6">
      {showRss && <h2 className={typo({ variant: "h2" })}>Most recent posts</h2>}
      <ol
        className={cn("gap-6", layout === "grid" ? "grid md:grid-cols-2" : "space-y-6")}
        role="list"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={post.slug}
              {...post}
              layout={layout === "single" ? "horizontal" : "vertical"}
            />
          ))
        ) : (
          <ContentNotFound text="No Articles Found" />
        )}
      </ol>
    </section>
  );
};

export default PostList;
