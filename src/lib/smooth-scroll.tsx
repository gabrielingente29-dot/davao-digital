import Lenis from "lenis";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";

const LenisContext = React.createContext<Lenis | null>(null);

/**
 * Lenis smooth scrolling with graceful degradation:
 * - disabled entirely for reduced-motion users (native scroll takes over)
 * - every same-page anchor is intercepted and eased to its target
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.15,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    document.documentElement.classList.add("lenis-active");
    setLenis(instance);

    let frame = 0;
    const loop = (time: number) => {
      instance.raf(time);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis-active");
    };
  }, [reduce]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return React.useContext(LenisContext);
}

/** Smoothly scrolls to "#id" (or an element), falling back to native behaviour. */
export function useScrollTo() {
  const lenis = useLenis();

  return React.useCallback(
    (target: string | HTMLElement) => {
      if (lenis) {
        lenis.scrollTo(target, { offset: -92, duration: 1.25 });
        return;
      }
      const el =
        typeof target === "string" ? (document.querySelector(target) as HTMLElement | null) : target;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );
}

/** Global anchor interception so every `href="#section"` gets smooth scrolling. */
export function useAnchorInterceptor(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      window.history.replaceState(null, "", hash);
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);
}
