/**
 * SERVER ENTRY — used only by `scripts/prerender.mjs`.
 *
 * Why this exists
 * ---------------
 * The site is a client-rendered React app. Search engines mostly cope, but a
 * lot of AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot …) do not run
 * JavaScript at all — they only ever see the raw HTML. So after `vite build`
 * we render every public page to static markup in Node and write it into the
 * built `#root`, which means "View source" shows the real headings, services,
 * prices, FAQs and phone number even with JavaScript switched off.
 *
 * The browser still boots React on top of it, so nothing about the live
 * experience changes.
 *
 * Two rules for anything rendered here:
 *   1. Never touch `window`/`document` during render (effects are fine).
 *   2. Content must be VISIBLE in the output. Entrance animations that start at
 *      `opacity: 0` are short-circuited with `import.meta.env.SSR` so the
 *      prerendered page is readable with no JS (see fx/reveal.tsx,
 *      fx/text-generate-effect.tsx, sections/faq.tsx).
 */
import { renderToStaticMarkup } from "react-dom/server";

import { App } from "@/App";
import { NotFoundRoute } from "@/pages/not-found";
import { PrivacyRoute } from "@/pages/privacy";
import { TermsRoute } from "@/pages/terms";
import { ThanksRoute } from "@/pages/thanks";

export type Preroute = {
  /** Built HTML file to inject into, relative to dist/. */
  file: string;
  /** Public URL, for logging. */
  url: string;
  render: () => string;
};

export const routes: Preroute[] = [
  { file: "index.html", url: "/", render: () => renderToStaticMarkup(<App />) },
  {
    file: "privacy.html",
    url: "/privacy.html",
    render: () => renderToStaticMarkup(<PrivacyRoute />),
  },
  {
    file: "terms.html",
    url: "/terms.html",
    render: () => renderToStaticMarkup(<TermsRoute />),
  },
  {
    file: "thanks.html",
    url: "/thanks.html",
    render: () => renderToStaticMarkup(<ThanksRoute />),
  },
  {
    file: "404.html",
    url: "/404.html",
    render: () => renderToStaticMarkup(<NotFoundRoute />),
  },
];
