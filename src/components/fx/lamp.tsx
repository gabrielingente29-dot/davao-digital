import { motion } from "framer-motion";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style Lamp: two conic light arms spill from a bright filament,
 * washing the section below. Used for the final CTA.
 */
export function LampContainer({
  children,
  className,
  minHeight = "min-h-[820px]",
}: {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}) {
  const reduce = usePrefersReducedMotion();

  // Reduced motion: render the finished lamp immediately, no sweep.
  const grow = (delay: number, from: string, to: string, duration = 1.2) =>
    reduce
      ? { style: { width: to, opacity: 1 } }
      : {
          initial: { width: from, opacity: 0.4 },
          whileInView: { width: to, opacity: 1 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div
      className={cn(
        "relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-ink-950",
        minHeight,
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] w-full"
      >
        {/* the two light arms */}
        <motion.span
          {...grow(0.05, "12rem", "30rem")}
          className="absolute left-1/2 top-[150px] h-[300px] -translate-x-[100%] rounded-r-full bg-[conic-gradient(from_120deg_at_100%_100%,transparent_0deg,#1E6FD9_55deg,#17BEBB_95deg,transparent_140deg)] blur-[46px]"
        />
        <motion.span
          {...grow(0.05, "12rem", "30rem")}
          className="absolute left-1/2 top-[150px] h-[300px] rounded-l-full bg-[conic-gradient(from_-60deg_at_0%_100%,transparent_0deg,#1E6FD9_55deg,#17BEBB_95deg,transparent_140deg)] blur-[46px]"
        />

        {/* soft spill */}
        <motion.span
          {...grow(0.18, "18rem", "52rem", 1.4)}
          className="absolute left-1/2 top-[176px] h-[240px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(23,190,187,0.45),transparent_70%)] blur-[80px]"
        />

        {/* filament */}
        <motion.span
          {...grow(0.3, "8rem", "26rem", 1.1)}
          className="absolute left-1/2 top-[214px] h-[2px] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,#9ec7ff,#8ff0ee,#9ec7ff,transparent)] shadow-[0_0_70px_14px_rgba(30,111,217,0.85)]"
        />

        {/* falloff wash */}
        <span className="absolute top-[216px] h-[400px] w-full bg-[radial-gradient(ellipse_58%_100%_at_50%_0%,rgba(30,111,217,0.24),transparent_74%)]" />
        <span className="absolute top-[300px] h-px w-[70%] left-1/2 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
