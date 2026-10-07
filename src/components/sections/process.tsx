import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare, Palette, Rocket, TrendingUp } from "lucide-react";
import * as React from "react";

import { BrowserMockup } from "@/components/art/browser-mockup";
import { FitScale } from "@/components/art/fit-scale";
import { MeshField } from "@/components/art/mesh";
import { mockPages } from "@/components/art/mock-pages";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/* ------------------------------- step screens ------------------------------ */

/** The same site, progressing from wireframe to launch to growing numbers. */
function StepScreen({ screen }: { screen: (typeof processSteps)[number]["screen"] }) {
  if (screen === "grow") return <GrowthDashboard />;

  return (
    <div className="relative">
      <div
        className={cn(
          "transition-all duration-700 ease-[var(--ease-out-expo)]",
          screen === "draft" && "opacity-80 [filter:saturate(0.25)_contrast(0.95)]",
        )}
      >
        <BrowserMockup
          url={screen === "draft" ? "preview.davaodigital.ph" : "davaosmiledental.ph"}
          className={cn(
            "transition-shadow duration-700",
            screen === "live" && "!shadow-[0_50px_140px_-50px_rgba(30,111,217,0.85)]",
          )}
        >
          <FitScale designWidth={1120} ratio={0.625}>
            <mockPages.clinic />
          </FitScale>
        </BrowserMockup>
      </div>

      {screen === "review" ? (
        <>
          <span className="absolute left-[16%] top-[34%] flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-primary)] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <MessageSquare className="size-3 text-teal-brand" />
            “Change the price to ₱1,200”
          </span>
          <span className="absolute right-[10%] bottom-[22%] flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-primary)] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <Palette className="size-3 text-[var(--accent-1)]" />
            “Use our darker blue”
          </span>
          <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-brand shadow-[0_0_0_6px_rgba(23,190,187,0.2)]" />
        </>
      ) : null}

      {screen === "live" ? (
        <>
          <span className="absolute right-4 top-12 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/12 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
            <CheckCircle2 className="size-3.5" />
            Live in 7 days
          </span>
          <span className="absolute left-4 bottom-6 flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] backdrop-blur-md">
            <Rocket className="size-3 text-leaf-brand" />
            Indexed on Google Search
          </span>
        </>
      ) : null}

      {screen === "draft" ? (
        <span className="absolute left-4 top-12 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] backdrop-blur-md">
          <span className="flex gap-1">
            <span className="size-1.5 animate-ping rounded-full bg-ocean-soft" />
          </span>
          Building your first draft…
        </span>
      ) : null}
    </div>
  );
}

/** Month-two style report panel for the "we manage it" step. */
function GrowthDashboard() {
  const bars = [38, 52, 44, 66, 58, 82, 74, 96];
  const reduce = usePrefersReducedMotion();

  return (
    <div className="hairline relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-3)]/85 p-5 backdrop-blur-xl sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Monthly report · March
          </p>
          <p className="mt-2 font-display text-[28px] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
            +38 enquiries
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
          <TrendingUp className="size-3.5" />
          +24% vs Feb
        </span>
      </div>

      <div className="mt-7 flex h-40 items-end gap-2.5">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            initial={reduce ? { height: `${height}%` } : { height: "6%" }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-t-lg bg-ocean-brand/65"
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          ["Website visitors", "4,182"],
          ["Calls", "96"],
          ["Rank in Davao", "#3"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--tint-1)] px-3.5 py-3">
            <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
            <p className="mt-1 font-display text-[19px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--tint-1)] px-4 py-3 text-[12.5px] text-[var(--text-muted)]">
        <CheckCircle2 className="size-4 text-teal-brand" />
        Next: refresh three service pages and re-run the Meta ad set.
      </div>
    </div>
  );
}

/* --------------------------------- section -------------------------------- */

function StepRow({
  index,
  step,
  active,
  onActive,
}: {
  index: number;
  step: (typeof processSteps)[number];
  active: boolean;
  onActive: (index: number) => void;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  React.useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (      <li
      ref={ref}
      className={cn(
        "hairline relative rounded-4xl border p-7 backdrop-blur-xl transition-all duration-700 ease-[var(--ease-out-expo)] sm:p-9",
        active
          ? "border-ocean-brand/25 bg-ocean-brand/[0.06] shadow-[0_40px_100px_-60px_rgba(0,0,0,0.12)]"
          : "border-[var(--border)] bg-[var(--tint-1)]",
      )}
    >
      <div className="flex items-start gap-5">
        <span
          className={cn(
            "mt-0.5 grid size-11 shrink-0 place-items-center rounded-2xl font-display text-[15px] font-semibold transition-colors duration-500",
            active
              ? "bg-[#2E86F0] text-ink-950"
              : "border border-[var(--border)] bg-[var(--tint-2)] text-[var(--text-muted)]",
          )}
        >
          {step.step}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
            {step.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--tint-1)] px-3 py-1.5 text-[12px] text-[var(--text-muted)]">
            <CheckCircle2 className="size-3.5 text-teal-brand" />
            {step.detail}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Process() {
  const [active, setActive] = React.useState(0);
  const onActive = React.useCallback((index: number) => setActive(index), []);

  return (
    <Section id="process" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="cool" />

      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            From first message to a site
            <span className="text-[var(--accent-1)]"> that pays for itself.</span>
          </>
        }
        body="No deposits, no forms to fill, no jargon. Four steps, and you only pay once you've seen your website."
        className="relative z-10"
      />

      <div className="relative z-10 mt-16 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        {/* sticky visual */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--tint-2)]">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-ocean-brand"
                animate={{ width: `${((active + 1) / processSteps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="tnum text-[12px] font-medium tracking-[0.14em] text-[var(--text-muted)]">
              0{active + 1} / 0{processSteps.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepScreen screen={processSteps[active].screen} />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 hidden lg:block">
            <Magnetic strength={0.2}>
              <Button asChild size="lg" variant="secondary" className="group">
                <a href="#get-started">
                  Start step one — it&apos;s free
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* steps */}
        <ol className="flex flex-col gap-5">
          {processSteps.map((step, index) => (
            <StepRow
              key={step.step}
              index={index}
              step={step}
              active={active === index}
              onActive={onActive}
            />
          ))}
        </ol>
      </div>

      <Reveal className="relative z-10 mt-10 lg:hidden">
        <Button asChild size="lg" variant="secondary" className="group w-full">
          <a href="#get-started">
            Start step one — it&apos;s free
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
}
