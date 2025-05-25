"use client";

import { Post } from "#site/content";
import { useTranslation } from "react-i18next";
import { PostList } from "~/components/post";
import SearchInput from "~/components/search-input";
import LanguageSwitcher from "~/components/language-switcher";
import { useMemo } from "react";

interface BlogPageClientProps {
  posts: Post[];
  searchTerm?: string;
}

export default function BlogPageClient({ posts, searchTerm }: BlogPageClientProps) {
  const { t, i18n } = useTranslation("common");

  // Filter posts based on current language and search term
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      // Extract language from slug (e.g., "posts/en/title" -> "en")
      const postLanguage = post.slug.split("/")[1];
      return postLanguage === i18n.language;
    });

    // Apply search filter if search term exists
    if (searchTerm) {
      const decodedSearchTerm = decodeURIComponent(searchTerm).toLowerCase();
      filtered = filtered.filter((post) => post.title.toLowerCase().includes(decodedSearchTerm));
    }

    return filtered;
  }, [posts, i18n.language, searchTerm]);

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-medium">{t("blog.allPublications")}</h1>
        <div className="flex items-center gap-4">
          <SearchInput />
          <LanguageSwitcher />
        </div>
      </div>

      <PostList posts={filteredPosts} />
    </div>
  );
}
