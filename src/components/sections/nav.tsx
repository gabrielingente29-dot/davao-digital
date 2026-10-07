import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import * as React from "react";

import { Wordmark } from "@/components/art/marks";
import { MotionToggleButton } from "@/components/fx/motion-toggle";
import { ThemeToggleButton } from "@/components/fx/theme-toggle";
import { Button } from "@/components/ui/button";
import { brand, nav } from "@/data/site";
import { useActiveSection } from "@/lib/hooks";
import { useLenis } from "@/lib/smooth-scroll";
import { anchorHref, cn } from "@/lib/utils";

const SECTION_IDS = nav.map((item) => item.href.slice(1));
const NAV_HEIGHT = "3.5rem";

/**
 * Floating navbar — a glass pill that condenses and deepens its blur as you
 * scroll, with a spring-animated indicator that tracks the active section.
 */
export function Navbar() {
  const [shrunk, setShrunk] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const active = useActiveSection(SECTION_IDS);
  const lenis = useLenis();

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setShrunk(window.scrollY > 28);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lock the page while the mobile sheet is open.
  React.useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] pt-3 sm:pt-4">
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6">
          <nav
            aria-label="Primary"
            data-cursor="hover"
            className={cn(
              // One row, never wrapping: the wordmark, phone and controls are
              // all `shrink-0` downstream, so the header can only ever get wider
              // — it can't stack text into a column the way it used to.
              "glass-nav hairline relative flex w-full min-w-0 flex-nowrap items-center justify-between gap-3 rounded-full border-[var(--border)] transition-all duration-500 ease-[var(--ease-out-expo)]",
              shrunk
                ? "h-14 px-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:px-5 lg:px-6"
                : "h-16 px-5 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.7)] sm:px-6 lg:px-7",
            )}
          >
            <a
              href={anchorHref("#top")}
              className="flex shrink-0 items-center rounded-full transition-transform duration-300 hover:scale-[1.02] focus-visible:scale-[1.02]"
              aria-label={`${brand.name} — back to top`}
            >
              <Wordmark compact={shrunk} />
            </a>

            <ul className="hidden shrink-0 items-center gap-1 lg:flex">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href} className="relative">
                    <a
                      href={anchorHref(item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-[13px] font-medium transition-colors duration-300",
                        isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full border-[var(--border)] bg-[var(--tint-3)]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`tel:${brand.phoneHref}`}
                className="hidden h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 text-[13px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)] xl:flex"
              >
                <Phone className="size-3.5 shrink-0" />
                {brand.phone}
              </a>
              <MotionToggleButton className="size-9 shrink-0" />
              <ThemeToggleButton className="size-9 shrink-0" />
              <Button asChild size="sm" className="group hidden whitespace-nowrap sm:inline-flex">
                <a href={anchorHref("#get-started")}>
                  Get your free site preview
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-2)] text-[var(--text-primary)] transition-colors hover:bg-[var(--tint-3)] lg:hidden"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[59] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ ["--nav-height" as string]: NAV_HEIGHT }}
            >
              <ul className="flex flex-col gap-1">
                {nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index + 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={anchorHref(item.href)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 border-b border-[var(--border)] py-4 font-display text-[2rem] font-semibold tracking-[-0.035em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      <span className="font-sans text-[11px] font-medium tracking-[0.2em] text-[var(--text-muted)]">
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <Button asChild size="lg" block>
                  <a href={anchorHref("#get-started")} onClick={() => setOpen(false)}>
                    Get your free site preview
                    <ArrowUpRight />
                  </a>
                </Button>
                <div className="flex items-center justify-between text-[13px] text-[var(--text-muted)]">
                  <a href={`mailto:${brand.email}`} className="hover:text-[var(--text-secondary)]">
                    {brand.email}
                  </a>
                  <a href={`tel:${brand.phoneHref}`} className="hover:text-[var(--text-secondary)]">
                    {brand.phone}
                  </a>
                </div>
                <p className="text-[12px] text-[var(--text-muted)]">{brand.hours}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
