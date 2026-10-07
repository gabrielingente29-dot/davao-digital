import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Compare slider — draggable, keyboard operable, uses the label "Drag".
 * Give it two children: the "before" layer and the "after" layer.
 */
export function CompareSlider({
  before,
  after,
  start = 52,
  className,
  labelBefore = "Before",
  labelAfter = "After",
  ariaLabel = "Compare before and after",
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  /** Initial divider position, 0–100. */
  start?: number;
  className?: string;
  labelBefore?: string;
  labelAfter?: string;
  ariaLabel?: string;
}) {
  const [value, setValue] = React.useState(start);
  const [dragging, setDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const setFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    setDragging(true);
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientX(event.clientX);
  };

  const stop = () => setDragging(false);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      setValue((v) => Math.max(0, v - step));
      event.preventDefault();
    }
    if (event.key === "ArrowRight") {
      setValue((v) => Math.min(100, v + step));
      event.preventDefault();
    }
    if (event.key === "Home") setValue(0);
    if (event.key === "End") setValue(100);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group/cmp relative isolate touch-none select-none overflow-hidden rounded-3xl",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
    >
      {/* BEFORE (base layer) */}
      <div className="absolute inset-0">{before}</div>

      {/* AFTER (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${value}%)` }}
      >
        {after}
      </div>

      {/* Labels — the base layer sits on the left, the clipped layer on the right. */}
      <span className="pointer-events-none absolute left-3 top-3 z-20 max-w-[46%] truncate rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)] backdrop-blur-md sm:left-4 sm:top-4 sm:max-w-[40%] sm:px-3 sm:text-[11px] sm:tracking-[0.14em]">
        {labelBefore}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-20 max-w-[46%] truncate rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)] backdrop-blur-md sm:right-4 sm:top-4 sm:max-w-[40%] sm:px-3 sm:text-[11px] sm:tracking-[0.14em]">
        {labelAfter}
      </span>

      {/* Divider + handle */}        <div
        className="absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(30,111,217,0.85),transparent)]"
        style={{ left: `${value}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(value)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          data-cursor="drag"
          data-cursor-label="Drag"
          className={cn(
            "absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] backdrop-blur-md transition-all duration-300 ease-[var(--ease-out-expo)]",
            "hover:scale-110 hover:border-[var(--border-strong)] hover:bg-[var(--surface-3)]",
            "focus-visible:scale-110 focus-visible:border-teal-soft",
            dragging && "scale-110 border-teal-soft/70",
          )}
        >
          <span className="flex items-center gap-0.5 text-white/85">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M6 2 2 7l4 5M12 2l4 5-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
