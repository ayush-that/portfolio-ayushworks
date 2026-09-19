import { posts } from "#site/content";
import projects from "~/components/project/_project-mock";
import config from "~/config";
import { formatDate, sortPosts } from "~/lib/utils";
import { developersPage, trustPages } from "~/lib/site-copy";

const SITE_URL = `https://${config.domainName}`;

const published = () => sortPosts(posts.filter((post) => post.published));

const postLine = (post: (typeof posts)[number]) =>
  `- [${post.title}](${SITE_URL}/blog/${post.slugAsParams}) (${formatDate(post.date)}): ${post.description}`;

const footer = `\n---\n\nSitemap: [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml) · RSS: [${SITE_URL}/feed.xml](${SITE_URL}/feed.xml)\n`;

function homeMarkdown(): string {
  return [
    `# ${config.appTitle}`,
    "",
    config.appDescription,
    "",
    "Product-focused engineer who ships fast. 69+ freelance products shipped, 15+ hackathon wins, 1 product sold (Trendscreener.ai). Works across AI (inference, agents), full-stack web and mobile apps at scale — mostly TypeScript, Python, Go, Rust, C++, and Next.js. Open to full-time, freelance, and collaborations.",
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
    `- [Privacy](${SITE_URL}/privacy)`,
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
    `By ${config.authorName} · ${formatDate(post.date)}`,
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
    `${projects.length} shipped projects: AI tools, full-stack web and mobile apps at scale, developer utilities and freelance work.`,
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
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Blog archive](${SITE_URL}/blog)`,
    `- [Projects](${SITE_URL}/projects)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
    `Blog posts live at \`/blog/<slug>\`.`,
    footer,
  ].join("\n");
}

export function markdownForPath(pathname: string): string | null {
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);

  if (parts.length === 0) return homeMarkdown();
  if (parts.length === 1) {
    if (parts[0] === "blog") return blogIndexMarkdown();
    if (parts[0] === "projects") return projectsMarkdown();
    if (parts[0] === "developers") return trustPageMarkdown("developers");
    return trustPageMarkdown(parts[0]);
  }
  if (parts.length === 2 && parts[0] === "blog") return postMarkdown(parts[1]);
  return null;
}
