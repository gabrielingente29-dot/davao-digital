import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cursor-reactive spotlight. Wrap any grid or panel: the wrapper tracks the
 * pointer and paints a soft radial glow under the content via CSS variables.
 * Disabled automatically for touch and reduced-motion users.
 */
export function CursorSpotlight({
  children,
  className,
  size = 520,
  intensity = 0.16,
  color = "124 92 255",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
  intensity?: number;
  color?: string;
  as?: "div" | "section" | "ul";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  const handleMove = React.useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--gm-mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--gm-my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref as never}
      onPointerMove={handleMove}
      onPointerEnter={(e: React.PointerEvent<HTMLElement>) => {
        if (e.pointerType === "mouse") setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      className={cn("group/spot relative", className)}
      style={
        {
          "--gm-spot-size": `${size}px`,
          "--gm-spot-alpha": intensity,
          "--gm-spot-color": color,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(var(--gm-spot-size) circle at var(--gm-mx, 50%) var(--gm-my, 0%), rgb(var(--gm-spot-color) / var(--gm-spot-alpha)), transparent 70%)",
        }}
      />
      {children}
    </Tag>
  );
}
