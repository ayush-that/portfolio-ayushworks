import { posts } from "#site/content";
import { slug } from "github-slugger";
import { MetadataRoute } from "next";
import { BasePath, getAllTags } from "~/lib/utils";

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

  const tagPages = Object.keys(getAllTags(published)).map((tag) => ({
    url: BasePath(`/tags/${slug(tag)}`),
    lastModified: latestPost,
    changeFrequency: "monthly" as const,
    priority: 0.3,
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
    {
      url: BasePath("/tags"),
      lastModified: latestPost,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...blogPosts,
    ...tagPages,
  ];
}
