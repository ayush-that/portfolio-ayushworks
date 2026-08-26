import type { Metadata } from "next";
import config from "~/config";

const SITE_URL = `https://${config.domainName}`;
const OG_IMAGE = `${SITE_URL}/og.png`;

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  ogImage,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string;
  ogImage?: string;
  extraTags?: Record<string, unknown>;
} = {}) => {
  const resolvedTitle = title || config.appTitle;
  const resolvedDescription = description || config.appDescription;
  const image = ogImage || OG_IMAGE;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords || [
      "AyushWorks",
      "ayushworks.com",
      "Ayush Singh",
      "shydev",
      "AyushWorks MCP server",
      "software engineer portfolio",
      "full stack developer",
      "applied AI engineer",
      "Next.js",
      "TypeScript",
      "Python",
      "self hosting",
      "developer blog",
    ],
    applicationName: config.appName,
    authors: [{ name: config.authorName, url: SITE_URL }],
    creator: config.authorName,
    publisher: config.authorName,

    icons: {
      icon: `${config.cdnUrl}/site/logo.png`,
      apple: `${config.cdnUrl}/site/logo.png`,
    },

    metadataBase: new URL(
      process.env.NODE_ENV === "development" ? "http://localhost:3000/" : `${SITE_URL}/`,
    ),

    alternates: {
      canonical: canonicalUrlRelative || "/",
      types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
    },

    openGraph: {
      title: openGraph?.title || resolvedTitle,
      description: openGraph?.description || resolvedDescription,
      url: openGraph?.url || `${SITE_URL}${canonicalUrlRelative || "/"}`,
      siteName: config.appTitle,
      images: [{ url: image, width: 1200, height: 630, alt: config.appTitle }],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      title: openGraph?.title || resolvedTitle,
      description: openGraph?.description || resolvedDescription,
      card: "summary_large_image",
      site: "@shydev69",
      creator: "@shydev69",
      images: [image],
    },

    ...extraTags,
  } satisfies Metadata;
};

export const JsonLd = ({ id, data }: { id: string; data: Record<string, unknown> }) => (
  <script
    id={id}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export const renderSchemaTags = () => (
  <JsonLd
    id="schema-person"
    data={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: config.brandName,
          alternateName: [config.appTitle, config.authorName, "shydev"],
          description: config.appDescription,
          inLanguage: "en",
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: config.brandName,
          legalName: config.authorName,
          url: `${SITE_URL}/`,
          logo: `${config.cdnUrl}/site/logo.png`,
          email: config.social.email,
          address: {
            "@type": "PostalAddress",
            addressCountry: config.location.countryCode,
            addressRegion: config.location.country,
          },
          founder: { "@id": `${SITE_URL}/#person` },
          sameAs: [
            config.social.github,
            config.social.linkedin,
            config.social.twitter,
            config.social.youtube,
            config.social.instagram,
          ],
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: config.authorName,
          alternateName: ["shydev", config.brandName],
          description: config.appDescription,
          url: `${SITE_URL}/`,
          image: `${config.cdnUrl}/site/logo.png`,
          jobTitle: config.appDesignation,
          email: `mailto:${config.social.email}`,
          address: {
            "@type": "PostalAddress",
            addressCountry: config.location.countryCode,
            addressRegion: config.location.country,
          },
          worksFor: { "@id": `${SITE_URL}/#organization` },
          knowsAbout: [
            "Full-stack web development",
            "Applied AI",
            "Next.js",
            "TypeScript",
            "Python",
            "Docker",
            "Kubernetes",
            "Self-hosting",
          ],
          sameAs: [
            config.social.github,
            config.social.linkedin,
            config.social.twitter,
            config.social.youtube,
            config.social.instagram,
          ],
        },
      ],
    }}
  />
);
