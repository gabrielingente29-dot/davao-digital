import * as React from "react";

import { cn } from "@/lib/utils";

type MeshVariant = "hero" | "soft" | "warm" | "cool" | "cta";

/**
 * A single soft radial wash behind a section — one colour, low opacity.
 * Deliberately restrained: depth, not decoration.
 */
export function MeshField({
  variant = "soft",
  className,
}: {
  variant?: MeshVariant;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {variant === "hero" ? (
        <>
          <div className="absolute -right-40 -top-56 size-[680px] rounded-full bg-[radial-gradient(circle,rgba(30,111,217,0.2),transparent_64%)] blur-[40px]" />
          <div className="absolute -left-48 top-32 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(23,190,187,0.09),transparent_66%)] blur-[50px]" />
        </>
      ) : null}

      {variant === "soft" ? (
        <div className="absolute left-1/2 top-0 size-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,111,217,0.13),transparent_64%)] blur-[60px]" />
      ) : null}

      {variant === "warm" ? (
        <div className="absolute -left-32 top-10 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.11),transparent_66%)] blur-[60px]" />
      ) : null}

      {variant === "cool" ? (
        <div className="absolute right-[-120px] top-[-120px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(30,111,217,0.14),transparent_66%)] blur-[60px]" />
      ) : null}

      {variant === "cta" ? (
        <div className="absolute left-1/2 top-[-220px] size-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,111,217,0.2),transparent_62%)] blur-[70px]" />
      ) : null}
    </div>
  );
}

/** Fading grid or dot field, masked so it dissolves into the ink background. */
export function GridField({
  className,
  dots = false,
  size = "lg",
}: {
  className?: string;
  dots?: boolean;
  size?: "lg" | "sm";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 mask-fade-bottom",
        dots ? "bg-dots" : size === "sm" ? "bg-grid-sm" : "bg-grid",
        className,
      )}
    />
  );
}

/** Film-grain overlay. Keeps large flat areas from looking like flat CSS. */
export function NoiseOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("noise absolute inset-0 z-[2]", className)} />;
}
