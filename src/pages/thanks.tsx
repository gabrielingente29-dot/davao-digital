import { ArrowRight, CheckCircle2, Clock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Reveal, Section } from "@/components/fx/reveal";
import { Button } from "@/components/ui/button";
import { brand, promise } from "@/data/site";
import { PageShell } from "@/pages/page-shell";

const steps = [
  {
    title: "We read your details",
    body: "A real person — not a bot — reads what you sent, usually within a few hours.",
  },
  {
    title: "We build your first version",
    body: "You get a working preview of your website before you pay anything.",
  },
  {
    title: "You review it, we launch",
    body: "Tell us what to change. Once you're happy, we go live — typically within 7 days.",
  },
];

export function ThanksPage() {
  return (
    <Section className="relative pb-28 pt-36 sm:pt-44">
      <MeshField variant="soft" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal blur={false} y={12}>
          <span className="grid size-16 place-items-center rounded-3xl bg-leaf-brand/15 text-leaf-brand">
            <CheckCircle2 className="size-8" />
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-[var(--text-primary)]">
            Salamat! Your details are with us.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[var(--text-secondary)]">
            {promise.responseTime}
            {" "}
            {promise.detail}
          </p>
        </Reveal>

        {/* Response-time promise */}
        <Reveal delay={0.18}>
          <div className="hairline mt-8 flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--tint-1)] px-5 py-4">
            <Clock className="size-5 shrink-0 text-teal-brand" />
            <p className="text-[14.5px] text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">Our promise:</span>{" "}
              same-day replies Mon–Sat, and never longer than one business day.
            </p>
          </div>
        </Reveal>

        {/* What happens next */}
        <Reveal delay={0.24}>
          <h2 className="mt-14 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
            What happens next
          </h2>
          <ol className="mt-6 flex flex-col gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ocean-brand font-display text-[12px] font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[15.5px] font-semibold text-[var(--text-primary)]">{step.title}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--text-muted)]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Escape hatches */}
        <Reveal delay={0.3}>
          <div className="hairline mt-14 rounded-4xl border border-[var(--border)] bg-[var(--tint-1)] p-7">
            <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Didn&apos;t hear from us?
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
              If your mail app didn&apos;t open, message us directly and we&apos;ll pick it up from
              there.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button asChild size="default">
                <a href={brand.messenger} target="_blank" rel="noreferrer noopener">
                  <MessageCircle className="size-4" />
                  Messenger
                </a>
              </Button>
              <Button asChild variant="secondary" size="default">
                <a href={`tel:${brand.phoneHref}`}>
                  <Phone className="size-4" />
                  {brand.phone}
                </a>
              </Button>
              <Button asChild variant="outline" size="default">
                <a href={`mailto:${brand.email}`}>
                  <Mail className="size-4" />
                  {brand.email}
                </a>
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-[12.5px] text-[var(--text-muted)]">
              <ShieldCheck className="size-3.5 text-[var(--accent-1)]" />
              We never share your details. No spam, no mailing list.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <div className="mt-10 flex flex-wrap gap-5 text-[14.5px]">
            <a href="/" className="group inline-flex items-center gap-1.5 font-medium text-[var(--accent-1)] transition-colors hover:text-[var(--text-primary)]">
              Back to the home page
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/#work" className="group inline-flex items-center gap-1.5 font-medium text-[var(--accent-1)] transition-colors hover:text-[var(--text-primary)]">
              See recent work
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/#pricing" className="group inline-flex items-center gap-1.5 font-medium text-[var(--accent-1)] transition-colors hover:text-[var(--text-primary)]">
              Check pricing
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Route entry — applies the shared shell. */
export function ThanksRoute() {
  return (
    <PageShell>
      <ThanksPage />
    </PageShell>
  );
}
