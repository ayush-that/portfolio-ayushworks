"use client";

import { Post } from "#site/content";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import BackButton from "~/components/back-btn";
import { MDXContent } from "~/components/mdx";
import { PostMetadata, TableOfContent } from "~/components/post";
import Tags from "~/components/tags";
import LanguageSwitcher from "~/components/language-switcher";
import { cn } from "~/lib/utils";

interface BlogDetailClientProps {
  post: Post;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const { t } = useTranslation(["common", "blog"]);

  return (
    <article className="w-full">
      <div className="flex items-center justify-between">
        <BackButton>{t("common:blog.backToPosts")}</BackButton>
        <LanguageSwitcher />
      </div>
      <div className="mb-6 mt-2 space-y-6">
        <PostMetadata isDetailPage title={post.title} metadata={post.metadata} date={post.date} />

        <TableOfContent toc={post.toc} />

        <div className="relative aspect-video">
          <Image
            src={post.cover}
            alt={post.title}
            placeholder="blur"
            priority
            fill
            quality={95}
            className="size-full rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <main id="main-content" className={cn("mdx-content prose prose-invert max-w-none")}>
        <MDXContent code={post.body} />
      </main>

      <div className="my-4 space-y-1">
        <hr className="!mb-4" />
        <h3 className="font-bold">{t("common:blog.tags")}</h3>
        <Tags tags={post.tags} />
      </div>
    </article>
  );
}
