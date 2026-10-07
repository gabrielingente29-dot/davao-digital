/**
 * Theme preference store.
 *
 * The site ships dark by default (it was built as a dark-first site), but light
 * mode is a first-class citizen now. The default follows the OS
 * `prefers-color-scheme`, and the visitor can override it from the nav toggle /
 * footer switch. The choice is persisted.
 *
 * The resolved value is mirrored onto `<html data-theme="dark|light">` so plain
 * CSS can key off it (see index.css) and the inline head script can set it before
 * React boots (so there's no flash of the wrong theme).
 */

export type ThemePref = "system" | "dark" | "light";

export const THEME_STORAGE_KEY = "gm:theme";
export const LIGHT_THEME_QUERY = "(prefers-color-scheme: light)";

export const THEME_ATTR = "data-theme" as const;

const listeners = new Set<() => void>();

function readStoredPref(): ThemePref {
  if (typeof window === "undefined") return "system";
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "dark" || value === "light" ? value : "system";
  } catch {
    return "system";
  }
}

let current: ThemePref = readStoredPref();

/** Resolves a preference + the OS scheme into the single literal theme we paint. */
export function resolveTheme(pref: ThemePref, systemLight: boolean) {
  if (pref === "dark") return "dark";
  if (pref === "light") return "light";
  return systemLight ? "light" : "dark";
}

/** Mirrors the resolved theme onto <html> for CSS. */
export function applyThemeAttribute(theme: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(THEME_ATTR, theme);
}

export function getThemePref(): ThemePref {
  return current;
}

export function setThemePref(next: ThemePref) {
  current = next;
  try {
    if (next === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* non-fatal */
  }
  listeners.forEach((listener) => listener());
}

export function subscribeThemePref(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
