import config from "~/config";
import { getSEOTags, JsonLd } from "~/lib/seo";
import { developersPage } from "~/lib/site-copy";
import { SITE_URL } from "~/lib/mcp";
import { typo } from "~/components/ui/typograpghy";
import { CustomLink } from "~/components/mdx";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `${config.brandName} MCP server and developer resources · ${config.authorName}`,
  description: developersPage.description,
  canonicalUrlRelative: "/developers",
  keywords: [
    `${config.brandName} MCP server`,
    `${config.brandName} OpenAPI`,
    `${config.brandName} developer portal`,
    `${config.brandName} auth docs`,
    "AyushWorks API",
    config.authorName,
    "shydev",
  ],
});

const resources = [
  { href: "/developers", label: `${config.brandName} developer portal` },
  { href: "/mcp", label: `${config.brandName} MCP server` },
  { href: "/.well-known/mcp.json", label: `${config.brandName} MCP manifest` },
  {
    href: "/.well-known/mcp/server-card.json",
    label: `${config.brandName} MCP server card`,
  },
  { href: "/openapi.json", label: `${config.brandName} OpenAPI spec` },
  { href: "/auth.md", label: `${config.brandName} auth docs` },
  { href: "/llms.txt", label: `${config.brandName} llms.txt` },
];

const DevelopersPage = () => (
  <>
    <JsonLd
      id="json-ld-developers"
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE_URL}/developers#page`,
        url: `${SITE_URL}/developers`,
        name: `${config.brandName} MCP server and developer resources`,
        description: developersPage.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
      }}
    />
    <main id="main-content" className="mt-8! max-w-3xl space-y-4">
      <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
        {developersPage.title}
      </h1>
      {developersPage.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className={typo({ variant: "paragraph", font: "sans" })}>
          {paragraph}
        </p>
      ))}
      <h2 className={typo({ variant: "h2" })}>{config.brandName} endpoints</h2>
      <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
        {resources.map((resource) => (
          <li key={resource.href}>
            <CustomLink href={resource.href}>{resource.label}</CustomLink>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export default DevelopersPage;
