"use client";

import { Post, posts } from "#site/content";
import { useTranslation } from "react-i18next";
import { CustomLink } from "~/components/mdx";
import { Tag } from "~/components/tags";
import { getAllTags, sortedTagsCount } from "~/lib/utils";
import { useMemo } from "react";

type OrganizedPost = Record<string, Post[]>;

const TagsPage = () => {
  const { i18n } = useTranslation();
  const languageFilteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const postLanguage = post.slug.split("/")[1];
      return postLanguage === i18n.language;
    });
  }, [i18n.language]);

  const tags = getAllTags(languageFilteredPosts);
  const sortedTags = sortedTagsCount(tags);

  function organizePostsByTag(posts: Post[]): OrganizedPost {
    const organizedPosts: { [key: string]: Post[] } = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!organizedPosts[tag]) {
          organizedPosts[tag] = [];
        }
        organizedPosts[tag].push(post);
      });
    });

    const sortedKeys = Object.keys(organizedPosts).sort();
    const result: OrganizedPost = {};

    sortedKeys.forEach((key) => {
      result[key] = organizedPosts[key];
    });

    return result;
  }

  const result: OrganizedPost = organizePostsByTag(languageFilteredPosts);

  return (
    <div className="!mt-8 grid items-start gap-4 md:grid-cols-3">
      <main id="main-content" className="order-2 md:order-1 md:col-span-2">
        <h3 className="mb-4 text-lg font-medium">Posts by Tag (A-Z)</h3>

        {Object.keys(result).map((tag) => (
          <section
            key={tag}
            aria-labelledby={`posts-by-tag ${tag}-title`}
            className="mb-4 space-y-2 border-b pb-4 last:border-none"
          >
            <h3 id={`${tag}-title`} className="text-base font-medium capitalize">
              {tag}
            </h3>

            <ul role="list" className="space-y-1 sm:list-inside sm:list-disc">
              {result[tag].map((post, index) => (
                <li key={index} className="sm:ps-2">
                  <CustomLink href={`/blog/${post.slugAsParams}`}>{post.title}</CustomLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <div className="top-4 order-1 space-y-1 rounded-md bg-neutral-800/50 p-2 text-xl sm:sticky md:order-2">
        <h2 className="text-center uppercase">All Tags</h2>
        <ul role="list" className="flex flex-wrap justify-center gap-2 pb-1">
          {sortedTags.map((tag, index) => (
            <Tag key={index} tag={tag} count={tags[tag]} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsPage;
