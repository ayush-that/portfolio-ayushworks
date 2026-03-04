# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun dev              # Runs Next.js dev server + Velite content watcher in parallel
bun build            # Sequential: build:content (Velite) then build:next (Next.js)
bun dev:next         # Next.js dev server only
bun dev:content      # Velite content watcher only
bun build:content    # velite --clean (regenerates .velite/)
bun build:next       # next build
bun format           # oxfmt --write .
bun cf:build         # Build for Cloudflare via opennextjs-cloudflare
bun cf:preview       # Preview Cloudflare build locally via Wrangler
bun cf:deploy        # Deploy to Cloudflare Pages
bun preview          # Full pipeline: build + cf:build + cf:preview
bun deploy           # Full pipeline: build + cf:build + cf:deploy
```

No test runner or linter is configured in this project.

## Architecture

### Content Pipeline

Blog posts live in `src/content/posts/[locale]/*.mdx` (en, es, fr, de, hi, ja, ko, zh). **Velite** processes MDX files into typed data output at `.velite/` (gitignored). The `#site/content` path alias resolves to `.velite/`. Rehype plugins handle slug generation, code syntax highlighting (shiki with catppuccin-mocha theme), external link behavior, and autolinked headings.

### Internationalization

Uses i18next with browser language detection. UI translations are in `src/locales/[locale]/common.json` and `blog.json`. Blog content is translated per-locale in the content directory. Translation management uses Lingo.dev (config in `i18n.json`). Source language is English.

### Data Layer

- **Views tracking** uses the **Simple Analytics API** — via API route at `src/app/api/views/[slug]/route.ts` and server action in `src/actions/queries.ts`. Both use `fetch` with `{ next: { revalidate: 60 } }`.
- **Contact form** posts directly to **Web3Forms API** from the client (`src/components/contact-us.tsx`). No backend route involved.
- Client-side data fetching uses **React Query** (`src/actions/queries.ts` for reads).

### Routing & Layout

Next.js App Router. Pages are grouped under `src/app/(main)/` route group with shared layout (nav + footer). Root layout wraps everything in `RootProviders` which stacks: I18nProvider, ReactQueryProvider, TooltipProvider, ScrollProgress, TopLoader (nprogress), and Toaster (sonner).

### API Routes

- `GET /api/views/[slug]` — fetches pageviews from Simple Analytics, cached 60s via ISR
- `GET /feed.xml` — generates RSS feed from Velite-processed blog content

### Environment Variables

Client-side only (set as build-time env vars in Cloudflare Pages dashboard):
- `NEXT_PUBLIC_GISCUS_REPO` / `NEXT_PUBLIC_GISCUS_REPO_ID` — Giscus GitHub repo
- `NEXT_PUBLIC_GISCUS_CATEGORY` / `NEXT_PUBLIC_GISCUS_CATEGORY_ID` — Giscus category

No server-side environment variables are required.

## Key Path Aliases

- `~/*` → `src/*`
- `#site/content` → `.velite/` (Velite-generated content)

## Styling

Tailwind 3.4 with shadcn/ui preset (`src/lib/shadcn-ui.ts`). Dark mode via CSS selector strategy. Accent color: `#00adb5`. MDX-specific styles in `src/styles/mdx.css`. Uses CSS custom properties for theming.

## Deployment

Cloudflare Pages via `@opennextjs/cloudflare`. Configuration in `wrangler.jsonc` and `open-next.config.ts`. Deploy with `bun deploy`. Preview locally with `bun preview`. The site is primarily static with a single dynamic API route for page view counts (via Simple Analytics).

## Notable Patterns

- Project data is hardcoded in `src/components/project/_project-mock.ts` (not from CMS/DB).
- Site config (name, domain, social links) lives in `src/config.ts` — domain is `ayushworks.com`.
- Comments use Giscus (GitHub-backed).
- `src/constants/stack.tsx` defines technology icons used across the site.
- Redirects for social links (`/github`, `/linkedin`, `/resume`, etc.) are defined in `next.config.ts`.
