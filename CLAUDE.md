# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev              # Runs Next.js dev server + Velite content watcher in parallel
pnpm build            # npm install --legacy-peer-deps && sequential build:content then build:next
pnpm dev:next         # Next.js dev server only
pnpm dev:content      # Velite content watcher only
pnpm build:content    # velite --clean (regenerates .velite/)
pnpm build:next       # next build
pnpm format           # Prettier (ts, tsx, md, mdx, json, css)
```

No test runner or linter is configured in this project.

## Architecture

### Content Pipeline

Blog posts live in `src/content/posts/[locale]/*.mdx` (en, es, fr, de, hi, ja, ko, zh). **Velite** processes MDX files into typed data output at `.velite/` (gitignored). The `#site/content` path alias resolves to `.velite/`. Rehype plugins handle slug generation, code syntax highlighting (shiki with catppuccin-mocha theme), external link behavior, and autolinked headings.

### Internationalization

Uses i18next with browser language detection. UI translations are in `src/locales/[locale]/common.json` and `blog.json`. Blog content is translated per-locale in the content directory. Translation management uses Lingo.dev (config in `i18n.json`). Source language is English.

### Data Layer

- **Prisma** with PostgreSQL. Schema has a single `Views` model (slug + count). Client singleton in `src/server/db.ts`.
- **Views tracking** actually uses the **Simple Analytics API** (not Prisma directly) — see `src/app/api/views/[slug]/route.ts`.
- **Contact form** posts to Google Sheets via NoCode API.
- Client-side data fetching uses **Axios** (`src/lib/axios.ts`) + **React Query** (`src/actions/queries.ts` for reads, `src/actions/mutations.ts` for writes).

### Routing & Layout

Next.js App Router. Pages are grouped under `src/app/(main)/` route group with shared layout (nav + footer). Root layout wraps everything in `RootProviders` which stacks: I18nProvider, ReactQueryProvider, TooltipProvider, ScrollProgress, TopLoader (nprogress), and Toaster (sonner).

### API Routes

- `GET /api/views/[slug]` — fetches pageviews from Simple Analytics, cached 60s
- `POST /api/contact` — validates with Zod (`src/schema.ts`), sends to Google Sheets

### Environment Variables

Validated via `@t3-oss/env-nextjs` in `src/constants/env.ts` (validation skipped in dev). Server: `NOCODE_API_KEY`, `NOCODE_TAB_ID`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`. Client: `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`.

## Key Path Aliases

- `~/*` → `src/*`
- `#site/content` → `.velite/` (Velite-generated content)

## Styling

Tailwind 3.4 with shadcn/ui preset (`src/lib/shadcn-ui.ts`). Dark mode via CSS selector strategy. Accent color: `#00adb5`. MDX-specific styles in `src/styles/mdx.css`. Uses CSS custom properties for theming.

## Deployment

Vercel. Build command (from `vercel.json`): `prisma generate && prisma migrate deploy && next build`. The `next.config.mjs` uses `jiti` to validate env vars at build time and triggers Velite builds via a custom webpack plugin.

## Notable Patterns

- Project data is hardcoded in `src/components/project/_project-mock.ts` (not from CMS/DB).
- Site config (name, domain, social links) lives in `src/config.ts` — domain is `ayushworks.com`.
- Comments use Giscus (GitHub-backed).
- `src/constants/stack.tsx` defines technology icons used across the site.
- Redirects for social links (`/github`, `/linkedin`, `/resume`, etc.) are defined in `next.config.mjs`.
