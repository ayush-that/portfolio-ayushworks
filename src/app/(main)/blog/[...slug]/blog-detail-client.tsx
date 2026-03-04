"use client";

import { Post } from "#site/content";
import Image from "next/image";
import BackButton from "~/components/back-btn";
import Comments from "~/components/comments";
import { MDXContent } from "~/components/mdx";
import { PostMetadata, TableOfContent } from "~/components/post";
import Tags from "~/components/tags";
import { cn } from "~/lib/utils";

interface BlogDetailClientProps {
  post: Post;
  views: number;
}

export default function BlogDetailClient({ post, views }: BlogDetailClientProps) {
  return (
    <article className="w-full">
      <BackButton>Back to posts</BackButton>
      <div className="mb-6 mt-2 space-y-6">
        <PostMetadata
          isDetailPage
          title={post.title}
          metadata={post.metadata}
          date={post.date}
          views={views}
        />

        <TableOfContent toc={post.toc} />

        <div className="relative aspect-video">
          <Image
            src={post.cover}
            alt={post.title}
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
        <h3 className="font-serif text-xl">Tags</h3>
        <Tags tags={post.tags} />
      </div>

      <section className="mt-8">
        <hr className="mb-6" />
        <h2 className="mb-4 font-serif text-2xl">Comments</h2>
        <Comments />
      </section>
    </article>
  );
}
