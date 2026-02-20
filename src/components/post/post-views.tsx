"use client";
import { Eye } from "lucide-react";

const PostViews = ({ slug }: { slug: string }) => {
  // Temporarily hardcoded to debug
  return (
    <dl>
      <dt className="sr-only">Blog Post views</dt>
      <dd className="flex items-center gap-1 text-sm text-muted-foreground">
        <Eye className="size-4" aria-hidden="true" />
        <span>42 Views</span>
      </dd>
    </dl>
  );
};

export default PostViews;
