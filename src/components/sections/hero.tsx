import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Clock, Eye, MapPin, ShieldCheck, Users } from "lucide-react";
import * as React from "react";

import { BrowserMockup, PhoneMockup } from "@/components/art/browser-mockup";
import { FitScale } from "@/components/art/fit-scale";
import { MeshField, GridField, NoiseOverlay } from "@/components/art/mesh";
import { mockPages, MobileScreenMock } from "@/components/art/mock-pages";
import { AnimatedTooltip, type TooltipPerson } from "@/components/fx/animated-tooltip";
import { Counter } from "@/components/fx/counter";
import { CursorSpotlight } from "@/components/fx/cursor-spotlight";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { TextGenerateEffect } from "@/components/fx/text-generate-effect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, peso } from "@/lib/utils";

const trustIcons = {
  people: Users,
  clock: Clock,
  shield: ShieldCheck,
} as const;

/**
 * Placeholder business types for the trust row. Keep the industries, swap the
 * areas and names for real clients (with permission) when they exist.
 */
const faces: TooltipPerson[] = [
  { id: 1, name: "Dental clinic", role: "Davao City", gradient: "bg-teal-brand", initials: "DC" },
  { id: 2, name: "Machine shop", role: "Davao City", gradient: "bg-ocean-brand", initials: "MS" },
  { id: 3, name: "Cafe", role: "Davao City", gradient: "bg-leaf-brand", initials: "CF" },
  { id: 4, name: "Real estate", role: "Davao City", gradient: "bg-ocean-soft", initials: "RE" },
];

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.7 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const backX = useTransform(sx, (v) => v * -34);
  const backY = useTransform(sy, (v) => v * -22);
  const mainX = useTransform(sx, (v) => v * 16);
  const mainY = useTransform(sy, (v) => v * 10);
  const frontX = useTransform(sx, (v) => v * 30);
  const frontY = useTransform(sy, (v) => v * 18);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.35]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44"
    >
      <MeshField variant="hero" />
      <GridField className="opacity-50" />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-8" fill="#1E6FD9" opacity={0.16} />
      <NoiseOverlay />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <CursorSpotlight className="rounded-[3rem]" size={680} intensity={0.13}>
          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
            {/* ------------------------------ copy ------------------------------ */}
            <div className="flex flex-col items-start">
              <Reveal blur={false} y={14}>
                <Badge variant="accent" size="lg" className="mb-7 gap-2.5">
                  <MapPin className="size-3.5" />
                  {hero.eyebrow}
                </Badge>
              </Reveal>

              <h1 className="font-display text-[clamp(2.6rem,6.6vw,4.9rem)] font-semibold leading-[0.97] tracking-[-0.045em] text-[var(--text-primary)]">
                <TextGenerateEffect
                  text={`${hero.headlineLead} ${hero.headlineHighlight}.`}
                  highlight={hero.headlineHighlight}
                  stagger={0.07}
                  delay={0.08}
                />
              </h1>

              <Reveal delay={0.5} className="mt-7 max-w-[34rem]">
                <p className="text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
                  {hero.subhead}
                </p>
              </Reveal>

              <Reveal delay={0.62} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Magnetic strength={0.22}>
                  <Button asChild size="xl" className="group w-full sm:w-auto" data-cursor="hover">
                    <a href={hero.primaryCta.href}>
                      {hero.primaryCta.label}
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>
                </Magnetic>
                <Button asChild variant="secondary" size="xl" className="group w-full sm:w-auto">
                  <a href={hero.secondaryCta.href} data-cursor="view" data-cursor-label="View">
                    <Eye className="transition-transform duration-300 group-hover:scale-110" />
                    {hero.secondaryCta.label}
                  </a>
                </Button>
              </Reveal>

              {/* price strip — pricing is a selling point, so it lives above the fold */}
              <Reveal delay={0.68} className="mt-7 w-full sm:w-auto">
                <div className="hairline flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border-[var(--border)] bg-[var(--tint-2)] px-5 py-4 backdrop-blur-md">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {hero.priceTeaser.fromLabel}
                    </span>
                    <span className="tnum font-display text-[26px] font-semibold leading-none tracking-[-0.035em] text-[var(--text-primary)]">
                      ₱{peso(hero.priceTeaser.build)}
                    </span>
                    <span className="text-[12.5px] text-[var(--text-muted)]">{hero.priceTeaser.buildNote}</span>
                  </div>
                  <span aria-hidden="true" className="hidden h-5 w-px bg-[var(--border-strong)] sm:block" />
                  <div className="flex items-baseline gap-2">
                    <span className="tnum font-display text-[26px] font-semibold leading-none tracking-[-0.035em] text-[var(--text-primary)]">
                      ₱{peso(hero.priceTeaser.monthly)}
                    </span>
                    <span className="text-[12.5px] text-[var(--text-muted)]">{hero.priceTeaser.monthlyNote}</span>
                  </div>
                  <a
                    href={hero.priceTeaser.cta.href}
                    data-cursor="view"
                    data-cursor-label="Pricing"
                    className="group/price ml-auto flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-1)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {hero.priceTeaser.cta.label}
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/price:translate-x-1" />
                  </a>
                </div>
              </Reveal>

              {/* trust row */}
              <Reveal delay={0.72} className="mt-11 w-full">
                <div className="flex flex-col gap-6 border-t border-white/[0.07] pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-5">
                  {hero.trust.map((item, index) => {
                    const Icon = trustIcons[item.icon];
                    return (
                      <div key={item.icon} className="flex items-center gap-3">
                        {index === 0 ? (
                          <AnimatedTooltip items={faces} className="mr-1" />
                        ) : (
                          <Icon
                            className={cn(
                              "size-4 shrink-0",
                              index === 1 ? "text-teal-brand" : "text-leaf-brand",
                            )}
                          />
                        )}
                        <p className="text-[12.5px] leading-tight text-[var(--text-muted)]">
                          {item.value === undefined ? (
                            item.label
                          ) : (
                            <span className="block">
                              {item.prefix}
                              <Counter
                                to={item.value}
                                suffix={item.suffix ?? ""}
                                className="font-semibold text-[var(--text-primary)]"
                              />
                            </span>
                          )}
                          {item.value !== undefined && item.label ? (
                            <span className="mt-0.5 block">{item.label}</span>
                          ) : null}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* ----------------------------- mockups ---------------------------- */}
            <motion.div
              style={{ y: driftY, opacity: fade }}
              className="relative mx-auto w-full max-w-[640px] lg:mx-0 lg:max-w-none"
            >
              {/* soft platform */}
              <div
                aria-hidden="true"
                className="absolute inset-x-4 bottom-[-40px] top-16 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(30,111,217,0.16),transparent_70%)] blur-2xl"
              />

              {/* back window */}
              <motion.div
                style={reduce ? undefined : { x: backX, y: backY }}
                className="absolute -right-6 -top-10 z-0 hidden w-[58%] rotate-[3deg] md:block"
              >
                <BrowserMockup url="mindanaometalworks.ph" compact ratio="aspect-[16/11]">
                  <FitScale designWidth={1120} ratio={0.6875}>
                    <mockPages.workshop />
                  </FitScale>
                </BrowserMockup>
              </motion.div>

              {/* main window */}
              <motion.div
                style={reduce ? undefined : { x: mainX, y: mainY }}
                className="relative z-10"
                data-cursor="view"
                data-cursor-label="View"
              >
                <BrowserMockup url="davaosmiledental.ph" className="ring-1 ring-white/[0.06]">
                  <FitScale designWidth={1120} ratio={0.625}>
                    <mockPages.clinic />
                  </FitScale>
                </BrowserMockup>

                <motion.div
                  animate={reduce ? undefined : { y: [0, -9, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="hairline absolute -left-5 top-12 z-30 hidden items-center gap-2.5 rounded-2xl border-[var(--border-strong)] bg-[var(--surface-3)] px-3.5 py-2.5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.95)] backdrop-blur-md sm:flex"
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[12px] font-semibold text-[var(--text-primary)]">New enquiry</p>
                    <p className="text-[10.5px] text-[var(--text-muted)]">Booked · 2 min ago</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={reduce ? undefined : { y: [0, 8, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="hairline absolute -right-6 bottom-16 z-30 hidden items-center gap-2 rounded-2xl border-[var(--border-strong)] bg-[var(--surface-3)] px-3.5 py-2.5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.95)] backdrop-blur-md sm:flex"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-ocean-brand text-[10px] font-bold text-white">
                    ↑
                  </span>
                  <div className="leading-tight">
                    <p className="text-[12px] font-semibold text-[var(--text-primary)]">1.4s load time</p>
                    <p className="text-[10.5px] text-[var(--text-muted)]">Mobile score 98</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* phone — decorative layer over the browser mockup's lower-left.
                  Anchored to the LEFT edge of the mockup column (never the right),
                  so it can drift on parallax without ever reaching the copy/CTA
                  column. Pointer-events are off so it can't intercept clicks even
                  if it visually brushes a button. */}
              <motion.div
                style={reduce ? undefined : { x: frontX, y: frontY }}
                className="pointer-events-none absolute -bottom-10 left-1 z-20 w-[88px] animate-float-slow sm:-bottom-12 sm:left-2 sm:w-[104px] lg:-bottom-14 lg:left-[3%] lg:w-[140px]"
                data-slot="phone-mockup"
                data-cursor="view"
                data-cursor-label="View"
              >
                <PhoneMockup>
                  <FitScale designWidth={390} ratio={2.164}>
                    <MobileScreenMock />
                  </FitScale>
                </PhoneMockup>
              </motion.div>
            </motion.div>
          </div>
        </CursorSpotlight>
      </div>

      {/* marquee-ish hint line */}              <div className="relative z-10 mx-auto mt-14 flex w-full max-w-[1240px] items-center gap-6 px-5 text-center text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] sm:mt-20 sm:px-8 sm:text-[12px] sm:tracking-[0.22em]">
        <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(30,111,217,0.25))]" />
        <span>Website design · Hosting · Local SEO · Meta ads</span>
        <span className="h-px flex-1 bg-[linear-gradient(270deg,transparent,rgba(30,111,217,0.25))]" />
      </div>
    </section>
  );
}
