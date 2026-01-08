"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
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
      />
    </div>
  );
};

export default GitHubContributions;
