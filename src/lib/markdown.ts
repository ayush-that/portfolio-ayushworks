import { posts } from "#site/content";
import { slug } from "github-slugger";
import projects from "~/components/project/_project-mock";
import config from "~/config";
import { formatDate, getAllTags, sortPosts } from "~/lib/utils";
import { developersPage, trustPages } from "~/lib/site-copy";

const SITE_URL = `https://${config.domainName}`;

const published = () => sortPosts(posts.filter((post) => post.published));

const postLine = (post: (typeof posts)[number]) =>
  `- [${post.title}](${SITE_URL}/blog/${post.slugAsParams}) (${formatDate(post.date)}): ${post.description}`;

const footer = `\n---\n\nThis site serves Markdown to agents via \`Accept: text/markdown\` content negotiation on every page. Machine-readable index: [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt) · Sitemap: [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml) · RSS: [${SITE_URL}/feed.xml](${SITE_URL}/feed.xml) · ${config.brandName} MCP server: \`${SITE_URL}/mcp\` · Developer portal: [${SITE_URL}/developers](${SITE_URL}/developers) · OpenAPI: [${SITE_URL}/openapi.json](${SITE_URL}/openapi.json)\n`;

function homeMarkdown(): string {
  return [
    `# ${config.appTitle}`,
    "",
    config.appDescription,
    "",
    "Product-focused engineer who ships fast. 69+ freelance products shipped, 15+ hackathon wins, 1 product sold (Trendscreener.ai). Works across applied AI (multimodal RAG, agents), full-stack web, and mobile — mostly TypeScript, Python, Go, Rust, C++, and Next.js. Open to full-time, freelance, and collaborations.",
    "",
    "## Featured Projects",
    "",
    ...projects
      .slice(0, 4)
      .map((p) => `- [${p.title}](${p.deployedURL ?? p.repoUrl}): ${p.description}`),
    "",
    `All projects: ${SITE_URL}/projects`,
    "",
    "## Most recent posts",
    "",
    ...published().slice(0, 4).map(postLine),
    "",
    `All posts: ${SITE_URL}/blog`,
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Projects](${SITE_URL}/projects)`,
    `- [Blog](${SITE_URL}/blog)`,
    `- [Tags](${SITE_URL}/tags)`,
    `- [Privacy](${SITE_URL}/privacy)`,
    `- [Resume](${SITE_URL}/resume)`,
    `- [Developer resources](${SITE_URL}/developers)`,
    footer,
  ].join("\n");
}

function blogIndexMarkdown(): string {
  return [
    `# Blog · ${config.authorName}`,
    "",
    "Writing on engineering, AI, self-hosting, and the developer ecosystem.",
    "",
    ...published().map(postLine),
    footer,
  ].join("\n");
}

function postMarkdown(slugAsParams: string): string | null {
  const post = published().find((p) => p.slugAsParams === slugAsParams);
  if (!post) return null;
  return [
    `# ${post.title}`,
    "",
    `By ${config.authorName} · ${formatDate(post.date)} · Tags: ${post.tags.join(", ")}`,
    "",
    post.description,
    "",
    post.raw.trim(),
    footer,
  ].join("\n");
}

function projectsMarkdown(): string {
  return [
    `# Projects · ${config.authorName}`,
    "",
    `${projects.length} shipped projects: applied-AI tools, full-stack web apps, developer utilities and freelance work.`,
    "",
    ...projects.map((p) =>
      [
        `## ${p.title}`,
        "",
        p.description,
        "",
        `Stack: ${p.stacks.join(", ")}`,
        p.deployedURL ? `Live: ${p.deployedURL}` : null,
        p.isRepo && p.repoUrl ? `Source: ${p.repoUrl}` : null,
        "",
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    ),
    footer,
  ].join("\n");
}

function tagsMarkdown(): string {
  const tags = getAllTags(published());
  return [
    `# Tags · ${config.authorName}`,
    "",
    ...Object.entries(tags).map(
      ([tag, count]) => `- [${tag}](${SITE_URL}/tags/${slug(tag)}): ${count} post(s)`,
    ),
    footer,
  ].join("\n");
}

function tagMarkdown(tagSlug: string): string | null {
  const matching = published().filter((post) => post.tags.some((t) => slug(t) === tagSlug));
  if (matching.length === 0) return null;
  return [`# Posts tagged "${tagSlug}"`, "", ...matching.map(postLine), footer].join("\n");
}

function trustPageMarkdown(key: string): string | null {
  const page = key === "developers" ? developersPage : trustPages[key];
  if (!page) return null;
  return [`# ${page.title}`, "", ...page.paragraphs.flatMap((p) => [p, ""]), footer].join("\n");
}

export function notFoundMarkdown(pathname: string): string {
  return [
    `# 404 — no page at \`${pathname}\``,
    "",
    `There is no page at that path on ${SITE_URL}. Where to look instead:`,
    "",
    `- [Homepage](${SITE_URL}/)`,
    `- [Site index for LLMs](${SITE_URL}/llms.txt)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Blog archive](${SITE_URL}/blog)`,
    `- [Projects](${SITE_URL}/projects)`,
    `- [Contact](${SITE_URL}/contact)`,
    `- [Developer resources](${SITE_URL}/developers)`,
    "",
    `Blog posts live at \`/blog/<slug>\` and tag pages at \`/tags/<tag>\`.`,
    footer,
  ].join("\n");
}

// Markdown representation for a site pathname, or null when no page exists.
export function markdownForPath(pathname: string): string | null {
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);

  if (parts.length === 0) return homeMarkdown();
  if (parts.length === 1) {
    if (parts[0] === "blog") return blogIndexMarkdown();
    if (parts[0] === "projects") return projectsMarkdown();
    if (parts[0] === "tags") return tagsMarkdown();
    if (parts[0] === "developers") return trustPageMarkdown("developers");
    return trustPageMarkdown(parts[0]);
  }
  if (parts.length === 2 && parts[0] === "blog") return postMarkdown(parts[1]);
  if (parts.length === 2 && parts[0] === "tags") return tagMarkdown(parts[1]);
  return null;
}
