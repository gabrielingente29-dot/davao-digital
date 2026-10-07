import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { useThemePref, usePrefersLightTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Theme controls. The site follows the OS `prefers-color-scheme` by default;
 * these let a visitor override it either way, and the choice sticks.
 *
 * `ThemeToggleButton` is the icon control in the nav, `ThemeSwitch` the labelled
 * row in the footer.
 */
export function useThemeLabel() {
  const light = usePrefersLightTheme();
  return light ? "Switch to dark mode" : "Switch to light mode";
}

export function ThemeToggleButton({ className }: { className?: string }) {
  const light = usePrefersLightTheme();
  const [, setPref] = useThemePref();
  const label = useThemeLabel();

  return (
    <button
      type="button"
      onClick={() => setPref(light ? "dark" : "light")}
      aria-pressed={light}
      aria-label={label}
      title={label}
      data-cursor-label={light ? "Light mode" : "Dark mode"}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-2)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--tint-3)] hover:text-[var(--text-primary)]",
        className,
      )}
    >
      {light ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

export function ThemeSwitch() {
  const light = usePrefersLightTheme();
  const [, setPref] = useThemePref();
  const label = useThemeLabel();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      onClick={() => setPref(light ? "dark" : "light")}
      className="group flex items-center gap-3 text-left"
    >
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-300",
          light
            ? "border-amber-500/40 bg-amber-500/15"
            : "border-ocean-brand/50 bg-ocean-brand/30",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full transition-all duration-300",
            light
              ? "left-[17px] bg-amber-400 group-hover:bg-amber-300"
              : "left-[3px] bg-[var(--text-primary)]/60 group-hover:bg-[var(--text-primary)]/80",
          )}
        />
      </span>
      <span className="text-[13px] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
        {light ? "Light" : "Dark"}
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
