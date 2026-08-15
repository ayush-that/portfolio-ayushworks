"use client";

import React, { useEffect, useRef, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

const BLOCK_MARGIN = 4;
const MIN_BLOCK = 12;
const MAX_BLOCK = 20;

const weekCount = (data: Array<Activity>) => {
  if (data.length === 0) return 53;
  const offset = new Date(`${data[0].date}T00:00:00`).getDay();
  return Math.ceil((offset + data.length) / 7);
};

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
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const exact = (width - 1 + BLOCK_MARGIN) / weekCount(data) - BLOCK_MARGIN;
  const blockSize = Math.max(MIN_BLOCK, Math.min(MAX_BLOCK, Math.floor(exact * 10) / 10));

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
      <div className="max-w-full overflow-x-auto overflow-y-hidden">
        <ActivityCalendar
          data={data}
          colorScheme="dark"
          fontSize={12}
          blockSize={blockSize}
          blockMargin={BLOCK_MARGIN}
          labels={{ totalCount: "{{count}} contributions in the last year" }}
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
      </div>

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
