import config from "~/config";
import { getSEOTags, JsonLd } from "~/lib/seo";
import { developersPage } from "~/lib/site-copy";
import { SITE_URL } from "~/lib/mcp";
import { typo } from "~/components/ui/typograpghy";
import { CustomLink } from "~/components/mdx";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `${config.brandName} developer resources · ${config.authorName}`,
  description: developersPage.description,
  canonicalUrlRelative: "/developers",
  keywords: [
    `${config.brandName} developer resources`,
    config.authorName,
    "shydev",
  ],
});

const resources = [
  { href: "/", label: `${config.brandName} home` },
  { href: "/feed.xml", label: `${config.brandName} RSS feed` },
  { href: "/sitemap.xml", label: `${config.brandName} sitemap` },
  { href: "/contact", label: "Contact" },
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
        name: `${config.brandName} developer resources`,
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
