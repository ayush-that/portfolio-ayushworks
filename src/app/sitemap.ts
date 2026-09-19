import { posts } from "#site/content";
import { MetadataRoute } from "next";
import { BasePath } from "~/lib/utils";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = posts.filter((post) => post.published);
  const latestPost = published.reduce(
    (latest, post) => (post.date > latest ? post.date : latest),
    published[0]?.date ?? new Date().toISOString(),
  );

  const blogPosts = published.map((post) => ({
    url: BasePath(`/blog/${post.slugAsParams}`),
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BasePath("/"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: BasePath("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: BasePath("/projects"),
      lastModified: latestPost,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...["/about", "/contact", "/privacy", "/developers"].map((path) => ({
      url: BasePath(path),
      lastModified: latestPost,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...blogPosts,
  ];
}
