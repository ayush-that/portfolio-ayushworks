"use client";

import React, { useRef, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

type TipState = { text: string; x: number; y: number } | null;

type Props = {
  data: Array<Activity>;
};

const GitHubContributionsClient = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<TipState>(null);

  const showTip = (e: React.MouseEvent<SVGRectElement>, text: string) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTip({
      text,
      x: rect.left - box.left + rect.width / 2,
      y: rect.top - box.top,
    });
  };

  const hideTip = () => setTip(null);

  return (
    <div ref={containerRef} className="relative w-full">
      <ActivityCalendar
        data={data}
        colorScheme="dark"
        fontSize={12}
        blockSize={12}
        theme={{
          dark: ["#1b1b1b", "#333333", "#666666", "#999999", "#ffffff"],
        }}
        renderBlock={(block, activity) => {
          const text = `${activity.count} contribution${activity.count === 1 ? "" : "s"} on ${formatDate(activity.date)}`;
          return React.cloneElement(block, {
            onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => showTip(e, text),
            onMouseMove: (e: React.MouseEvent<SVGRectElement>) => showTip(e, text),
            onMouseLeave: hideTip,
            onFocus: (e: React.FocusEvent<SVGRectElement>) =>
              showTip(e as unknown as React.MouseEvent<SVGRectElement>, text),
            onBlur: hideTip,
            tabIndex: 0,
            style: { cursor: "pointer" },
          });
        }}
      />

      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
          style={{ left: tip.x, top: tip.y - 6 }}
        >
          {tip.text}
        </div>
      )}
    </div>
  );
};

export default GitHubContributionsClient;
