import * as React from "react";

import {
  applyMotionAttribute,
  getMotionPref,
  REDUCED_MOTION_QUERY,
  resolveReducedMotion,
  setMotionPref,
  subscribeMotionPref,
  type MotionPref,
} from "@/lib/motion-pref";
import {
  applyThemeAttribute,
  getThemePref,
  LIGHT_THEME_QUERY,
  resolveTheme,
  setThemePref,
  subscribeThemePref,
  type ThemePref,
} from "@/lib/theme-pref";

/** Media query hook that plays nice with SSR and hydration. */
export function useMediaQuery(query: string) {
  // Seed from the real matchMedia value so the first render already knows —
  // starting at `false` produced a one-frame flash of the wrong branch.
  const [matches, setMatches] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on devices with a real pointer (mouse/trackpad). */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * The visitor-facing motion preference. `"system"` follows the OS setting,
 * `"full"` / `"reduced"` override it. Used by the toggle in the nav and footer.
 */
export function useMotionPref() {
  const [pref, setPref] = React.useState<MotionPref>(getMotionPref);

  React.useEffect(() => subscribeMotionPref(() => setPref(getMotionPref())), []);

  const update = React.useCallback((next: MotionPref) => {
    setMotionPref(next);
    // Apply straight away so CSS transitions don't wait on the re-render.
    applyMotionAttribute(
      resolveReducedMotion(next, window.matchMedia(REDUCED_MOTION_QUERY).matches),
    );
  }, []);

  return [pref, update] as const;
}

/**
 * Reduced motion, as *this site* should behave: the OS setting by default,
 * overridable by the visitor. Everything that animates should branch on this
 * rather than on the raw media query, so the toggle actually reaches it.
 */
export function usePrefersReducedMotion() {
  const systemReduced = useMediaQuery(REDUCED_MOTION_QUERY);
  const [pref] = useMotionPref();
  const reduced = resolveReducedMotion(pref, systemReduced);

  React.useEffect(() => {
    applyMotionAttribute(reduced);
  }, [reduced]);

  return reduced;
}

/** Tracks which section id is currently in view, for nav highlighting. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0] ?? "");

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Normalised mouse position (-0.5 → 0.5) relative to an element. */
export function usePointerOffset<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const onPointerMove = React.useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const reset = React.useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return { ref, offset, onPointerMove, reset };
}

/**
 * The visitor-facing theme preference. `"system"` follows the OS
 * `prefers-color-scheme`, `"dark"` / `"light"` override it. Used by the toggle
 * in the nav and the switch in the footer.
 */
export function useThemePref() {
  const [pref, setPref] = React.useState<ThemePref>(getThemePref);

  React.useEffect(() => subscribeThemePref(() => setPref(getThemePref())), []);

  const update = React.useCallback((next: ThemePref) => {
    setThemePref(next);
    applyThemeAttribute(
      resolveTheme(next, window.matchMedia(LIGHT_THEME_QUERY).matches),
    );
  }, []);

  return [pref, update] as const;
}

/**
 * Resolved theme as *this site* should paint it: the OS scheme by default,
 * overridable by the visitor. Everything that branches on palette should read
 * this (or, even better, read the CSS variable) rather than the raw media query.
 */
export function usePrefersLightTheme() {
  const systemLight = useMediaQuery(LIGHT_THEME_QUERY);
  const [pref] = useThemePref();
  return resolveTheme(pref, systemLight) === "light";
}

/** Returns the resolved literal theme (`"dark"` | `"light"`). */
export function useTheme() {
  const systemLight = useMediaQuery(LIGHT_THEME_QUERY);
  const [pref] = useThemePref();
  return resolveTheme(pref, systemLight) as "dark" | "light";
}
