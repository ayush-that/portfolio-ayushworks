import type { Activity } from "react-activity-calendar";
import GitHubContributionsClient from "./github-contributions-client";

const USERNAME = "ayush-that";

type ApiResponse = {
  contributions: Array<Activity>;
};

const fetchContributions = async (): Promise<Array<Activity>> => {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApiResponse;
    return json.contributions ?? [];
  } catch {
    return [];
  }
};

const GitHubContributions = async () => {
  const data = await fetchContributions();
  return <GitHubContributionsClient data={data} />;
};

export default GitHubContributions;
