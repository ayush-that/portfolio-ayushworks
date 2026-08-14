"use client";

import { useEffect, useState } from "react";
import type { Activity } from "react-activity-calendar";
import GitHubContributionsClient from "./github-contributions-client";

const USERNAME = "ayush-that";
const CALENDAR_HEIGHT = 152;

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

  if (data === null) return <div className="w-full" style={{ height: CALENDAR_HEIGHT }} />;

  return <GitHubContributionsClient data={data} />;
};

export default GitHubContributions;
