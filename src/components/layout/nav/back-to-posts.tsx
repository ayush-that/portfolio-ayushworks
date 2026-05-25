"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveLeft } from "lucide-react";

const BackToPosts = () => {
  const pathname = usePathname();
  const isBlogDetail = pathname.startsWith("/blog/") && pathname !== "/blog";

  if (!isBlogDetail) return null;

  return (
    <Link
      href="/blog"
      aria-label="Back to posts"
      className="el-focus-styles flex items-center gap-2 rounded-sm text-lg font-medium text-foreground sm:text-base"
    >
      <MoveLeft className="size-4" aria-hidden="true" />
      Back to posts
    </Link>
  );
};

export default BackToPosts;
