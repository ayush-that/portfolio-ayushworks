"use client";

import { useEffect, useState } from "react";
import type { Activity } from "react-activity-calendar";
import GitHubContributionsClient from "./github-contributions-client";

const USERNAME = "ayush-that";

type ApiResponse = {
  contributions: Array<Activity>;
};

const GitHubContributions = () => {
  const [data, setData] = useState<Array<Activity> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then((res) => (res.ok ? (res.json() as Promise<ApiResponse>) : null))
      .then((json) => {
        if (!cancelled) setData(json?.contributions ?? []);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <GitHubContributionsClient data={data ?? []} loading={data === null} />;
};

export default GitHubContributions;
