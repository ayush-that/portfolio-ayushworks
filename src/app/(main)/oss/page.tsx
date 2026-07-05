import { CheckCircle2, ExternalLink, GitPullRequest } from "lucide-react";
import { getSEOTags } from "~/lib/seo";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: "OSS",
  description: "Merged open-source pull requests by Ayush.",
  canonicalUrlRelative: "/oss",
  keywords: ["open source", "pull requests", "CNCF", "Swift", "portfolio"],
});

const prs = [
  {
    repo: "open-telemetry/opentelemetry-swift-core",
    pr: 78,
    title: "Duplicate instrument registration warning",
    merged: "Jun 30, 2026",
    tier: "Observability",
    href: "https://github.com/open-telemetry/opentelemetry-swift-core/pull/78",
  },
  {
    repo: "agones-dev/agones",
    pr: 4632,
    title: "Install failure debug dump",
    merged: "Jun 24, 2026",
    tier: "Debugging",
    href: "https://github.com/agones-dev/agones/pull/4632",
  },
  {
    repo: "agones-dev/agones",
    pr: 4618,
    title: "Minimal root AGENTS.md",
    merged: "Jun 19, 2026",
    tier: "Docs",
    href: "https://github.com/agones-dev/agones/pull/4618",
  },
  {
    repo: "headlamp-k8s/plugins",
    pr: 777,
    title: "Flux Canaries ApiError crash",
    merged: "Jun 25, 2026",
    tier: "Bug fix",
    href: "https://github.com/headlamp-k8s/plugins/pull/777",
  },
  {
    repo: "headlamp-k8s/plugins",
    pr: 773,
    title: "Flux Next Reconciliation invalid display",
    merged: "Jun 25, 2026",
    tier: "Bug fix",
    href: "https://github.com/headlamp-k8s/plugins/pull/773",
  },
  {
    repo: "headlamp-k8s/plugins",
    pr: 768,
    title: "KEDA plugin i18n",
    merged: "May 29, 2026",
    tier: "i18n",
    href: "https://github.com/headlamp-k8s/plugins/pull/768",
  },
  {
    repo: "headlamp-k8s/plugins",
    pr: 769,
    title: "Karpenter plugin i18n",
    merged: "May 28, 2026",
    tier: "i18n",
    href: "https://github.com/headlamp-k8s/plugins/pull/769",
  },
  {
    repo: "swiftlang/sourcekit-lsp",
    pr: 2688,
    title: "Add Explicit Raw Values docs row",
    merged: "Jun 11, 2026",
    tier: "Docs",
    href: "https://github.com/swiftlang/sourcekit-lsp/pull/2688",
  },
  {
    repo: "swiftlang/sourcekit-lsp",
    pr: 2668,
    title: "Add Explicit Raw Values code action",
    merged: "Jun 2, 2026",
    tier: "IDE tooling",
    href: "https://github.com/swiftlang/sourcekit-lsp/pull/2668",
  },
  {
    repo: "swiftlang/swift-format",
    pr: 1215,
    title: "Trailing comma fix for attributes",
    merged: "Jun 8, 2026",
    tier: "Formatter",
    href: "https://github.com/swiftlang/swift-format/pull/1215",
  },
  {
    repo: "apple/swift-http-types",
    pr: 124,
    title: "W3C Trace Context headers",
    merged: "Jun 1, 2026",
    tier: "HTTP standards",
    href: "https://github.com/apple/swift-http-types/pull/124",
  },
  {
    repo: "swiftlang/vscode-swift",
    pr: 2254,
    title: "Reveal Swift task terminal from status item",
    merged: "Jun 1, 2026",
    tier: "Editor UX",
    href: "https://github.com/swiftlang/vscode-swift/pull/2254",
  },
  {
    repo: "aaif-goose/goose",
    pr: 8300,
    title: "Align hamburger menu with macOS controls",
    merged: "Apr 8, 2026",
    tier: "UI polish",
    href: "https://github.com/aaif-goose/goose/pull/8300",
  },
];

const repoCount = new Set(prs.map((pr) => pr.repo)).size;
const cncfCount = prs.filter((pr) =>
  ["agones-dev/agones", "headlamp-k8s/plugins", "open-telemetry/opentelemetry-swift-core"].includes(
    pr.repo,
  ),
).length;

const OssPage = () => {
  return (
    <main className="!mt-8 space-y-8" id="main-content">
      <section className="space-y-5">
        <div className="flex items-start gap-3">
          <GitPullRequest className="mt-1 size-5 text-ring" aria-hidden />
          <div className="space-y-3">
            <h1 className="font-serif text-3xl">Merged OSS PRs</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              A live-style index of merged pull requests, pulled from my contribution tracker.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border text-center">
          <div className="bg-background p-4">
            <dt className="text-xs text-muted-foreground">Merged</dt>
            <dd className="mt-1 font-serif text-2xl">{prs.length}</dd>
          </div>
          <div className="bg-background p-4">
            <dt className="text-xs text-muted-foreground">Repos</dt>
            <dd className="mt-1 font-serif text-2xl">{repoCount}</dd>
          </div>
          <div className="bg-background p-4">
            <dt className="text-xs text-muted-foreground">CNCF</dt>
            <dd className="mt-1 font-serif text-2xl">{cncfCount}</dd>
          </div>
        </dl>
      </section>

      <ol className="space-y-3" role="list">
        {prs.map((item) => (
          <li key={`${item.repo}-${item.pr}`}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-3 rounded-md border border-border p-4 transition-colors hover:border-ring sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.repo}</span>
                  <span>#{item.pr}</span>
                  <span>{item.tier}</span>
                </div>
                <h2 className="font-serif text-lg leading-snug">{item.title}</h2>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground sm:justify-end">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ring" aria-hidden />
                  {item.merged}
                </span>
                <ExternalLink
                  className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </a>
          </li>
        ))}
      </ol>
    </main>
  );
};

export default OssPage;
