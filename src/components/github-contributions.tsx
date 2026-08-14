"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Activity } from "react-activity-calendar";

const USERNAME = "ayush-that";
const CALENDAR_HEIGHT = 152;

const GitHubContributionsClient = dynamic(() => import("./github-contributions-client"), {
  ssr: false,
});

type ApiResponse = {
  contributions: Array<Activity>;
};

const GitHubContributions = () => {
  const holderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Array<Activity> | null>(null);

  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
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
  }, [visible]);

  return (
    <div ref={holderRef} className="w-full" style={{ minHeight: CALENDAR_HEIGHT }}>
      {data !== null && <GitHubContributionsClient data={data} />}
    </div>
  );
};

export default GitHubContributions;
