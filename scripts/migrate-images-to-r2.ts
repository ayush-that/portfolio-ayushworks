/**
 * One-time (re-runnable) migration of blog images to Cloudflare R2.
 *
 * - Stages files locally under `.r2-staging/<key>` (gitignored). The R2 key is
 *   the path relative to `.r2-staging`, served at `${CDN}/<key>`.
 * - Covers: copies `public/cover/<file>` -> `.r2-staging/cover/<file>`.
 * - Inline images: downloads each external `![](url)`, dedupes by content hash,
 *   stages to `.r2-staging/posts/<slug>/<hash>.<ext>`.
 * - Rewrites MDX references to `${CDN}/...` URLs (only with --apply).
 * - Skips refs already on the CDN, so it is safe to re-run.
 * - Unreachable images are left untouched and recorded in migration-report.md.
 *
 * After running, push the staged files with `bun images:sync`.
 *
 * Usage:
 *   bun scripts/migrate-images-to-r2.ts            # dry run: download/stage + report
 *   bun scripts/migrate-images-to-r2.ts --apply    # also rewrite the MDX files
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CDN = "https://cdn.ayushworks.com";
const CONTENT_DIR = join(process.cwd(), "src/content");
const COVER_SRC_DIR = join(process.cwd(), "public/cover");
const STAGING_DIR = join(process.cwd(), ".r2-staging");
const APPLY = process.argv.includes("--apply");

const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

type Failure = { post: string; url: string; error: string };
const failures: Failure[] = [];
const downloadCache = new Map<string, string>(); // url -> CDN url

let coversStaged = 0;
let inlineStaged = 0;
let inlineSkipped = 0;
let filesRewritten = 0;

function stage(key: string, data: Buffer | Uint8Array) {
  const dest = join(STAGING_DIR, key);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, data);
}

function extFromUrl(url: string): string | null {
  const m = url.split("?")[0].match(/\.(png|jpe?g|jfif|webp|avif|gif|svg)$/i);
  if (!m) return null;
  const ext = m[1].toLowerCase();
  return ext === "jpeg" || ext === "jfif" ? "jpg" : ext;
}

async function migrateCover(slug: string, value: string): Promise<string> {
  if (value.startsWith(CDN)) return value;
  // frontmatter cover is a site-absolute path like /cover/foo.avif
  const file = value.replace(/^\/?cover\//, "");
  const src = join(COVER_SRC_DIR, file);
  if (!existsSync(src)) {
    failures.push({ post: slug, url: value, error: "cover file not found on disk" });
    return value;
  }
  stage(`cover/${file}`, readFileSync(src));
  coversStaged++;
  return `${CDN}/cover/${file}`;
}

async function migrateInline(slug: string, url: string): Promise<string> {
  if (url.startsWith(CDN)) {
    inlineSkipped++;
    return url;
  }
  if (downloadCache.has(url)) return downloadCache.get(url)!;
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext =
      extFromUrl(url) ?? EXT_BY_MIME[res.headers.get("content-type")?.split(";")[0] ?? ""];
    if (!ext)
      throw new Error(`unknown image type (content-type=${res.headers.get("content-type")})`);
    const hash = createHash("sha256").update(buf).digest("hex").slice(0, 16);
    const key = `posts/${slug}/${hash}.${ext}`;
    stage(key, buf);
    const cdnUrl = `${CDN}/${key}`;
    downloadCache.set(url, cdnUrl);
    inlineStaged++;
    return cdnUrl;
  } catch (e) {
    failures.push({ post: slug, url, error: (e as Error).message });
    return url;
  }
}

async function processPost(filename: string) {
  const slug = filename.replace(/\.mdx$/, "");
  const path = join(CONTENT_DIR, filename);
  let text = readFileSync(path, "utf8");
  const original = text;

  // Cover (frontmatter): cover: "..."
  const coverMatch = text.match(/^cover:\s*["']?([^"'\n]+)["']?\s*$/m);
  if (coverMatch) {
    const newCover = await migrateCover(slug, coverMatch[1]);
    if (newCover !== coverMatch[1]) {
      text = text.replace(coverMatch[0], `cover: "${newCover}"`);
    }
  }

  // Inline images: ![alt](url "optional title") — not plain [text](url) links.
  const imgRe = /(!\[[^\]]*\]\()(\s*)(<[^>]+>|[^)\s]+)([^)]*)(\))/g;
  const replacements: Array<{ from: string; to: string }> = [];
  for (const match of text.matchAll(imgRe)) {
    const rawUrl = match[3].replace(/^<|>$/g, "");
    if (!/^https?:\/\//.test(rawUrl)) continue;
    const cdnUrl = await migrateInline(slug, rawUrl);
    if (cdnUrl !== rawUrl) {
      replacements.push({ from: match[0], to: `${match[1]}${cdnUrl}${match[4]}${match[5]}` });
    }
  }
  for (const r of replacements) text = text.replace(r.from, r.to);

  if (APPLY && text !== original) {
    writeFileSync(path, text);
    filesRewritten++;
  }
}

const posts = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
console.log(`Processing ${posts.length} posts (${APPLY ? "APPLY" : "dry run"})...\n`);
for (const p of posts) await processPost(p);

if (failures.length) {
  const report =
    `# Image migration report\n\n` +
    `Generated: ${new Date().toISOString()}\n\n` +
    `${failures.length} image(s) could not be migrated and were left as external links. ` +
    `Fix these manually.\n\n` +
    failures.map((f) => `- **${f.post}** — \`${f.url}\`\n  - ${f.error}`).join("\n") +
    "\n";
  writeFileSync(join(process.cwd(), "migration-report.md"), report);
}

console.log(`Covers staged:   ${coversStaged}`);
console.log(`Inline staged:   ${inlineStaged}`);
console.log(`Inline skipped (already on CDN): ${inlineSkipped}`);
console.log(
  `Failures:        ${failures.length}${failures.length ? " (see migration-report.md)" : ""}`,
);
console.log(
  `MDX rewritten:   ${filesRewritten}${APPLY ? "" : " (dry run — pass --apply to write)"}`,
);
console.log(`\nStaged under .r2-staging/. Next: bun images:sync`);
