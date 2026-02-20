import { posts } from "#site/content";
import React from "react";
import { CustomLink } from "~/components/mdx";
import { PostList } from "~/components/post";
import { getPostsByTagSlug } from "~/lib/utils";

interface TagDetailPageProps {
  params: Promise<{
    tag: string;
  }>;
}

const TagDetailPage = async ({ params }: TagDetailPageProps) => {
  const { tag } = await params;
  const title = tag.split("-").join(" ");
  const displayPosts = getPostsByTagSlug(posts, tag);

  return (
    <div className="!mt-8">
      <h2 className="rounded-md bg-neutral-800/50 p-2 text-center text-xl">Tagged [ {title} ]</h2>

      <PostList posts={displayPosts} showRss={false} />

      <h3 className="mt-4 text-muted-foreground" id="main-nav">
        Alternatively, <CustomLink href="/tags">choose from all tags</CustomLink> or{" "}
        <CustomLink href="/blog">view all posts</CustomLink>
      </h3>
    </div>
  );
};

export default TagDetailPage;
