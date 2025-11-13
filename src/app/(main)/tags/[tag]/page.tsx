"use client";

import { posts } from "#site/content";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomLink } from "~/components/mdx";
import { PostList } from "~/components/post";
import { getPostsByTagSlug } from "~/lib/utils";

interface TagDetailPageProps {
  params: {
    tag: string;
  };
}

const TagDetailPage: React.FC<TagDetailPageProps> = ({ params }) => {
  const { tag } = params;
  const { i18n } = useTranslation();
  const title = tag.split("-").join(" ");

  // Filter posts by current language first, then by tag
  const displayPosts = useMemo(() => {
    const languageFilteredPosts = posts.filter((post) => {
      const postLanguage = post.slug.split("/")[1];
      return postLanguage === i18n.language;
    });

    return getPostsByTagSlug(languageFilteredPosts, tag);
  }, [i18n.language, tag]);

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
