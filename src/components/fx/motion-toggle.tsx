import { Zap, ZapOff } from "lucide-react";
import * as React from "react";

import { useMotionPref, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Motion controls. The site follows the OS `prefers-reduced-motion` setting by
 * default; these let a visitor override it either way, and the choice sticks.
 *
 * `MotionToggleButton` is the icon control in the nav, `MotionSwitch` the
 * labelled row in the footer.
 */

export function useMotionLabel() {
  const reduced = usePrefersReducedMotion();
  return reduced ? "Turn animations on" : "Turn animations off";
}

export function MotionToggleButton({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [, setPref] = useMotionPref();
  const label = useMotionLabel();

  return (
    <button
      type="button"
      onClick={() => setPref(reduced ? "full" : "reduced")}
      aria-pressed={!reduced}
      aria-label={label}
      title={label}
      data-cursor-label={reduced ? "Motion on" : "Motion off"}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-2)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--tint-3)] hover:text-[var(--text-primary)]",
        className,
      )}
    >
      {reduced ? <ZapOff className="size-4" /> : <Zap className="size-4" />}
    </button>
  );
}

export function MotionSwitch() {
  const reduced = usePrefersReducedMotion();
  const [, setPref] = useMotionPref();
  const label = useMotionLabel();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!reduced}
      onClick={() => setPref(reduced ? "full" : "reduced")}
      className="group flex items-center gap-3 text-left"
    >
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-300",
          reduced ? "border-[var(--border-strong)] bg-[var(--tint-2)]" : "border-ocean-brand/50 bg-ocean-brand/30",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full transition-all duration-300",
            reduced
              ? "left-[3px] bg-white/45 group-hover:bg-white/70"
              : "left-[17px] bg-ocean-soft",
          )}
        />
      </span>        <span className="text-[13px] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
        Animations
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
