import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { JsonSchemaLD } from "~/components/post";
import { getSEOTags } from "~/lib/seo";
import config from "~/config";
import "~/styles/mdx.css";
import BlogDetailClient from "./blog-detail-client";

interface BlogPostParams {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  if (post === undefined || !post.published) {
    return notFound();
  }

  return post;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
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
    keywords: post.tags,
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
        tags: post.tags,
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
      <BlogDetailClient post={post} />
    </>
  );
}
