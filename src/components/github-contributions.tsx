"use client";

import React from "react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const GitHubContributions = () => {
  return (
    <div className="w-full">
      <GitHubCalendar
        username="ayush-that"
        colorScheme="dark"
        fontSize={12}
        blockSize={12}
        theme={{
          dark: ["#1b1b1b", "#333333", "#666666", "#999999", "#ffffff"],
        }}
        renderBlock={(block, activity) =>
          React.cloneElement(
            block,
            {},
            <title>{`${activity.count} contribution${activity.count === 1 ? "" : "s"} on ${formatDate(activity.date)}`}</title>,
          )
        }
      />
    </div>
  );
};

export default GitHubContributions;
