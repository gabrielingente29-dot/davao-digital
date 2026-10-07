import * as React from "react";

import { CookieNotice } from "@/components/fx/cookie-notice";
import { CustomCursor } from "@/components/fx/custom-cursor";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { StickyMobileCta } from "@/components/fx/sticky-mobile-cta";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/nav";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SmoothScrollProvider, useAnchorInterceptor } from "@/lib/smooth-scroll";

/** Intercepts same-page anchors and hands them to Lenis (or native scroll). */
function AnchorBridge() {
  const reduce = usePrefersReducedMotion();
  useAnchorInterceptor(!reduce);
  return null;
}

/**
 * Shared chrome for the sub-pages (Thank you, Privacy, 404). The home page
 * embeds the same pieces directly in App.tsx; these pages are lighter and have
 * no long scroll, so they share this shell instead.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AnchorBridge />
      <ScrollProgress />
      <CustomCursor />

      <a
        href="/#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyMobileCta />
      <CookieNotice />
    </SmoothScrollProvider>
  );
}

/**
 * Breadcrumbs — good for orientation on sub-pages and cheap structured-data
 * signal. Pass the trail after “Home”.
 */
export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--text-muted)]">
        <li>
          <a href="/" className="transition-colors hover:text-[var(--text-secondary)]">
            Home
          </a>
        </li>
        {trail.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-[var(--text-muted)]/60">
              /
            </span>
            {crumb.href && index < trail.length - 1 ? (
              <a href={crumb.href} className="transition-colors hover:text-[var(--text-secondary)]">
                {crumb.label}
              </a>
            ) : (
              <span aria-current="page" className="text-[var(--text-secondary)]">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Consistent page header used by every sub-page. */
export function PageHeading({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col items-start">
      {eyebrow ? (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-ocean-brand/35 bg-ocean-brand/12 px-4 py-2 text-[13px] font-medium tracking-[0.02em] text-[var(--accent-1)]">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-[var(--text-primary)]">
        {title}
      </h1>
      {intro ? (
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[var(--text-secondary)]">
          {intro}
        </p>
      ) : null}
      {children}
    </header>
  );
}
