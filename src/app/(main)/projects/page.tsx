import { projects } from "~/components/project";
import config from "~/config";
import { getSEOTags, JsonLd } from "~/lib/seo";
import ProjectsPageClient from "./projects-page-client";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `Projects · ${config.authorName}`,
  description: `${projects.length} shipped projects by ${config.authorName}: applied-AI tools, full-stack web apps, developer utilities and freelance work, each with a live link.`,
  canonicalUrlRelative: "/projects",
  keywords: [
    "software projects",
    "portfolio projects",
    "Next.js projects",
    "AI projects",
    "open source",
    "shydev projects",
  ],
});

const ProjectsPage = () => (
  <>
    <JsonLd
      id="json-ld-projects"
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `https://${config.domainName}/projects#collection`,
        url: `https://${config.domainName}/projects`,
        name: `Projects · ${config.authorName}`,
        inLanguage: "en",
        about: { "@type": "Person", "@id": `https://${config.domainName}/#person` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              name: project.title,
              description: project.description,
              url: project.deployedURL,
              image: project.cover,
              applicationCategory: "WebApplication",
              operatingSystem: "Web",
              author: { "@type": "Person", "@id": `https://${config.domainName}/#person` },
            },
          })),
        },
      }}
    />
    <ProjectsPageClient />
  </>
);

export default ProjectsPage;
