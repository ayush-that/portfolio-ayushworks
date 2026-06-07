# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun dev              # Next.js dev server + Velite watcher (lightweight; no CMS)
bun dev:cms          # Above + TinaCMS local server; admin at /admin (run only when editing)
bun dev:app          # Alias for the Next.js dev server + Velite watcher pair
bun build            # Sequential: build:content (Velite) then build:next (Next.js)
bun dev:next         # Next.js dev server only
bun dev:content      # Velite content watcher only
bun build:content    # velite --clean (regenerates .velite/)
bun build:next       # next build
bun format           # oxfmt --write .
bun images:migrate   # One-time/idempotent: stage existing images to .r2-staging (--apply rewrites MDX refs)
bun images:sync      # Upload .r2-staging/ to the R2 bucket via wrangler
bun cf:build         # Build for Cloudflare via opennextjs-cloudflare
bun cf:preview       # Preview Cloudflare build locally via Wrangler
bun cf:deploy        # Deploy to Cloudflare Pages
bun preview          # Full pipeline: build + cf:build + cf:preview
bun run deploy       # Full pipeline: build + cf:build + cf:deploy ("bun deploy" is a reserved Bun subcommand)
```

No test runner or linter is configured in this project.

## Architecture

### Content Pipeline

Blog posts live as flat MDX files in `src/content/*.mdx` (filename = slug). **Velite** processes them into typed data at `.velite/` (gitignored) and renders the public site. The `#site/content` path alias resolves to `.velite/`. Rehype plugins handle slug generation, code syntax highlighting (shiki with catppuccin-mocha theme), external link behavior, and autolinked headings.

### Content Editing (TinaCMS)

Posts are authored with **TinaCMS** (local mode) at `/admin` while running `bun dev:cms` (run only when editing — `bun dev` stays lightweight without the CMS/indexer). Schema is in `tina/config.ts`; it reads/writes the same `src/content/*.mdx` files Velite consumes, so editing and rendering stay decoupled. Editing is local-only (Tina uses a local server on :4001); the `/admin` SPA and `tina/__generated__/` are gitignored and not part of the deployed site. On save, Tina cosmetically reformats frontmatter/markdown (ISO-timestamp dates, YAML unicode escapes for emoji, `*`-style emphasis, block-list tags) — all Velite-safe.

### Images / Media (Cloudflare R2)

All blog images live in the **`ayushworks-media` R2 bucket**, served via the `cdn.ayushworks.com` custom domain. MDX references absolute `https://cdn.ayushworks.com/...` URLs — images are NOT stored in git or `public/`. TinaCMS uploads cover/body images straight to R2 via the S3 media handler at `src/app/api/s3/[...media]/route.ts` (an App Router adapter around `next-tinacms-s3`); it uses R2's S3 API and only authorizes uploads outside production. `scripts/migrate-images-to-r2.ts` (one-time, idempotent) moved the original covers + inline images to R2 and rewrote refs; `scripts/sync-images.ts` pushes locally-staged images (`.r2-staging/`, gitignored) to the bucket.

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
- `GET|DELETE /api/s3/[...media]` — TinaCMS media handler (presigned R2 upload URLs + media listing/delete); dev-only, returns 401 in production

### Environment Variables

Client-side (set as build-time env vars in Cloudflare Pages dashboard):

- `NEXT_PUBLIC_GISCUS_REPO` / `NEXT_PUBLIC_GISCUS_REPO_ID` — Giscus GitHub repo
- `NEXT_PUBLIC_GISCUS_CATEGORY` / `NEXT_PUBLIC_GISCUS_CATEGORY_ID` — Giscus category

Local-only (`.env`, gitignored — used by the R2 media handler during `bun dev`; not needed in production):

- `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` — Cloudflare R2 S3 API credentials for image uploads from `/admin`.

## Key Path Aliases

- `~/*` → `src/*`
- `#site/content` → `.velite/` (Velite-generated content)

## Styling

Tailwind 3.4 with shadcn/ui preset (`src/lib/shadcn-ui.ts`). Dark mode via CSS selector strategy. Accent color: `#00adb5`. MDX-specific styles in `src/styles/mdx.css`. Uses CSS custom properties for theming.

## Deployment

Cloudflare Pages via `@opennextjs/cloudflare`. Configuration in `wrangler.jsonc` and `open-next.config.ts`. Deploy with `bun run deploy` (`bun deploy` without `run` is a reserved Bun subcommand and fails). Preview locally with `bun preview`. The site is primarily static with a single dynamic API route for page view counts (via Simple Analytics).

## Notable Patterns

- Project data is hardcoded in `src/components/project/_project-mock.ts` (not from CMS/DB).
- Site config (name, domain, social links) lives in `src/config.ts` — domain is `ayushworks.com`.
- Comments use Giscus (GitHub-backed).
- `src/constants/stack.tsx` defines technology icons used across the site.
- Redirects for social links (`/github`, `/linkedin`, `/resume`, etc.) are defined in `next.config.ts`.
