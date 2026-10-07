import { ArrowUpRight, ImageIcon, Quote } from "lucide-react";
import * as React from "react";

import { FitScale } from "@/components/art/fit-scale";
import { MeshField } from "@/components/art/mesh";
import { mockPages } from "@/components/art/mock-pages";
import { CompareSlider } from "@/components/fx/compare";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { caseStudies, type CaseStudy } from "@/data/site";
import { cn } from "@/lib/utils";

/**\n * The obvious spot for real screenshots. Drop a file into /public and set\n * `before.src` / `after.src` in src/data/site.ts — this component swaps itself.\n */
function ScreenshotSlot({
  src,
  caption,
  tone,
  file,
  mock,
}: {
  src: string | null;
  caption: string;
  tone: "before" | "after";
  file: string;
  mock: CaseStudy["mock"];
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={caption}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }

  const Mock = mockPages[mock];

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-900">
      {/* ghosted mock so the comparison still tells the story */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-700",
          tone === "before" ? "opacity-20 [filter:grayscale(1)_blur(1.5px)]" : "opacity-60",
        )}
      >
        <FitScale designWidth={1120} ratio={0.625}>
          <Mock />
        </FitScale>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          tone === "before"
            ? "bg-[linear-gradient(180deg,rgba(10,11,16,0.86),rgba(10,11,16,0.94))]"
            : "bg-[linear-gradient(180deg,rgba(10,11,16,0.42),rgba(10,11,16,0.78))]",
        )}
      />

      {/* dashed drop zone */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-3 rounded-2xl border border-dashed",
          tone === "before" ? "border-white/15" : "border-teal-brand/30",
        )}
      />

      <div className="relative flex h-full flex-col p-6 sm:p-8">
        {/* Kept to the visible half — the divider only ever reveals one side. */}
        <div
          className={cn(
            "mt-auto flex flex-col gap-2.5",
            tone === "before" ? "w-[40%] items-start text-left" : "w-[46%] items-end self-end text-right",
          )}
        >
          <span
            className={cn(
              "grid size-11 place-items-center rounded-2xl border border-dashed",
              tone === "before"
                ? "border-white/20 bg-white/[0.03]"
                : "border-teal-brand/35 bg-teal-brand/[0.07]",
            )}
          >
            <ImageIcon className={cn("size-5", tone === "before" ? "text-white/40" : "text-[var(--accent-2)]")} />
          </span>
          <p className="font-display text-[15px] font-medium tracking-[-0.01em] text-white/85">
            {caption}
          </p>
          <p className="text-[11.5px] leading-relaxed text-white/40">
            Drop your screenshot at
            <span className="mt-1 block font-mono text-[11px] text-[var(--accent-2)]">{file}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function StatRow({ stats }: { stats: CaseStudy["stats"] }) {
  return (
    <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-[11.5px] uppercase tracking-[0.12em] text-white/35">{stat.label}</dt>
          <dd className="mt-1.5 font-display text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.03em] text-white">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CaseCard({ study, index, beforeCaption, afterCaption }: { study: CaseStudy; index: number; beforeCaption: string; afterCaption: string }) {
  const reversed = index % 2 === 1;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <Reveal className={cn(reversed && "lg:order-2")}>
        <Badge variant="accent" size="default" className="uppercase tracking-[0.14em]">
          {study.client} · {study.industry}
        </Badge>
        <h3 className="mt-5 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
          {study.headline}
        </h3>
        <p className="mt-5 text-[16px] leading-relaxed text-white/58">{study.summary}</p>

        <StatRow stats={study.stats} />

        <figure className="glass hairline mt-8 rounded-3xl p-6">
          <Quote className="size-4 text-[var(--accent-1)]" />
          <blockquote className="mt-3 text-[15.5px] leading-relaxed text-white/78">
            "{study.quote}"
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="size-8 rounded-full bg-ocean-brand" />
            <span className="text-[13px] text-white/45">{study.quoteBy}</span>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal delay={0.08} className={cn(reversed && "lg:order-1")}>
        <div className="glass hairline relative rounded-4xl p-2 shadow-[0_50px_120px_-70px_rgba(0,0,0,0.95)] sm:p-2.5">
          <CompareSlider
            className="aspect-[4/3] sm:aspect-[16/11]"
            start={46}
            before={
              <ScreenshotSlot
                src={study.before.src}
                caption={study.before.caption}
                tone="before"
                file={`/public/case-${index + 1}-before.jpg`}
                mock={study.mock}
              />
            }
            after={
              <ScreenshotSlot
                src={study.after.src}
                caption={study.after.caption}
                tone="after"
                file={`/public/case-${index + 1}-after.jpg`}
                mock={study.mock}
              />
            }
            labelBefore="Before"
            labelAfter="After"
            ariaLabel={`Compare the old and new website for ${study.client}`}
          />
        </div>
        <p className="mt-4 flex items-center justify-between px-1 text-[12.5px] text-white/35">
          <span>{study.location}</span>
          <span className="flex items-center gap-1.5">
            Drag to compare
            <ArrowUpRight className="size-3.5" />
          </span>
        </p>
      </Reveal>
    </div>
  );
}

export function CaseStudies() {
  return (
    <Section id="work" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="cool" />

      <SectionHeading
        eyebrow="Recent work"
        title={
          <>
            Real Davao businesses,
            <span className="text-[var(--accent-1)]"> real results.</span>
          </>
        }
        body="Two recent builds. Same process, same seven-day timeline — different industries, different problems solved."
        className="relative z-10"
      />

      <div className="relative z-10 mt-16 flex flex-col gap-20 lg:gap-28">
        {caseStudies.map((study, index) => (
          <CaseCard key={study.client} study={study} index={index} beforeCaption={study.before.caption} afterCaption={study.after.caption} />
        ))}
      </div>

      {/* ground-truth strip: before → after for the two built-in cases */}
      <Reveal className="relative z-10 mt-6 flex flex-col gap-6 text-center">
        <div className="glass hairline rounded-4xl px-7 py-6 sm:px-9 sm:py-7">
          <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Two businesses · one process · seven days apart
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <React.Fragment key={study.client}>
                <div className="text-left">
                  <p className="mb-1 flex items-center gap-1.5 text-[12px] text-white/35">
                    <span className="grid size-1.5 rounded-full bg-white/15" />
                    BEFORE
                  </p>
                  <p className="font-display text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.03em] text-white/80">
                    {study.before.caption}
                  </p>
                </div>
                <div className="text-left">
                  <p className="mb-1 flex items-center gap-1.5 text-[12px] text-teal-brand/70">
                    <span className="grid size-1.5 rounded-full bg-teal-brand/30" />
                    AFTER
                  </p>
                  <p className="font-display text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.03em] text-white">
                    {study.after.caption}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="relative z-10 mt-16 flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-[15px] text-white/50">
          Want to see a full preview built for your business? We&apos;ll design the first version
          before you pay anything.
        </p>
        <Button asChild size="lg" variant="secondary" className="group">
          <a href="#get-started">
            Request my free preview
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
}

export {};
