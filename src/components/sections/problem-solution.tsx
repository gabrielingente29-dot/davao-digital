import { AlertTriangle, ArrowUpRight, Check, Star } from "lucide-react";
import * as React from "react";

import { MeshField, NoiseOverlay } from "@/components/art/mesh";
import { CompareSlider } from "@/components/fx/compare";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { problemSolution } from "@/data/site";

/* ----------------------------- before: the void --------------------------- */

function FacebookOnlyPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#12141c]">
      <div className="absolute inset-0 bg-grid-sm opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,120,140,0.16),transparent_60%)]" />
      <div className="relative grid h-full grid-cols-1 content-center gap-5 px-5 py-8 sm:grid-cols-[1.15fr_0.85fr] sm:px-12">          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--tint-2)] text-[15px] font-semibold text-[var(--text-muted)]">
                DC
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[var(--text-secondary)]">Davao Dental Care</p>
                <p className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
                  <AlertTriangle className="size-3 shrink-0 text-leaf-brand/80" />
                  Page · not verified · last post 3 weeks ago
                </p>
              </div>
              <span className="ml-auto rounded-md border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-muted)]">
                Follow
              </span>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--tint-1)] p-5">
              <p className="text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                “Open po kami today 9am–5pm 😊 Message lang po for inquiries. Salamat!”
              </p>
              <div className="mt-4 h-24 rounded-xl border border-[var(--border)] bg-[repeating-linear-gradient(135deg,rgba(30,111,217,0.06)_0_10px,transparent_10px_20px)]" />
              <div className="mt-4 flex items-center gap-5 text-[12px] text-[var(--text-muted)]">
                <span>2 reactions</span>
                <span>0 comments</span>
                <span>Not shared</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["No prices", "No booking", "Hard to find on Google"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--tint-1)] px-3 py-1.5 text-[11.5px] text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* what the page actually delivers */}          <div className="hidden flex-col justify-center gap-3 sm:flex">
            {[
              { label: "Reach this month", value: "14 people" },
              { label: "New enquiries", value: "0" },
              { label: "Found on Google", value: "No" },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--tint-1)] px-4 py-3.5"
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">{row.label}</p>
                <p className="mt-1 font-display text-[17px] font-semibold tracking-[-0.02em] text-[var(--text-secondary)]">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
      </div>
      <NoiseOverlay className="opacity-40" />
    </div>
  );
}

/* ------------------------------ after: the site --------------------------- */

function WinningSitePanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f6f9fc]">
      <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(30,111,217,0.14),transparent_66%)]" />

      <div className="relative flex h-full flex-col px-5 pb-8 pt-11 sm:px-12 sm:pb-8 sm:pt-12">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ocean-brand text-[11px] font-bold text-white sm:size-8 sm:text-[13px]">
            D
          </span>
          <p className="truncate text-[11px] font-semibold text-[#0e1726] sm:text-[13.5px]">
            davaosmiledental.ph
          </p>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/12 px-2 py-1 text-[9.5px] font-semibold text-emerald-700 sm:px-2.5 sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>            {/* Two columns at every size: the divider always reveals the right one. */}
        <div className="my-auto grid grid-cols-[1fr_0.62fr] items-center gap-4 pt-6 sm:gap-6">
          <div>
            <h3 className="font-display text-[clamp(0.95rem,2.6vw,2.3rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[#0e1726]">
              Book your dental visit in two taps.
            </h3>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
              {[
                { icon: <Star className="size-3" />, label: "4.9 on Google" },
                { icon: <Check className="size-3" />, label: "Prices listed" },
                { icon: <Check className="size-3" />, label: "Books 24/7" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="flex items-center gap-1.5 rounded-full border border-[#dbe6f0] bg-white px-2 py-1 text-[9.5px] font-semibold text-[#41526b] sm:px-3 sm:py-1.5 sm:text-[11.5px]"
                >
                  {chip.icon}
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-ocean-brand px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_14px_30px_-16px_rgba(30,111,217,0.9)] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[13px]">
                Book appointment
                <ArrowUpRight className="size-3" />
              </span>
              <span className="rounded-full border border-[#dbe6f0] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#0e1726] sm:px-5 sm:py-2.5 sm:text-[13px]">
                Call the clinic
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="h-14 rounded-xl bg-ocean-brand shadow-[0_18px_40px_-26px_rgba(80,60,180,0.7)] sm:h-20 sm:rounded-2xl" />
            {[
              { label: "New enquiries", value: "38" },
              { label: "Found on Google", value: "#1 in Davao" },
            ].map((row) => (
              <div
                key={row.label}              className="rounded-2xl border border-[#dbe6f0] bg-white px-4 py-3"
            >
              <p className="text-[8px] uppercase tracking-[0.1em] text-[#8494a8] sm:text-[10.5px] sm:tracking-[0.12em]">
                  {row.label}
                </p>
                <p className="mt-0.5 font-display text-[11px] font-semibold tracking-[-0.02em] text-[#0e1726] sm:mt-1 sm:text-[16px]">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- section -------------------------------- */

export function ProblemSolution() {
  return (
    <Section id="why" className="py-24 sm:py-28 lg:py-32">
      <MeshField variant="soft" />

      <SectionHeading
        eyebrow={problemSolution.eyebrow}
        title={problemSolution.heading}
        body={problemSolution.body}
        className="relative z-10"
      />

      <Reveal delay={0.1} className="relative z-10 mt-14">
        <div className="glass hairline relative rounded-4xl p-2 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.95)] sm:p-3">
          <CompareSlider
            className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/8]"
            before={<FacebookOnlyPanel />}
            after={<WinningSitePanel />}
            labelBefore="Facebook only"
            labelAfter="Real website"
            ariaLabel="Compare a Facebook-only presence with a real website"
          />
        </div>
        <p className="mt-4 text-center text-[12.5px] text-[var(--text-muted)]">
          Drag the handle — this is the same business, six weeks apart.
        </p>
      </Reveal>

      <div className="relative z-10 mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <ul className="hairline hairline-plain flex h-full flex-col gap-3 rounded-4xl border border-white/[0.06] bg-white/[0.015] p-7">              <p className="mb-2 font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {problemSolution.before.label}
            </p>
            {problemSolution.before.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-[var(--text-muted)]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--tint-3)]" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="hairline hairline-accent relative flex h-full flex-col gap-3 rounded-4xl border border-white/[0.06] bg-ocean-brand/[0.06] p-7">              <p className="mb-2 font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
              {problemSolution.after.label}
            </p>
            {problemSolution.after.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-[var(--text-secondary)]">
                <span className="mt-[3px] grid size-4 shrink-0 place-items-center rounded-full bg-ocean-brand">
                  <Check className="size-2.5 text-ink-950" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
