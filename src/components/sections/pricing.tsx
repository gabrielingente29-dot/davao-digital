import { motion } from "framer-motion";
import { ArrowRight, Check, Cloud, Globe, HardDrive, Headphones, Info, LineChart, Lock, Sparkles, Star, TrendingUp } from "lucide-react";
import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { CardBody, CardContainer, CardItem } from "@/components/fx/three-d-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricing, type Tier } from "@/data/site";
import { cn, peso } from "@/lib/utils";

const CARE_PLAN_ITEMS = [
  { icon: HardDrive, title: "Hosting and domain management", desc: "We handle renewals, uptime, and server upkeep." },
  { icon: Globe, title: "Security and software updates", desc: "Protection against vulnerabilities and outdated plugins." },
  { icon: HardDrive, title: "Automatic backups", desc: "Your site can be restored quickly if anything goes wrong." },
  { icon: Globe, title: "Uptime and speed monitoring", desc: "We catch problems before your customers do." },
  { icon: Sparkles, title: "Content updates", desc: "Up to 2 hours of edits per month (text, photos, prices, promos)." },
  { icon: Headphones, title: "Priority customer support", desc: "Direct, fast responses for questions and fixes." },
  { icon: LineChart, title: "Monthly performance report", desc: "Traffic, visitors, and recommendations." },
  { icon: TrendingUp, title: "Ongoing SEO tuning", desc: "Small adjustments to help you keep ranking locally." },
] as const;

function CarePlanItem({ item }: { item: typeof CARE_PLAN_ITEMS[number] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <item.icon className="size-4 text-[var(--accent-2)]" />
        <span className="text-[13px] font-semibold text-[var(--text-primary)]">{item.title}</span>
      </div>
      <p className="text-[12.5px] leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
    </div>
  );
}

function PriceLine({ tier, mode }: { tier: Tier; mode: "build" | "year" }) {
  const isRange = tier.build.from !== tier.build.to;

  // First-year totals, so the toggle shows a comparable number.
  const yearLow = tier.build.from + tier.monthly * 12;
  const yearHigh = tier.build.to + tier.monthly * 12;

  const label = mode === "build" ? pricing.toggle.build : pricing.toggle.year;
  const from = mode === "build" ? tier.build.from : yearLow;
  const to = mode === "build" ? tier.build.to : yearHigh;

  return (
    // `@container` + `cqw` sizes the amount against the card's own width rather
    // than the viewport, and the range sits on its own line — so a long amount
    // can never outgrow the card the way `₱10,000–15,000` did on one line.
    <div className="@container">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {label}
      </p>
      <p className="tnum mt-2.5 font-display text-[clamp(2rem,13.5cqw,3rem)] font-semibold leading-none tracking-[-0.045em] text-[var(--text-primary)]">
        <span className="align-[0.2em] text-[0.5em] font-medium text-[var(--text-muted)]">₱</span>
        {peso(from)}
        {isRange ? null : <span className="text-[var(--text-muted)]">+</span>}
      </p>
      {isRange ? (
        <p className="tnum mt-2 text-[15px] text-[var(--text-muted)]">
          up to <span className="font-semibold text-[var(--text-secondary)]">₱{peso(to)}</span>
        </p>
      ) : null}
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-muted)]">
        {mode === "build" ? (
          <>
            then{" "}
            <span className="tnum font-semibold text-[var(--accent-1)]">₱{peso(tier.monthly)}/month</span>{" "}
            for hosting, updates and management
          </>
        ) : (
          <>Build plus 12 months of management. Cancel any month after.</>
        )}
      </p>
    </div>
  );
}

function TierCard({ tier, mode }: { tier: Tier; mode: "build" | "year" }) {
  const popular = Boolean(tier.popular);

  return (
    <CardContainer
      containerClassName="h-full"
      strength={34}
      className={cn("h-full", popular && "lg:-mt-5 lg:mb-[-1.25rem]")}
    >
      <CardBody className="h-full">
        <CardItem translateZ={popular ? 26 : 0} className="h-full">
          <article
            data-cursor="hover"
            className={cn(
              "relative flex h-full flex-col overflow-hidden rounded-4xl border p-7 backdrop-blur-xl transition-shadow duration-500 sm:p-8",
              popular
                ? "border-ocean-brand/45 bg-ocean-brand/[0.06] shadow-[0_50px_120px_-70px_rgba(30,111,217,0.9)]"
                : "border-[var(--border)] bg-[var(--surface-raised)]/70 hover:shadow-[0_40px_100px_-70px_rgba(0,0,0,0.12)]",
            )}
          >
            {popular ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-ocean-brand"
              />
            ) : null}

            {/* The badge gets its own row above the tier name. Sharing a row with
                the heading let a `shrink-0` badge push the row wider than the card,
                which clipped it against the card edge. */}
            <div className="relative flex flex-col gap-2.5">
              {/* fixed slot keeps the price rows aligned across all three cards */}
              <div className="flex h-6 items-center">
                {popular ? (
                  <Badge variant="accent" size="sm" className="uppercase tracking-[0.14em]">
                    <Star className="size-3" />
                    Most popular
                  </Badge>
                ) : null}
              </div>
              <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                {tier.name}
              </h3>
              <p className="line-clamp-3 min-h-[4.875em] text-[14px] leading-relaxed text-[var(--text-muted)]">
                {tier.tagline}
              </p>
            </div>

            <div className="relative mt-7">
              <PriceLine tier={tier} mode={mode} />
            </div>

            <div className="relative my-7 h-px w-full bg-[linear-gradient(90deg,var(--border-strong),transparent)]" />

            <ul className="relative flex flex-col gap-3 pb-1">
              {tier.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-[var(--text-secondary)]">
                  <span
                    className={cn(
                      "mt-[3px] grid size-4 shrink-0 place-items-center rounded-full",
                      popular ? "bg-ocean-brand" : "bg-[var(--tint-3)]",
                    )}
                  >
                    <Check className={cn("size-2.5", popular ? "text-ink-950" : "text-[var(--text-secondary)]")} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {tier.adds.length ? (
              <div className="relative mt-6 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--tint-1)] px-4 py-3.5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <Info className="size-3" />
                  Add-ons
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {tier.adds.map((add) => (
                    <li key={add} className="text-[13.5px] text-[var(--text-muted)]">
                      {add}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="relative mt-auto pt-8">
              <Button
                asChild
                block
                size="lg"
                variant={popular ? "primary" : "secondary"}
                className="group"
              >
                <a href="#get-started">
                  {tier.cta}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="mt-3 text-center text-[12px] text-[var(--text-muted)]">
                No payment until you approve your site.
              </p>
            </div>
          </article>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export function Pricing() {
  const [mode, setMode] = React.useState<"build" | "year">("build");

  return (
    <Section id="pricing" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="warm" />

      <SectionHeading
        eyebrow={pricing.eyebrow}
        title={pricing.heading}
        body={pricing.body}
        className="relative z-10"
      >
        <Reveal delay={0.16} className="mt-2">
          <div
            role="group"
            aria-label="Show one-time build price or first-year total"
            className="glass hairline inline-flex items-center gap-1 rounded-full p-1"
          >
            {(["build", "year"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                aria-pressed={mode === key}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                  mode === key ? "text-ink-950" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
                )}
              >
                {mode === key ? (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 rounded-full bg-[#2E86F0]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{pricing.toggle[key]}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </SectionHeading>

      <div className="relative z-10 mt-16 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
        {pricing.tiers.map((tier, index) => (
          <Reveal key={tier.id} delay={index * 0.08} className="h-full">
            <TierCard tier={tier} mode={mode} />
          </Reveal>
        ))}
      </div>

      {/* Care Plan: full-width banner with 2-col grid of 8 items */}
      <Reveal delay={0.1} className="relative z-10 mt-16">
        <div className="glass hairline flex flex-col gap-6 overflow-hidden rounded-4xl border border-[var(--border)] bg-[var(--surface-1)] p-7 sm:p-9 lg:flex-row lg:px-10 lg:py-8">
          <div className="flex flex-col gap-3 lg:flex-1 lg:min-w-[220px]">
            <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Care Plan
            </p>
            <p className="font-display text-[1.15rem] font-semibold leading-tight text-[var(--text-primary)]">
              <span className="text-[var(--accent-1)]">₱3,000/month</span> (available with every package)
            </p>
            <p className="text-[14px] text-[var(--text-secondary)]">
              Your website stays fast, secure, and up to date, so you can focus on running your business.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
            {CARE_PLAN_ITEMS.map((item) => (
              <CarePlanItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="relative z-10 mt-12">
        <div className="glass hairline flex flex-col items-center justify-between gap-6 rounded-4xl px-7 py-6 sm:flex-row sm:px-9">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {pricing.reassurance.map((line) => (
              <li key={line} className="flex items-center gap-2.5 text-[15px] text-[var(--text-secondary)]">
                <span className="grid size-5 place-items-center rounded-full bg-ocean-brand">
                  <Check className="size-3 text-ink-950" />
                </span>
                {line}
              </li>
            ))}
          </ul>
          <Magnetic strength={0.2}>
            <Button asChild variant="outline" size="lg" className="group whitespace-nowrap">
              <a href="#get-started">
                Not sure which fits?
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </Magnetic>
        </div>
        <p className="mt-4 text-center text-[12.5px] text-[var(--text-muted)]">
          All prices in Philippine pesos and inclusive of hosting. Final quote depends on page count
          and features — you&apos;ll always see it before anything is built.
        </p>
      </Reveal>
    </Section>
  );
}
