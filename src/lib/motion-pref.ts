/**
 * Motion preference store.
 *
 * Accessibility means we have to honour `prefers-reduced-motion`. But that OS
 * switch is global — Windows "Animation effects" off, or a battery saver mode,
 * silences every site on the machine — and plenty of people still want this one
 * to move. So the default follows the OS, and the visitor can override it from
 * the nav toggle / footer switch. The choice is persisted.
 *
 * The resolved value is mirrored onto `<html data-motion="full|reduced">` so
 * plain CSS can key off it (see index.css) and an inline script in index.html
 * can set it before React ever runs.
 */

export type MotionPref = "system" | "full" | "reduced";

export const MOTION_STORAGE_KEY = "gm:motion";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const listeners = new Set<() => void>();

function readStoredPref(): MotionPref {
  if (typeof window === "undefined") return "system";
  try {
    const value = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return value === "full" || value === "reduced" ? value : "system";
  } catch {
    // Private mode / blocked storage: the preference still works, it just won't
    // survive a reload.
    return "system";
  }
}

let current: MotionPref = readStoredPref();

/** Collapses a preference + the OS setting into the single boolean we act on. */
export function resolveReducedMotion(pref: MotionPref, systemReduced: boolean) {
  if (pref === "full") return false;
  if (pref === "reduced") return true;
  return systemReduced;
}

/** Mirrors the resolved preference onto <html> for CSS and the cursor layer. */
export function applyMotionAttribute(reduced: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.motion = reduced ? "reduced" : "full";
}

export function getMotionPref(): MotionPref {
  return current;
}

export function setMotionPref(next: MotionPref) {
  current = next;
  try {
    if (next === "system") window.localStorage.removeItem(MOTION_STORAGE_KEY);
    else window.localStorage.setItem(MOTION_STORAGE_KEY, next);
  } catch {
    /* non-fatal */
  }
  listeners.forEach((listener) => listener());
}

export function subscribeMotionPref(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
