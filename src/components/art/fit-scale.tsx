import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders children at a fixed design width (default 1120px) and scales them to
 * fit the parent. Keeps generated mockups pixel-proportional at any size —
 * no layout shift, no blurry bitmaps.
 */
export function FitScale({
  children,
  designWidth = 1120,
  ratio = 0.625,
  className,
}: {
  children: React.ReactNode;
  designWidth?: number;
  /** height / width of the design canvas. */
  ratio?: number;
  className?: string;
}) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0);

  React.useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => setScale(host.clientWidth / designWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, [designWidth]);

  return (
    <div ref={hostRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        aria-hidden="true"
        style={{
          width: designWidth,
          height: designWidth * ratio,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          opacity: scale ? 1 : 0,
        }}
        className="absolute left-0 top-0"
      >
        {children}
      </div>
    </div>
  );
}
