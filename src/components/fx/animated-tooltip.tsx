import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

export type TooltipPerson = {
  id: string | number;
  name: string;
  role: string;
  /** Flat Tailwind background class for the generated avatar. */
  gradient: string;
  initials: string;
};

/** Aceternity-style Animated Tooltip — hover a face to meet the person. */
export function AnimatedTooltip({
  items,
  className,
}: {
  items: TooltipPerson[];
  className?: string;
}) {
  const [hovered, setHovered] = React.useState<TooltipPerson | null>(null);

  return (
    <div className={cn("flex items-center", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="group/avatar relative -mr-3 transition-transform duration-300 ease-[var(--ease-out-expo)] hover:z-20 hover:-translate-y-1"
          onMouseEnter={() => setHovered(item)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(item)}
          onBlur={() => setHovered(null)}
        >
          <div
            tabIndex={0}
            aria-label={`${item.name}, ${item.role}`}
            className={cn(
              "relative grid size-10 place-items-center rounded-full border-2 border-ink-900 text-[12px] font-semibold text-ink-950 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.9)] outline-none",
              item.gradient,
            )}
          >
            {item.initials}
          </div>

          <AnimatePresence>
            {hovered?.id === item.id ? (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute -top-14 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-ink-800/95 px-3 py-2 text-left shadow-[0_18px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              >
                <p className="text-[13px] font-semibold leading-none text-white">{item.name}</p>
                <p className="mt-1 text-[11px] leading-none text-[var(--accent-2)]">{item.role}</p>
                <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-ink-800" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
