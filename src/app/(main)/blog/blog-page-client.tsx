"use client";

import { Post } from "#site/content";
import { PostList } from "~/components/post";
import SearchInput from "~/components/search-input";
import { useMemo } from "react";

interface BlogPageClientProps {
  posts: Post[];
  searchTerm?: string;
}

export default function BlogPageClient({ posts, searchTerm }: BlogPageClientProps) {
  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;

    const decodedSearchTerm = decodeURIComponent(searchTerm).toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(decodedSearchTerm));
  }, [posts, searchTerm]);

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-medium">All Publications</h1>
        <SearchInput />
      </div>

      <PostList posts={filteredPosts} />
    </div>
  );
}
