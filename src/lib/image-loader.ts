"use client";

// Cloudflare image resizing via /cdn-cgi/image for next/image; same-origin URLs and better caching.
const CDN_ORIGIN = "https://cdn.ayushworks.com";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function cloudflareImageLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith(CDN_ORIGIN)) return src;

  const options = `width=${width},quality=${quality ?? 75},format=auto`;
  return `/cdn-cgi/image/${options}/${src}`;
}
