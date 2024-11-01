import * as React from "react";
import { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

const ChainGpt = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <div className="size-16 border bg-neutral-900 grid place-content-center rounded-md hover:border-cyan-500 transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      fill="none"
      viewBox="0 0 40 40"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#1DA3AA" />
        </linearGradient>
      </defs>

      {/* Abstract tech pattern */}
      <path
        fill="url(#gradient1)"
        d="M12 8h16v4H12zM8 16h24v2H8zM16 22h8v2h-8zM20 28h4v4h-4z"
      />

      {/* Connecting lines */}
      <path
        stroke="url(#gradient1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M20 12v4M20 24v4"
      />
    </svg>
  </div>
);

export default ChainGpt;
