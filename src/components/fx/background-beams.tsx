import { motion } from "framer-motion";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Deterministic pseudo-random so beams never re-shuffle between renders. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

/**
 * Aceternity-style "Background Beams" — light streaks crossing the section,
 * drawn as SVG paths that sweep in with a stagger. Kept to 16 paths so it
 * stays cheap on mobile.
 */
export function BackgroundBeams({
  className,
  count = 16,
  color = "124 92 255",
}: {
  className?: string;
  count?: number;
  color?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const paths = React.useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: count }, (_, i) => {
      const startY = rand() * 120 - 60;
      const endY = rand() * 120 - 60;
      const midX = 180 + rand() * 400;
      const midY = rand() * 160 - 80;
      const endX = 700 + rand() * 400;
      return {
        d: `M-120 ${startY}C 120 ${startY}, ${midX} ${midY}, ${endX / 2} ${endY}S ${
          endX - 120
        } ${endY}, ${endX + 320} ${endY - 60}`,
        width: 0.5 + rand() * 1.3,
        delay: rand() * 6,
        duration: 5 + rand() * 6,
        opacity: 0.25 + rand() * 0.6,
        id: `beam-${i}`,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        className="absolute left-1/2 top-1/2 h-full w-[190%] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 1200 640"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 65% at 50% 45%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 65% at 50% 45%, #000 20%, transparent 78%)",
        }}
      >
        <defs>
          <linearGradient id="gm-beam-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={`rgb(${color} / 0)`} />
            <stop offset="38%" stopColor={`rgb(${color} / 0.85)`} />
            <stop offset="62%" stopColor="rgb(34 211 238 / 0.85)" />
            <stop offset="100%" stopColor="rgb(34 211 238 / 0)" />
          </linearGradient>
        </defs>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#gm-beam-stroke)"
            strokeWidth={path.width}
            strokeLinecap="round"
            initial={reduce ? { pathLength: 1, opacity: path.opacity * 0.5 } : { pathLength: 0, opacity: 0 }}
            animate={
              reduce
                ? undefined
                : {
                    pathLength: [0, 1, 1],
                    opacity: [0, path.opacity, 0],
                  }
            }
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
