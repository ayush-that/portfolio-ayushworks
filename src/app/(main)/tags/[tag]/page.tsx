import { posts } from "#site/content";
import { slug } from "github-slugger";
import { notFound } from "next/navigation";
import React from "react";
import { CustomLink } from "~/components/mdx";
import { PostList } from "~/components/post";
import config from "~/config";
import { getSEOTags } from "~/lib/seo";
import { getAllTags, getPostsByTagSlug } from "~/lib/utils";

interface TagDetailPageProps {
  params: Promise<{
    tag: string;
  }>;
}

const published = posts.filter((post) => post.published);
const tagNameBySlug = new Map(Object.keys(getAllTags(published)).map((t) => [slug(t), t]));

export const dynamicParams = false;

export function generateStaticParams(): { tag: string }[] {
  return [...tagNameBySlug.keys()].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagDetailPageProps) {
  const { tag } = await params;
  const name = tagNameBySlug.get(tag);

  if (!name) return getSEOTags({ title: "Tag not found", canonicalUrlRelative: `/tags/${tag}` });

  const count = getPostsByTagSlug(published, tag).length;

  return getSEOTags({
    title: `${name} posts · ${config.authorName}`,
    description: `${count} ${count === 1 ? "post" : "posts"} tagged ${name} on ayushworks.com: notes, walkthroughs and lessons from building with ${name}.`,
    keywords: [name, `${name} blog`, `${name} tutorial`],
    canonicalUrlRelative: `/tags/${tag}`,
  });
}

const TagDetailPage = async ({ params }: TagDetailPageProps) => {
  const { tag } = await params;
  const name = tagNameBySlug.get(tag);

  if (!name) notFound();

  const displayPosts = getPostsByTagSlug(published, tag);

  return (
    <main id="main-content" className="mt-8!">
      <h1 className="rounded-md bg-neutral-800/50 p-2 text-center text-xl capitalize">
        Posts tagged {name}
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        {displayPosts.length} {displayPosts.length === 1 ? "post" : "posts"} about {name}, written
        while building and shipping side projects.{" "}
        {displayPosts.length === 1
          ? `Read it below, or browse everything else I have published.`
          : `They are listed newest first.`}
      </p>

      <PostList posts={displayPosts} showRss={false} />

      <h2 className="mt-4 text-muted-foreground" id="main-nav">
        Alternatively, <CustomLink href="/tags">choose from all tags</CustomLink> or{" "}
        <CustomLink href="/blog">view all posts</CustomLink>
      </h2>
    </main>
  );
};

export default TagDetailPage;
