"use client";

import { useState } from "react";
import { ArrowUpRight, CircleDot, GitMerge, GitPullRequest } from "lucide-react";
import SearchInput from "~/components/search-input";
import { contributions, contributionsUpdatedAt } from "~/lib/oss";

const filters = ["all", "merged", "open", "closed", "issues"] as const;
const labels = { all: "All", merged: "Merged", open: "Open", closed: "Closed", issues: "Issues" };

export default function OSSPageClient() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const term = search.trim().toLowerCase();
  const visible = contributions.filter(
    (item) =>
      (filter === "all" ||
        (filter === "issues" ? item.kind === "issue" : item.status === filter)) &&
      `${item.repo} ${item.title} #${item.number}`.toLowerCase().includes(term),
  );

  return (
    <main id="main-content" className="mt-8!">
      <header className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-semibold tracking-tight">All Contributions</h1>
        <SearchInput placeholder="Search contributions..." onSearch={setSearch} />
      </header>

      <section aria-label="Contributions" className="mt-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter contributions">
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`rounded-md border px-3 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${filter === value ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {labels[value]}
            </button>
          ))}
        </div>
        <p role="status" className="my-5 text-xs text-muted-foreground">
          Showing {visible.length} of {contributions.length} contributions
        </p>
        <ul className="divide-y divide-border border-y border-border">
          {visible.map((item) => {
            const Icon =
              item.kind === "issue"
                ? CircleDot
                : item.status === "merged"
                  ? GitMerge
                  : GitPullRequest;
            return (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-sm py-5 transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-ring sm:gap-4"
                >
                  <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="break-words font-mono text-xs text-muted-foreground">
                      {item.repo}
                    </p>
                    <h2 className="text-sm font-medium leading-6 group-hover:underline underline-offset-4">
                      {item.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                      <span className="rounded border border-border px-2 py-0.5 text-foreground">
                        {labels[item.status]}
                      </span>
                      <span>
                        {item.kind === "pr" ? "PR" : "Issue"} #{item.number}
                      </span>
                      <time dateTime={item.createdAt}>{item.createdAt}</time>
                    </div>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-foreground"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
        {visible.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No contributions match. Try another search or filter.
          </p>
        )}
      </section>
      <p className="mt-6 text-xs leading-6 text-muted-foreground">
        Status checked on <time dateTime={contributionsUpdatedAt}>{contributionsUpdatedAt}</time>.{" "}
        Dates show when each contribution was opened. Closed PRs were not merged. Follow each link
        for the latest discussion and status.
      </p>
    </main>
  );
}
