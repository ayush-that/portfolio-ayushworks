"use client";

import { useMemo, useState } from "react";
import { ProjectList, projects } from "~/components/project";
import SearchInput from "~/components/search-input";

export default function ProjectsPageClient() {
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((project) => project.title.toLowerCase().includes(term));
  }, [search]);

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-semibold tracking-tight"> All Projects </h1>
        <SearchInput placeholder="Search projects..." onSearch={setSearch} />
      </div>

      <main id="main-content" className="mt-6">
        <ProjectList projects={filteredProjects} metadata={false} />
      </main>
    </div>
  );
}
