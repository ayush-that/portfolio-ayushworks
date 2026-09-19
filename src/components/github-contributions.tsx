import type { Activity } from "react-activity-calendar";
import GitHubContributionsClient from "./github-contributions-client";

const USERNAME = "ayush-that";

async function loadContributions(): Promise<Activity[]> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
    if (!res.ok) return [];
    const json = (await res.json()) as { contributions?: Activity[] };
    return json.contributions ?? [];
  } catch {
    return [];
  }
}

const GitHubContributions = async () => {
  const data = await loadContributions();
  if (data.length === 0) return null;
  return <GitHubContributionsClient data={data} />;
};

export default GitHubContributions;
