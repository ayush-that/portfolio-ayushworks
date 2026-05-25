"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) return null;

  return (
    <Giscus
      id="comments"
      repo={repo as `${string}/${string}`}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="transparent_dark"
      lang="en"
      loading="lazy"
    />
  );
}
