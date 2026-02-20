import { ProjectList, projects } from "~/components/project";
import SearchInput from "~/components/search-input";
import { getSEOTags } from "~/lib/seo";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `All Projects`,
  description:
    "Explore a digital garden of my projects, where I showcase insights on shipping exceptional products, advancing as a developer, and thriving in the tech industry",
  canonicalUrlRelative: "/projects",
  keywords: ["JavaScript", "TypeScript", "React", "Testing", "Career", "Software Development"],
});

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(decodeURIComponent(resolvedSearchParams.search || "")),
  );

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-medium"> All Projects </h1>
        <SearchInput placeholder="Search projects..." />
      </div>

      <div className="mt-6">
        <ProjectList projects={filteredProjects} metadata={false} />
      </div>
    </div>
  );
};

export default ProjectsPage;
