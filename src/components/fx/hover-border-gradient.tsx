import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style Hover Border Gradient.
 * A conic gradient spins behind the element and reveals itself on hover/focus,
 * leaving a 1px animated rim around the content.
 */
export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  as: Tag = "div",
  always = false,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "div" | "span" | "li";
  /** Show the rim constantly (used for the highlighted pricing tier). */
  always?: boolean;
  innerClassName?: string;
}) {
  return (
    <Tag
      className={cn(
        "group/hbg relative isolate inline-flex rounded-[inherit] p-px",
        containerClassName,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-[-120%] -z-10 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#1E6FD9_70deg,#17BEBB_140deg,#4CAF50_190deg,transparent_260deg)] transition-opacity duration-700 ease-[var(--ease-out-expo)]",
          always ? "opacity-90" : "opacity-0 group-hover/hbg:opacity-100 group-focus-within/hbg:opacity-100",
        )}
      />
      <span
        className={cn(
          "relative z-10 flex w-full items-center justify-center gap-2 rounded-[inherit]",
          innerClassName,
        )}
      >
        {children}
      </span>
    </Tag>
  );
}
