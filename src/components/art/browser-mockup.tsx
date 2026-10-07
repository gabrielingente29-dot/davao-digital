import { Lock, RotateCw } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A browser window built from real DOM, not an image: crisp on every display,
 * zero layout shift, and the traffic-light chrome sells the mockup.
 */
export function BrowserMockup({
  children,
  url = "davaobusiness.ph",
  className,
  ratio = "aspect-[16/10]",
  compact = false,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
  ratio?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-850/90 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-3",
          compact ? "h-7" : "h-9",
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-5 flex-1 items-center gap-1.5 rounded-full border border-white/[0.06] bg-ink-950/70 px-2">
          <Lock className="size-2.5 text-emerald-400/80" />
          <span className="truncate text-[10px] tracking-tight text-white/45">{url}</span>
        </div>
        <RotateCw className="size-3 text-white/25" />
      </div>
      <div className={cn("relative w-full overflow-hidden bg-white", ratio)}>{children}</div>
    </div>
  );
}

/** Phone frame used in the hero for the "looks great on mobile" beat. */
export function PhoneMockup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2rem] border border-white/[0.12] bg-ink-850/95 p-1.5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-white">
        <span className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink-950/85" />
        {children}
      </div>
    </div>
  );
}
