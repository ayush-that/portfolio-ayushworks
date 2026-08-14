import { Post } from "#site/content";
import React from "react";
import config from "~/config";
import { JsonLd } from "~/lib/seo";

const SITE_URL = `https://${config.domainName}`;

const JsonSchemaLD = ({ post }: { post: Post }) => {
  const url = `${SITE_URL}/blog/${post.slugAsParams}`;
  const image = post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`;

  return (
    <>
      <JsonLd
        id={`json-ld-article-${post.slugAsParams}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          headline: post.title,
          name: post.title,
          description: post.description,
          image,
          inLanguage: "en",
          keywords: post.tags,
          wordCount: post.metadata.wordCount,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: config.authorName,
            url: `${SITE_URL}/`,
          },
          publisher: {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: config.authorName,
            url: `${SITE_URL}/`,
          },
        }}
      />
      <JsonLd
        id={`json-ld-breadcrumb-${post.slugAsParams}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
    </>
  );
};

export default JsonSchemaLD;
