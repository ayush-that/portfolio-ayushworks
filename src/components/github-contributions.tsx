"use client";

import GitHubCalendar from "react-github-calendar";

const GitHubContributions = () => {
  return (
    <div className="w-full">
      <GitHubCalendar
        username="ayush-that"
        colorScheme="dark"
        fontSize={12}
        blockSize={12}
      />
    </div>
  );
};

export default GitHubContributions;
