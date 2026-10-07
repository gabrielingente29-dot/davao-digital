import { motion } from "framer-motion";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Scroll-triggered entrance. Fades and lifts once, cheap and reduced-motion aware. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = usePrefersReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Standard page section: consistent vertical rhythm + horizontal gutters. */
export function Section({
  id,
  children,
  className,
  containerClassName,
  scrollMargin = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  scrollMargin?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full", scrollMargin && "scroll-mt-28", className)}
    >
      <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/** The one heading recipe used across every section, so the page stays coherent. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
  titleClassName,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Badge variant="accent" size="default" className="uppercase tracking-[0.16em]">
            <span className="size-1.5 rounded-full bg-teal-brand shadow-[0_0_10px_2px_rgba(23,190,187,0.7)]" />
            {eyebrow}
          </Badge>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)]",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {body ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-[17px] leading-relaxed text-[var(--text-secondary)]",
              align === "center" && "mx-auto",
            )}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}
