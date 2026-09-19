import { posts } from "#site/content";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXContent } from "~/components/mdx";
import { JsonSchemaLD, PostMetadata, TableOfContent } from "~/components/post";
import { getSEOTags } from "~/lib/seo";
import { cn } from "~/lib/utils";
import config from "~/config";
import "~/styles/mdx.css";

interface BlogPostParams {
  params: Promise<{
    slug: string[];
  }>;
}

export const dynamicParams = false;

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  if (post === undefined || !post.published) {
    return notFound();
  }

  return post;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export async function generateMetadata({ params }: BlogPostParams) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  const url = `/blog/${post.slugAsParams}`;
  const cover = post.cover.startsWith("http")
    ? post.cover
    : `https://${config.domainName}${post.cover}`;

  return getSEOTags({
    title: post.title,
    description: post.description,
    canonicalUrlRelative: url,
    ogImage: cover,
    extraTags: {
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://${config.domainName}${url}`,
        siteName: config.appTitle,
        images: [{ url: cover, width: 1200, height: 630, alt: post.title }],
        locale: "en_US",
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.date,
        authors: [`https://${config.domainName}/`],
      },
    },
  });
}

export default async function BlogDetail({ params }: BlogPostParams) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  return (
    <>
      <JsonSchemaLD post={post} />
      <article className="w-full">
        <div className="mb-6 mt-2 space-y-6">
          <PostMetadata
            isDetailPage
            title={post.title}
            metadata={post.metadata}
            date={post.date}
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

        <main id="main-content" className={cn("mdx-content prose max-w-none")}>
          <MDXContent code={post.body} />
        </main>
      </article>
    </>
  );
}
