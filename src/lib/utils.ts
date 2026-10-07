import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a peso amount with separators: 15000 -> "15,000" */
export function peso(amount: number) {
  return new Intl.NumberFormat("en-PH").format(amount);
}

/**
 * Resolves a bare in-page anchor against the home page.
 *
 * On `/` a `#services` link just scrolls. On `/thanks.html` (or any sub-page) the
 * same bare anchor would look for a `#services` element that does not exist there
 * and silently do nothing — so we prefix it with `/` to send the visitor home
 * and then to the section.
 */
export function anchorHref(href: string) {
  if (!href.startsWith("#")) return href;
  if (typeof window === "undefined") return href;
  const path = window.location.pathname;
  const isHome = path === "/" || path === "" || /\/index\.html$/.test(path);
  return isHome ? href : `/${href}`;
}
