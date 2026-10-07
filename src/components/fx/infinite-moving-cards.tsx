import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style Infinite Moving Cards.
 * Pure CSS marquee (no JS per frame), pauses on hover, respects reduced motion.
 */
export function InfiniteMovingCards({
  children,
  direction = "left",
  speed = 44,
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  children: React.ReactNode[];
  direction?: "left" | "right";
  /** Seconds for one full loop. Larger = slower. */
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const list = React.useMemo(() => [...children, ...children], [children]);

  return (
    <div
      className={cn(
        "group edge-fade-x relative flex overflow-hidden py-4",
        className,
      )}
      role="region"
      aria-label="Client testimonials"
    >
      <ul
        className={cn(
          "flex w-max shrink-0 flex-nowrap gap-6 pr-6",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {list.map((child, index) => (
          <li
            key={index}
            aria-hidden={index >= children.length ? true : undefined}
            className={cn("w-[320px] shrink-0 sm:w-[380px]", itemClassName)}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
