import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { GridField, MeshField } from "@/components/art/mesh";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { about, brand } from "@/data/site";
import { anchorHref } from "@/lib/utils";

/**
 * ABOUT — who we are, what we do, who we serve, where we are.
 *
 * Written to be quotable: the first paragraph is self-contained enough that an
 * AI assistant can lift it as an answer to "who are Davao Digital?", and the
 * stat cards repeat the same numbers that appear in the pricing section and in
 * the JSON-LD, so nothing contradicts anything else.
 *
 * The `<address>` block is the NAP signal (name + area + phone + email). There
 * is deliberately no street address: the studio is online-first and has no
 * walk-in office, and a fake address is worse than none.
 */
export function About() {
  return (
    <Section id="about" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="cool" />
      <GridField className="opacity-30" />

      <div className="relative z-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ------------------------------- prose ------------------------------ */}
        <div>
          <SectionHeading
            align="left"
            eyebrow={about.eyebrow}
            title={about.heading}
            titleClassName="max-w-2xl"
          />

          <Reveal delay={0.12} className="mt-7">
            <p className="max-w-[54ch] text-[17.5px] leading-relaxed text-[var(--text-primary)]">
              {about.lede}
            </p>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4">
            {about.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.16 + index * 0.05}>
                <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {about.operatingSince ? (
            <Reveal delay={0.3} className="mt-6">
              <p className="text-[15px] font-medium text-[var(--text-secondary)]">
                Designing and building websites for Davao businesses since{" "}
                {about.operatingSince}.
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.34} className="mt-9">
            <Button asChild size="lg" variant="secondary" className="group">
              <a href={anchorHref("#pricing")}>
                See our packages and prices
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </Reveal>
        </div>

        {/* --------------------------- facts + NAP ---------------------------- */}
        <div className="flex flex-col gap-5">
          <Reveal delay={0.1}>
            <dl className="grid gap-4 sm:grid-cols-2">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="hairline rounded-3xl border border-[var(--border)] bg-[var(--tint-1)] p-5 backdrop-blur-xl"
                >
                  <dt className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="tnum mt-2 font-display text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-[var(--text-primary)]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="hairline rounded-4xl border border-[var(--border)] bg-[var(--tint-1)] p-7 backdrop-blur-xl">
              <Badge variant="accent" size="sm" className="uppercase tracking-[0.14em]">
                What we do differently
              </Badge>
              <ul className="mt-5 flex flex-col gap-3">
                {about.differentiators.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* NAP — name, area, phone, email. Same everywhere on the site. */}
          <Reveal delay={0.22}>
            <address className="hairline not-italic rounded-4xl border border-[var(--border)] bg-[var(--tint-1)] p-7 backdrop-blur-xl">
              <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Talk to the studio
              </p>
              <p className="mt-4 font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                {brand.name}
              </p>
              <p className="mt-1 flex items-start gap-2.5 text-[14.5px] text-[var(--text-secondary)]">
                <MapPin className="mt-0.5 size-4 shrink-0 text-leaf-brand/80" />
                <span>{brand.location}</span>
              </p>

              <div className="mt-5 flex flex-col gap-2.5 text-[14.5px]">
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="flex items-center gap-2.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <Phone className="size-4 shrink-0 text-teal-brand/80" />
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <Mail className="size-4 shrink-0 text-leaf-brand/80" />
                  {brand.email}
                </a>
                <a
                  href={brand.messenger}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <MessageCircle className="size-4 shrink-0 text-[var(--accent-1)]" />
                  Messenger — @{brand.messenger.split("/").pop()}
                </a>
              </div>
              <p className="mt-5 text-[12.5px] text-[var(--text-muted)]">{brand.hours}</p>
            </address>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
