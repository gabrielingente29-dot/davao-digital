import { animate, useInView } from "framer-motion";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Counts up from 0 when scrolled into view. Jumps straight to the value for reduced motion. */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  // Seed at the final value so the server-rendered HTML (what crawlers and
  // view-source see) always shows the real number, never 0. The count-up
  // animation still runs from `from` when the element scrolls into view.
  const [value, setValue] = React.useState(to);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce || import.meta.env.SSR) {
      setValue(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, from, to, duration, reduce]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
