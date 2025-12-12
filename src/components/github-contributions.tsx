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
          dark: ["#1b1b1b", "#006064", "#00838f", "#0097a7", "#00adb5"],
        }}
      />
    </div>
  );
};

export default GitHubContributions;
