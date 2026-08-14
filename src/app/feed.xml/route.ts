import { posts } from "#site/content";
import RSS from "rss";
import config from "~/config";
import { BasePath } from "~/lib/utils";

export async function GET() {
  const feed = new RSS({
    title: config.appTitle,
    description: config.appDescription,
    generator: "RSS for Personal Portfolio",
    feed_url: BasePath("/feed.xml"),
    site_url: BasePath("/"),
    managingEditor: `${config.social.email} (${config.authorName})`,
    webMaster: `${config.social.email} (${config.authorName})`,
    copyright: `Copyright ${new Date().getFullYear().toString()}, ${config.authorName}`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const publishedPosts = posts.filter((post) => post.published);

  publishedPosts
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((post) => {
      feed.item({
        title: post.title,
        url: BasePath(`/blog/${post.slugAsParams}`),
        date: post.date,
        description: post.description,
        categories: post.tags,
        author: config.authorName,
      });
    });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
