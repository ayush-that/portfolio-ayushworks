import { Rss } from "lucide-react";
import React from "react";

const RssFeed = () => {
  return (
    <a
      href="/feed.xml"
      aria-label="Rss feed"
      className="el-focus-styles flex items-center gap-2 !font-ubuntu text-sm"
      target="_blank"
    >
      <div className="rounded-sm bg-[#ff9100] p-1 text-black">
        <Rss className="size-4" />
      </div>
      RSS Feed
    </a>
  );
};

export default RssFeed;
