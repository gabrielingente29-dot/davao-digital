import { ArrowRight, Phone } from "lucide-react";
import * as React from "react";

import { brand } from "@/data/site";
import { anchorHref, cn } from "@/lib/utils";

/**
 * Sticky mobile action bar.
 *
 * On phones the primary CTA scrolls out of view almost immediately, so this
 * keeps "get a free preview" (and a tap-to-call) permanently reachable. It
 * reveals after the hero and hides again once the real #get-started form is on
 * screen, so the page never shows two competing CTAs at once.
 *
 * Desktop is unaffected — the bar is `lg:hidden` and the nav already holds the CTA.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const target = document.getElementById("get-started");
      // Hide once the real form is close — no double CTA.
      const formNear = target
        ? target.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      setVisible(pastHero && !formNear);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      data-slot="sticky-mobile-cta"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[65] lg:hidden",
        "transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass-strong border-t border-[var(--border)] px-3 pb-3 pt-3 backdrop-blur-2xl">
        <div className="flex items-center gap-2.5">
          <a
            href={anchorHref("#get-started")}
            className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ocean-brand text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(30,111,217,0.9)] transition-colors active:scale-[0.98]"
          >
            Get my free preview
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href={`tel:${brand.phoneHref}`}
            aria-label={`Call ${brand.name} on ${brand.phone}`}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--tint-2)] text-[var(--text-primary)] transition-colors active:scale-[0.98]"
          >
            <Phone className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
