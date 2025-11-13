"use client";

import GitHubCalendar from "react-github-calendar";
import useIsClient from "~/hooks/use-client";

const GitHubContributions = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full" suppressHydrationWarning>
      <GitHubCalendar
        username="shydev69"
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
