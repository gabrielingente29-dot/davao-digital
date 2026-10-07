import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style spotlight: a huge blurred ellipse that sweeps in on load.
 * Two of them (violet + cyan) are layered in the hero for brand colour.
 */
export function Spotlight({
  className,
  fill = "white",
  opacity = 0.22,
  delay = 0,
}: {
  className?: string;
  fill?: string;
  opacity?: number;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%] w-[138%] animate-spotlight opacity-0 lg:w-[84%]",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter={`url(#gm-spotlight-${fill.replace("#", "")}-${delay})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity={opacity}
        />
      </g>
      <defs>
        <filter
          id={`gm-spotlight-${fill.replace("#", "")}-${delay}`}
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
