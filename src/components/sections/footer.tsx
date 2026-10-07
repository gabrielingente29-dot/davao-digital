import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import * as React from "react";

import { DurianMark, EagleWingMark, MtApoHorizon, Wordmark } from "@/components/art/marks";
import { NoiseOverlay } from "@/components/art/mesh";
import { Magnetic } from "@/components/fx/magnetic";
import { MotionSwitch } from "@/components/fx/motion-toggle";
import { ThemeSwitch } from "@/components/fx/theme-toggle";
import { Button } from "@/components/ui/button";
import { brand, footer, nav } from "@/data/site";
import { useScrollTo } from "@/lib/smooth-scroll";
import { anchorHref } from "@/lib/utils";

const socials = [
  { label: "Facebook", href: brand.facebook, icon: Facebook },
  { label: "Instagram", href: brand.instagram, icon: Instagram },
  { label: "LinkedIn", href: brand.linkedin, icon: Linkedin },
  { label: "Messenger", href: brand.messenger, icon: MessageCircle },
];

export function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-[var(--border)] bg-[var(--surface-1)]">
      {/* Davao horizon */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 opacity-70">
        <MtApoHorizon />
      </div>          <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 size-[420px] opacity-[0.08] sm:size-[520px]"
      >
        <EagleWingMark />
      </div>
      <NoiseOverlay className="opacity-35" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-10 pt-56 sm:px-8 sm:pt-64">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <a
              href={anchorHref("#top")}
              className="inline-flex rounded-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:scale-[1.02]"
              aria-label={`${brand.name} — back to top`}
            >
              <Wordmark />
            </a>
            <p className="mt-6 max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--text-muted)]">
              {footer.blurb}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-1)] text-[var(--text-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--tint-2)] hover:text-[var(--text-secondary)]"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-display text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={anchorHref(link.href)}
                      className="group inline-flex items-center gap-2 text-[14.5px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                    >
                      <span className="h-px w-0 bg-teal-brand transition-all duration-300 group-hover:w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-display text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Studio
            </p>
            <ul className="mt-5 flex flex-col gap-3.5 text-[14.5px] text-[var(--text-muted)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-leaf-brand/80" />
                <span>
                  {brand.city}
                  <br />
                  {brand.region}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-[var(--text-secondary)]"
                >
                  <Mail className="size-4 shrink-0 text-[var(--accent-1)]" />
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-[var(--text-secondary)]"
                >
                  <Phone className="size-4 shrink-0 text-teal-brand/80" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={brand.directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2.5 transition-colors hover:text-[var(--text-secondary)]"
                >
                  <Navigation className="size-4 shrink-0 text-[var(--accent-2)]" />
                  Get directions
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[12.5px] text-[var(--text-muted)]">{brand.hours}</p>
          </div>
        </div>

        {/* areas served — doubles as local SEO signal */}
        <div className="mt-14 border-t border-[var(--border)] pt-8">
          <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <span className="size-4 text-leaf-brand/70">
              <DurianMark />
            </span>
            Web design &amp; digital marketing for
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {footer.areas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-[var(--border)] bg-[var(--tint-1)] px-3 py-1.5 text-[12.5px] text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-center text-[13px] text-[var(--text-muted)] sm:text-left">
            © {year} {brand.name}. Built in Davao City · Proudly serving the Philippines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end">
            <ul className="hidden items-center gap-5 text-[13px] text-[var(--text-muted)] sm:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={anchorHref(item.href)}
                    className="transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <MotionSwitch />
            <ThemeSwitch />
            <Magnetic strength={0.25}>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Back to top"
                onClick={() => {
                  // On the home page scroll smoothly; on a sub-page there is no
                  // #top element, so send the visitor home instead of doing nothing.
                  if (anchorHref("#top") === "#top") scrollTo("#top");
                  else window.location.href = anchorHref("#top");
                }}
              >
                <ArrowUp />
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
