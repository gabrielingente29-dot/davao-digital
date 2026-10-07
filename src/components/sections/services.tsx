import { motion } from "framer-motion";
import { ArrowUpRight, Search, Star, TrendingUp } from "lucide-react";
import * as React from "react";

import { GridField, MeshField } from "@/components/art/mesh";
import { serviceIcons } from "@/components/art/service-icons";
import { CursorSpotlight } from "@/components/fx/cursor-spotlight";
import { CardBody, CardContainer, CardGlare, CardItem } from "@/components/fx/three-d-card";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { services } from "@/data/site";
import { cn } from "@/lib/utils";

/* ------------------------------ mini visuals ------------------------------ */

function MiniSearchResults() {
  return (
    <div className="mt-6 space-y-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]/50 p-3">
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--tint-1)] px-3 py-2">
        <Search className="size-3.5 text-[var(--text-muted)]" />
        <span className="text-[12px] text-[var(--text-muted)]">web design near me · Davao</span>
      </div>
      {[
        { label: "Your business", mine: true },
        { label: "Competitor A", mine: false },
        { label: "Competitor B", mine: false },
      ].map((row) => (
        <div
          key={row.label}
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors",
            row.mine
              ? "border border-ocean-brand/30 bg-ocean-brand/10"
              : "border border-[var(--border)] bg-[var(--tint-1)]",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              row.mine ? "bg-teal-brand" : "bg-[var(--tint-3)]",
            )}
          />
          <span className={cn("text-[12px]", row.mine ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]")}>
            {row.label}
          </span>
          {row.mine ? (
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-2)]">
              #1
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function MiniLocalMap() {
  return (
    <div className="relative mt-6 h-24 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]/50">
      <div className="absolute inset-0 bg-grid-sm opacity-40" />
      <span className="absolute left-[20%] top-[30%] size-1.5 rounded-full bg-[var(--tint-3)]" />
      <span className="absolute left-[62%] top-[68%] size-1.5 rounded-full bg-[var(--tint-3)]" />
      <span className="absolute left-[78%] top-[24%] size-1.5 rounded-full bg-[var(--tint-3)]" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 animate-glow-pulse rounded-full bg-ocean-brand/25 blur-md" />
        <span className="relative grid size-7 place-items-center rounded-full border border-teal-brand/40 bg-[var(--surface-3)]">
          <span className="size-2 rounded-full bg-ocean-brand" />
        </span>
      </span>
      <span className="absolute bottom-2 left-3 rounded-full bg-[var(--surface-3)] px-2.5 py-1 text-[10.5px] font-medium text-[var(--text-secondary)]">
        Davao City · verified
      </span>
    </div>
  );
}

function MiniReport() {
  const bars = [40, 62, 50, 78, 88];
  return (
    <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]/50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Enquiries</p>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
          <TrendingUp className="size-3" />
          +41%
        </span>
      </div>
      <div className="mt-3 flex h-14 items-end gap-2">
        {bars.map((height, index) => (
          <span
            key={index}
            className="flex-1 animate-rack rounded-t-md bg-ocean-brand/70"
            style={{ height: `${height}%`, animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function MiniUptime() {
  return (
    <div className="mt-6 space-y-2">
      {[
        { label: "Uptime", value: "99.98%" },
        { label: "Backups", value: "Daily" },
        { label: "Updates", value: "Automatic" },
      ].map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-1)]/40 px-3.5 py-2.5"
        >
          <span className="text-[12px] text-[var(--text-muted)]">{row.label}</span>
          <span className="flex items-center gap-2 text-[12px] font-semibold text-[var(--text-secondary)]">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function MiniDesignStack() {
  const layers: string[] = ["clinic", "cafe", "workshop"];
  return (
    <div className="mt-7">
      <div className="relative h-[148px] sm:h-[168px]">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute h-[96px] w-[128px] overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_24px_50px_-40px_rgba(0,0,0,0.95)] sm:h-[104px] sm:w-[168px]",
              index === 0 && "left-0 top-0 z-30 bg-ocean-brand",
              index === 1 && "left-[64px] top-5 z-20 bg-leaf-brand sm:left-[86px] sm:top-6",
              index === 2 && "left-[128px] top-10 z-10 bg-[var(--surface-3)] sm:left-[172px] sm:top-12",
            )}
          >
            <span className="absolute inset-0 bg-grid-sm opacity-30" />
            <span className="absolute inset-x-3 top-3 h-1.5 w-10 rounded-full bg-[var(--tint-3)]" />
            <span className="absolute inset-x-3 top-7 h-8 rounded-lg bg-[var(--tint-2)]" />
            <span className="absolute inset-x-3 bottom-3 h-1.5 w-16 rounded-full bg-[var(--tint-3)]" />
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-[10.5px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
        Designs built around your customers
      </p>
    </div>
  );
}

function MiniAdsPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]/50 p-4">
        <div className="flex items-center gap-2.5">
          <span className="size-6 rounded-full bg-ocean-brand" />
          <div className="leading-tight">
            <p className="text-[12px] font-semibold text-[var(--text-primary)]">Your business</p>
            <p className="text-[10.5px] text-[var(--text-muted)]">Sponsored · Davao City</p>
          </div>
        </div>
        <div className="mt-3 h-24 rounded-xl bg-ocean-brand/30" />
        <p className="mt-3 text-[12.5px] font-medium text-[var(--text-secondary)]">
          Book a free consultation this week
        </p>
        <span className="mt-3 inline-flex rounded-lg bg-[var(--tint-3)] px-3 py-1.5 text-[11.5px] font-semibold text-[var(--text-primary)]">
          Send message
        </span>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)]/50 p-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Campaign results</p>
        <div className="mt-4 space-y-3">
          {[
            { label: "Cost per lead", value: "₱42", width: "38%" },
            { label: "Click-through rate", value: "3.1%", width: "64%" },
            { label: "Leads this month", value: "128", width: "92%" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[var(--text-muted)]">{row.label}</span>
                <span className="font-semibold text-[var(--text-secondary)]">{row.value}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--tint-2)]">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: row.width }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-full rounded-full bg-ocean-brand"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const extras: Record<string, React.ReactNode> = {
  "Website design": <MiniDesignStack />,
  "Hosting & updates": <MiniUptime />,
  "Google Business Profile": <MiniLocalMap />,
  "Local SEO": <MiniSearchResults />,
  "Monthly reports": <MiniReport />,
  "Meta ads management": <MiniAdsPreview />,
};

/* --------------------------------- section -------------------------------- */

export function Services() {
  return (
    <Section id="services" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="soft" />

      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            One team for the website,
            <span className="text-[var(--accent-1)]"> the search results and the ads.</span>
          </>
        }
        body="Everything a Davao business needs to be found, trusted and booked — built, hosted and managed by the same people."
        className="relative z-10"
      />

      <CursorSpotlight className="relative z-10 mt-16" size={620} intensity={0.1}>
        <ul className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal
                as="li"
                key={service.title}
                delay={index * 0.06}
                className={cn("min-w-0", service.span, service.wide && "sm:col-span-2")}
              >
                <CardContainer
                  containerClassName="block h-full"
                  strength={30}
                  className="h-full"
                >
                  <CardBody className="h-full">
                    <CardItem translateZ={0} className="h-full">
                      <article
                        data-cursor="hover"
                        className={cn(
                          "group/bento hairline relative flex h-full flex-col overflow-hidden rounded-4xl border border-[var(--border)] bg-[var(--surface-raised)]/70 p-7 backdrop-blur-xl",
                          "transition-[border-color,box-shadow,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-[var(--border-strong)] hover:shadow-[0_40px_100px_-60px_rgba(0,0,0,0.12)]",
                          service.wide && "lg:flex-row lg:items-center lg:gap-12 lg:p-9",
                        )}
                      >
                        <CardGlare />

                        <div
                          className={cn(
                            "relative flex flex-col",
                            service.wide && "lg:w-[42%] lg:shrink-0",
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="grid size-14 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--tint-1)] transition-colors duration-500 group-hover/bento:border-[var(--border-strong)] group-hover/bento:bg-[var(--tint-2)]">
                              <Icon />
                            </span>
                            <ArrowUpRight className="size-4 text-[var(--text-muted)] transition-all duration-500 group-hover/bento:translate-x-0.5 group-hover/bento:-translate-y-0.5 group-hover/bento:text-[var(--accent-2)]" />
                          </div>

                          <h3 className="mt-6 font-display text-[1.35rem] font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                            {service.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                            {service.body}
                          </p>
                        </div>

                        <div
                          className={cn(
                            "relative",
                            service.wide ? "mt-8 w-full lg:mt-0 lg:w-auto lg:flex-1" : "mt-auto",
                          )}
                        >
                          {extras[service.title]}
                        </div>
                      </article>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </Reveal>
            );
          })}
        </ul>
      </CursorSpotlight>

      <Reveal className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-[var(--text-muted)]">
        <span className="flex items-center gap-2">
          <Star className="size-3.5 text-leaf-brand" />
          Built in Davao City, working all over the Philippines
        </span>
        <span className="hidden sm:block">·</span>
        <span>Nothing outsourced. Same team, every month.</span>
      </Reveal>
    </Section>
  );
}
