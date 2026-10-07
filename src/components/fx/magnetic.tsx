import { motion, useSpring } from "framer-motion";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper — the child drifts toward the pointer and snaps back with
 * a spring when you leave. Subtle by design: 0.25 strength, 26px cap.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  cap = 26,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  cap?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(Math.max(-cap, Math.min(cap, dx)));
    y.set(Math.max(-cap, Math.min(cap, dy)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
