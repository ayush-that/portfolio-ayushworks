# Keystatic CMS + Cloudflare R2 images — Design

Date: 2026-05-30
Status: Approved (design); implementation plan pending

## Problem

Writing blog posts today is manual and error-prone: you hand-edit MDX files in
`src/content/*.mdx`, write YAML frontmatter by hand, and manually place cover
images in `public/cover/`. There is no editor, no preview, and no guardrails on
frontmatter shape. Separately, images are scattered: 19 cover images live in the
git repo under `public/cover/`, and all 56 inline images are hotlinked from
third-party CDNs (Hashnode, Medium, Dev.to, docs sites, news sites), which is
fragile and prone to link-rot.

## Goals

1. Add a small, open-source CMS that makes writing posts easier, without
   changing the static, git-based deployment model.
2. Host all images on Cloudflare R2, served from `cdn.ayushworks.com`.
3. Migrate every existing image (19 covers + 56 inline) to R2 and rewrite all
   references.

## Non-goals

- No database, no server-side content store. Content stays as MDX in git.
- No hosted/multi-device editing. Writing happens locally, then committed.
- No change to the Velite build pipeline, the i18n setup, or the Cloudflare
  deploy flow beyond what is listed under "Required code changes".

## Decisions (locked during brainstorming)

- **Writing flow:** Local. Write in a CMS admin UI running in `bun dev`, the CMS
  saves MDX to the repo, you commit/push as usual. Stays 100% static + git-based.
- **CMS:** Keystatic (MIT, by Thinkmill). Chosen over TinaCMS for being lighter
  and simpler; over Decap for a better editor. TinaCMS was considered because it
  supports R2 natively as an S3 media store, but Keystatic's simplicity won and
  R2 is handled by a small sync step instead.
- **Image host:** `cdn.ayushworks.com`, a custom domain on the existing
  Cloudflare zone, mapped to a new R2 bucket.
- **Migration scope:** Everything — all 19 covers and all 56 inline images are
  re-hosted on R2. Dead links are flagged for manual fixing rather than silently
  dropped.

## Architecture

The site remains a static Next.js App Router site built with Velite and deployed
to Cloudflare via OpenNext. Two things are added:

1. **Keystatic admin** — a dev-only admin UI mounted at `/keystatic`. It runs
   only during local development (`bun dev`); it is not part of the public,
   deployed site. It reads and writes the same `src/content/*.mdx` files Velite
   already consumes, so the content pipeline is unchanged.

2. **R2 image hosting** — uploaded and migrated images live in a Cloudflare R2
   bucket, served publicly via `cdn.ayushworks.com`. MDX references images by
   their absolute `https://cdn.ayushworks.com/...` URL. Images no longer live in
   git or in `public/`.

```
  bun dev ──> /keystatic (Keystatic admin, local mode)
                 │  edit post
                 ▼
            src/content/*.mdx     (frontmatter + body; cover/inline refs = cdn URLs)
                 │  image binary written to
                 ▼
            .r2-staging/          (gitignored, ephemeral handoff)
                 │  bun images:sync (wrangler r2 object put)
                 ▼
            R2 bucket  ──served via──>  https://cdn.ayushworks.com/...
                 ▲
                 │  one-time
            scripts/migrate-images-to-r2.ts  (covers + inline → R2, rewrite refs)
```

## Components

### 1. Keystatic configuration (`keystatic.config.ts`)

- Storage: `{ kind: 'local' }`.
- One collection, `posts`, with `path` pointing at `src/content/*` and a
  `format` that produces frontmatter-on-top MDX matching the current files.
- Fields mirror the Velite schema (`velite.config.ts`) exactly:
  - `title` — text (max 99)
  - `description` — text (max 999)
  - `tags` — array of text
  - `date` — date (ISO)
  - `published` — checkbox, default `true`
  - `cover` — image field (see R2 flow below)
  - body — Keystatic document/MDX content field
- The collection's `slug`/filename strategy must match existing filenames
  (kebab-case slug = filename), so Keystatic edits existing posts in place.

Compatibility requirement: round-tripping an existing post through Keystatic must
produce a file Velite still parses (same frontmatter keys, same body), and must
not reorder or drop fields in a way that breaks the build. This is verified in
testing by editing one existing post and re-running the build.

### 2. Keystatic routes

- `src/app/keystatic/[[...params]]/page.tsx` — renders the Keystatic admin UI.
- `src/app/api/keystatic/[[...params]]/route.ts` — Keystatic's API handler.
- Both are guarded so the admin is only mounted when not in production
  (e.g. `process.env.NODE_ENV !== 'production'`). Local mode only functions
  locally regardless, but the guard keeps the routes out of the public site.

### 3. R2 image flow

- The Keystatic `cover` image field is configured with:
  - `directory: '.r2-staging/cover'` (or per-post subfolder) — where the binary
    is written locally.
  - `publicPath: 'https://cdn.ayushworks.com/cover'` — the URL prefix stored in
    the MDX, so the saved reference is the R2 URL.
- `.r2-staging/` is gitignored. It is an ephemeral handoff folder, not committed.
  Existing posts do not need their binaries present locally because their refs
  are already absolute cdn URLs.
- `bun images:sync` (script: `scripts/sync-images.ts` or a package.json script)
  uploads everything under `.r2-staging/` to the R2 bucket using
  `wrangler r2 object put`, preserving key paths. It reuses the existing
  Cloudflare/wrangler auth used for deploys — no S3 API tokens to manage. It is
  idempotent and run manually before `git push`.

### 4. R2 bucket + custom domain (operator steps)

Run by the user; the plan provides exact commands:

- Create an R2 bucket (e.g. `ayushworks-media`).
- Connect the custom domain `cdn.ayushworks.com` to the bucket for public read
  access (Cloudflare R2 custom domain on the existing zone).

### 5. One-time migration (`scripts/migrate-images-to-r2.ts`)

A re-runnable script:

- Parse all `src/content/*.mdx`.
- **Covers (19):** read each `cover:` frontmatter path (`/cover/<file>`), read
  the local file from `public/cover/`, upload to R2 under `cover/<file>`, and
  rewrite the frontmatter value to `https://cdn.ayushworks.com/cover/<file>`.
  After successful migration, `public/cover/` can be deleted.
- **Inline (56):** for each `![alt](url)` whose `url` is external, download it,
  dedupe by content hash, upload to R2 under `posts/<slug>/<hash>.<ext>`, and
  rewrite the ref to the cdn URL.
- **Idempotency:** refs already pointing at `cdn.ayushworks.com` are skipped, so
  the script can be re-run safely.
- **Failure handling:** a download that 404s or times out leaves the original
  URL untouched and records `{post, url, error}` in `migration-report.md` for
  manual fixing. The migration never silently drops an image.

### 6. Required code changes

- `src/components/post/post-json-schema.tsx:22` currently builds
  `` `https://${config.domainName}${post.cover}` ``. Once `cover` is an absolute
  URL this produces a broken `https://ayushworks.comhttps://cdn...`. Fix to use
  `post.cover` directly when it is already absolute.
- `next.config.ts` `images` has no `remotePatterns`. Add
  `cdn.ayushworks.com` so `next/image` (used by both `post-item.tsx` and
  `src/components/mdx/custom-image.tsx`) serves R2 images. During implementation,
  also verify how the current external inline images render (the existing config
  has no `remotePatterns` yet renders external images, so there may be a loader
  or `unoptimized` behavior to account for) and reconcile accordingly.

## Data flow summary

- **New post:** write in `/keystatic` → MDX saved to `src/content/` with cover
  binary in `.r2-staging/` and cdn URLs in frontmatter/body → `bun images:sync`
  pushes binaries to R2 → commit + push → Cloudflare build serves the static
  site, images load from `cdn.ayushworks.com`.
- **Existing posts:** unchanged by Keystatic except their image refs are
  rewritten to cdn URLs by the one-time migration.

## Testing

1. **Migration:** run the script on a clean working tree; confirm all 19 covers
   and all reachable inline images are uploaded to R2 and refs rewritten; review
   `migration-report.md` for dead links; run `bun build` and visually verify a
   sample of posts (cover + inline images) load from `cdn.ayushworks.com`.
2. **Keystatic round-trip:** edit one existing post in `/keystatic`, save, and
   re-run `bun build` to confirm Velite still parses it and the rendered output
   is unchanged.
3. **New-post flow:** create a draft post with a new cover image in `/keystatic`,
   run `bun images:sync`, confirm the object exists in R2 and the cover renders.
4. **Dev-only guard:** confirm `/keystatic` and `/api/keystatic` are not served
   by a production build.

## Risks / open items

- Keystatic's MDX serialization must match Velite's expectations. Mitigated by
  the round-trip test; if Keystatic's output diverges, adjust the collection
  `format`/`contentField` config.
- Current `next/image` external-image behavior is unverified; resolved during
  implementation before relying on `remotePatterns`.
- Re-hosting ~17 third-party inline images (docs diagrams, news sites) is an
  accepted decision; copyright/attribution is the author's responsibility.
