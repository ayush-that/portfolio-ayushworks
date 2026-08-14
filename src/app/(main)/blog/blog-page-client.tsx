"use client";

import { Post } from "#site/content";
import { PostList } from "~/components/post";
import SearchInput from "~/components/search-input";
import { useMemo, useState } from "react";

interface BlogPageClientProps {
  posts: Post[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(term));
  }, [posts, search]);

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-medium">All Publications</h1>
        <SearchInput placeholder="Search posts..." onSearch={setSearch} />
      </div>

      <main id="main-content">
        <PostList posts={filteredPosts} />
      </main>
    </div>
  );
}
