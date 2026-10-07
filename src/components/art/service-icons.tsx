import * as React from "react";

import type { ServiceIconKey } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Six custom icons, drawn on a 48×48 grid with a solid brand stroke and at
 * most one accent detail each — no gradient fills. Each one carries a small
 * looped animation so the bento grid feels alive.
 */

type IconProps = { className?: string };

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("size-11", className)}
    />
  );
}

const stroke = () => ({
  stroke: "#1E6FD9",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ------------------------------ 1. Website ------------------------------- */

export function BrowserIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <rect x="6" y="9" width="36" height="30" rx="5" {...stroke()} />
      <path d="M6 17h36" {...stroke()} opacity="0.6" />
      <circle cx="11.5" cy="13" r="1.3" fill="#1E6FD9" />
      <circle cx="16" cy="13" r="1.3" fill="#1E6FD9" opacity="0.6" />
      <path d="M13 32l6.5-6 5.5 4.4L36 21" {...stroke()} />
      <circle cx="36" cy="21" r="2.1" fill="#17BEBB" className="animate-glow-pulse" />
    </Frame>
  );
}

/* ------------------------------- 2. Hosting ------------------------------ */

export function ShieldIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M24 6l14 5v11c0 9.5-5.9 16.4-14 20-8.1-3.6-14-10.5-14-20V11l14-5Z" {...stroke()} />
      <path
        d="M17.5 24.5l4.6 4.6 9-9.4"
        {...stroke()}
        strokeWidth={2}
        className="[stroke-dasharray:26] [stroke-dashoffset:0] transition-[stroke-dashoffset] duration-700 ease-out group-hover/bento:[stroke-dashoffset:26]"
      />
      <circle cx="24" cy="24" r="20" {...stroke()} opacity="0.18" strokeDasharray="3 7" />
    </Frame>
  );
}

/* --------------------------------- 3. Pin -------------------------------- */

export function PinIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path
        d="M24 42c6.5-8.2 10-14 10-19.4A10 10 0 0 0 14 22.6C14 28 17.5 33.8 24 42Z"
        {...stroke()}
      />
      <circle cx="24" cy="22.4" r="3.6" {...stroke()} strokeWidth={1.5} />
      <circle
        cx="24"
        cy="22.4"
        r="7.5"
        stroke="#17BEBB"
        strokeWidth="1.2"
        className="animate-glow-pulse origin-center"
        opacity="0.55"
      />
      <path d="M9 45h30" {...stroke()} opacity="0.35" strokeDasharray="2 5" />
    </Frame>
  );
}

/* -------------------------------- 4. SEO --------------------------------- */

export function SearchIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <circle cx="21" cy="21" r="12" {...stroke()} />
      <path d="M30 30l10 10" {...stroke()} strokeWidth={2.2} />
      <path
        d="M15 21h12"
        stroke="#4CAF50"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="animate-[scan_3.4s_ease-in-out_infinite] [transform-origin:center]"
        style={{ transformBox: "fill-box" }}
      />
      <path d="M13 15h16M13 27h9" {...stroke()} opacity="0.4" />
    </Frame>
  );
}

/* ------------------------------- 5. Reports ------------------------------ */

export function ChartIcon({ className }: IconProps) {
  const bars = [
    { x: 10, h: 12, delay: "0s" },
    { x: 19, h: 20, delay: "0.18s" },
    { x: 28, h: 16, delay: "0.36s" },
    { x: 37, h: 26, delay: "0.54s" },
  ];
  return (
    <Frame className={className}>
      <path d="M7 8v32h34" {...stroke()} opacity="0.7" />
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={40 - bar.h}
          width="5"
          height={bar.h}
          rx="2.2"
          fill="#1E6FD9"
          className="animate-rack origin-bottom"
          style={{ animationDelay: bar.delay, transformBox: "fill-box" }}
          opacity="0.9"
        />
      ))}
    </Frame>
  );
}

/* ------------------------------ 6. Meta ads ------------------------------ */

export function MegaphoneIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M9 25.5v-7a2.5 2.5 0 0 1 2.5-2.5h3.2l14-8.4a1.6 1.6 0 0 1 2.4 1.4v26a1.6 1.6 0 0 1-2.4 1.4L14.7 28H11.5A2.5 2.5 0 0 1 9 25.5Z" {...stroke()} />
      <path d="M16 28.4l1.6 9.2a2.4 2.4 0 0 0 2.4 2h1.4a1.6 1.6 0 0 0 1.6-1.9L22 28" {...stroke()} />
      <path d="M34 17.5c2.4 1.2 3.6 3.8 3.6 6.9s-1.2 6-3.6 7.2" stroke="#4CAF50" strokeWidth="1.8" strokeLinecap="round" className="animate-glow-pulse" style={{ transformBox: "fill-box" }} />
      <path d="M38 12.5c3.6 2.4 5.4 6.6 5.4 11.9s-1.8 9.7-5.4 12.1" {...stroke()} strokeWidth={1.4} opacity="0.5" className="animate-glow-pulse" style={{ animationDelay: "0.9s", transformBox: "fill-box" }} />
    </Frame>
  );
}

export const serviceIcons: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  browser: BrowserIcon,
  shield: ShieldIcon,
  pin: PinIcon,
  search: SearchIcon,
  chart: ChartIcon,
  megaphone: MegaphoneIcon,
};
