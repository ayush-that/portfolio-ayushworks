import { posts } from "#site/content";
import config from "~/config";
import { getSEOTags, JsonLd } from "~/lib/seo";
import BlogPageClient from "./blog-page-client";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `Blog · ${config.authorName}`,
  description:
    "Posts on shipping software: self-hosting on a $2.5 VPS, Docker and Kubernetes, Next.js, Python, computer vision, and getting more out of AI coding tools.",
  canonicalUrlRelative: "/blog",
  keywords: [
    "developer blog",
    "self hosting",
    "VPS",
    "Docker",
    "Kubernetes",
    "Next.js",
    "Python",
    "AI coding tools",
    "shydev blog",
  ],
});

// Reading `searchParams` here would opt the whole page into dynamic rendering
// (a full Next render per request). BlogPageClient already filters on the
// client, so it reads the query string itself and this page stays static.
const BlogPage = () => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <JsonLd
        id="json-ld-blog"
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `https://${config.domainName}/blog#blog`,
          url: `https://${config.domainName}/blog`,
          name: `Blog · ${config.authorName}`,
          inLanguage: "en",
          author: { "@type": "Person", "@id": `https://${config.domainName}/#person` },
          blogPost: sortedPosts
            .filter((post) => post.published)
            .map((post) => ({
              "@type": "BlogPosting",
              "@id": `https://${config.domainName}/blog/${post.slugAsParams}#article`,
              url: `https://${config.domainName}/blog/${post.slugAsParams}`,
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              keywords: post.tags,
            })),
        }}
      />
      <BlogPageClient posts={sortedPosts} />
    </>
  );
};

export default BlogPage;
