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

  return getSEOTags({
    title: post.title,
    description: post.description,
    canonicalUrlRelative: `/blog/${post.slugAsParams.split("/")}`,
    extraTags: {
      openGraph: {
        title: post.title,
        description: post.description,
        url: `/blog/${post.slug.split("/")}`,
        images: [
          {
            url: `https://${config.domainName}${post.cover}`,
            width: 1200,
            height: 630,
          },
        ],
        locale: "en_US",
        type: "website",
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
