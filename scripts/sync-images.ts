/**
 * Uploads everything staged under `.r2-staging/` to the Cloudflare R2 bucket.
 * The R2 object key is the file's path relative to `.r2-staging`, so a file at
 * `.r2-staging/cover/foo.avif` becomes the object `cover/foo.avif`, served at
 * `https://cdn.ayushworks.com/cover/foo.avif`.
 *
 * Reuses the existing wrangler auth (no S3 API tokens). Run before `git push`.
 *
 * Usage:
 *   bun images:sync                 # uses R2_BUCKET or the default below
 *   R2_BUCKET=my-bucket bun images:sync
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const BUCKET = process.env.R2_BUCKET ?? "ayushworks-media";
const STAGING_DIR = join(process.cwd(), ".r2-staging");

const CONTENT_TYPE: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
  svg: "image/svg+xml",
};

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync(STAGING_DIR)) {
  console.log("Nothing to sync: .r2-staging/ does not exist.");
  process.exit(0);
}

const files = walk(STAGING_DIR);
if (files.length === 0) {
  console.log("Nothing to sync: .r2-staging/ is empty.");
  process.exit(0);
}

console.log(`Uploading ${files.length} file(s) to R2 bucket "${BUCKET}"...\n`);
let ok = 0;
for (const file of files) {
  const key = relative(STAGING_DIR, file).split(sep).join("/");
  const ext = key.split(".").pop()?.toLowerCase() ?? "";
  const ct = CONTENT_TYPE[ext];
  const args = ["wrangler", "r2", "object", "put", `${BUCKET}/${key}`, "--file", file, "--remote"];
  if (ct) args.push("--content-type", ct);
  try {
    execFileSync("bunx", args, { stdio: ["ignore", "ignore", "inherit"] });
    console.log(`  ✓ ${key}`);
    ok++;
  } catch {
    console.error(`  ✗ ${key} (upload failed)`);
  }
}
console.log(`\nDone: ${ok}/${files.length} uploaded to "${BUCKET}".`);
process.exit(ok === files.length ? 0 : 1);
