import { ArrowRight, Compass, Home, MessageCircle, Phone } from "lucide-react";
import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Reveal, Section } from "@/components/fx/reveal";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/site";
import { PageShell } from "@/pages/page-shell";

/** Absolute links so the page works from any URL depth. */
const popular = [
  { label: "Our services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Recent work", href: "/#work" },
  { label: "How it works", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Get a free preview", href: "/#get-started" },
];

export function NotFoundPage() {
  React.useEffect(() => {
    // Keep the 404 out of search results.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <Section className="relative flex min-h-[70vh] items-center pb-28 pt-36 sm:pt-40">
      <MeshField variant="hero" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal blur={false} y={12}>
          <p className="font-display text-[clamp(4.5rem,14vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--text-primary)]">
            4<span className="text-[var(--accent-1)]">0</span>4
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold tracking-[-0.035em] text-[var(--text-primary)]">
            This page took a wrong turn.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-4 text-[16.5px] leading-relaxed text-[var(--text-secondary)]">
            The link may be old or mistyped. Nothing is broken on your end — pick a direction
            below and we&apos;ll get you back on track.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="/">
                <Home className="size-4" />
                Back to home
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <a href="/#get-started">
                Get a free preview
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-14 text-left">
            <p className="flex items-center justify-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <Compass className="size-4" />
              Popular pages
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {popular.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex rounded-full border border-[var(--border)] bg-[var(--tint-1)] px-4 py-2 text-[13.5px] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-12 text-[14px] text-[var(--text-muted)]">
            Still stuck?{" "}
            <a
              href={brand.messenger}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-[var(--accent-1)] underline-offset-4 hover:underline"
            >
              <MessageCircle className="size-3.5" />
              Message us
            </a>{" "}
            or{" "}
            <a
              href={`tel:${brand.phoneHref}`}
              className="inline-flex items-center gap-1.5 text-[var(--accent-1)] underline-offset-4 hover:underline"
            >
              <Phone className="size-3.5" />
              {brand.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/** Route entry — applies the shared shell. */
export function NotFoundRoute() {
  return (
    <PageShell>
      <NotFoundPage />
    </PageShell>
  );
}

