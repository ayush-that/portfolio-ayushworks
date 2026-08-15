"use client";

const CDN_ORIGIN = "https://cdn.ayushworks.com";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function cloudflareImageLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith(CDN_ORIGIN)) return src;
  if (process.env.NODE_ENV === "development") {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }

  const options = `width=${width},quality=${quality ?? 75},format=auto`;
  return `/cdn-cgi/image/${options}/${src}`;
}
