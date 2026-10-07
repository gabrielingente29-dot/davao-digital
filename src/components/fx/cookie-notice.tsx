import { Cookie, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

/**
 * Cookie notice.
 *
 * The site ships a GA4 snippet that stays dormant until a Measurement ID is
 * pasted in (see index.html), so today this notice is informational. It is
 * already in place so that switching analytics on does not silently start
 * setting cookies without consent.
 *
 * Dismissal is stored in localStorage, so the banner is a one-time thing.
 */
const STORAGE_KEY = "gm:cookie-notice";

export function CookieNotice() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === "dismissed";
    } catch {
      dismissed = false;
    }
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = React.useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      /* private mode — dismiss for this visit only */
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    // Sits above the phone-only sticky CTA (z-65, bottom-0) so the two never
    // overlap; on desktop the sticky bar is hidden so it drops to the corner.
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-24 z-[66] sm:inset-x-auto sm:right-5 sm:max-w-[26rem] lg:bottom-6"
    >
      <div className="glass-strong hairline flex items-start gap-3.5 rounded-3xl border border-[var(--border)] p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-5">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-2)]">
          <Cookie className="size-4 text-[var(--accent-2)]" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-[14px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
            A note about cookies
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            We only use cookies for anonymous traffic numbers, so we can see which pages help. No
            advertising cookies, nothing sold to anyone.{" "}
            <a
              href="/privacy.html"
              className="text-[var(--accent-1)] underline-offset-4 hover:underline"
            >
              Read the policy
            </a>
            .
          </p>
          <div className="mt-3.5">
            <Button type="button" size="sm" onClick={dismiss}>
              Got it
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss cookie notice"
          className="grid size-7 shrink-0 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--tint-2)] hover:text-[var(--text-primary)]"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
