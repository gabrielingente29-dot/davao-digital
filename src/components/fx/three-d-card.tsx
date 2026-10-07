import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style 3D Card Effect.
 *
 * <CardContainer> tracks the pointer and rotates the whole group, publishing
 * `--gm-tilt-x` / `--gm-tilt-y` so children (like <CardGlare>) can react to the
 * same motion. <CardBody> holds the perspective; <CardItem> adds Z depth.
 */
export function CardContainer({
  children,
  className,
  containerClassName,
  strength = 24,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Higher = subtler rotation. */
  strength?: number;
  disabled?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const off = disabled || reduce;

  const handleMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || off || event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / strength;
      const y = (event.clientY - rect.top - rect.height / 2) / strength;
      el.style.transition = "transform 160ms ease-out";
      el.style.transform = `rotateY(${x.toFixed(2)}deg) rotateX(${(-y).toFixed(2)}deg)`;
      el.style.setProperty("--gm-tilt-x", x.toFixed(3));
      el.style.setProperty("--gm-tilt-y", y.toFixed(3));
    },
    [off, strength],
  );

  const reset = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 700ms cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
    el.style.setProperty("--gm-tilt-x", "0");
    el.style.setProperty("--gm-tilt-y", "0");
  }, []);

  return (
    <div
      className={cn("group/tilt h-full [perspective:1600px]", containerClassName)}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <div
        ref={ref}
        className={cn("preserve-3d relative h-full will-change-transform", className)}
      >
        {children}
      </div>
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("preserve-3d h-full", className)}>{children}</div>;
}

export function CardItem({
  children,
  className,
  translateZ = 0,
  translateX = 0,
  translateY = 0,
}: {
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  translateX?: number | string;
  translateY?: number | string;
}) {
  return (
    <div
      className={cn("preserve-3d h-full", className)}
      style={{ transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)` }}
    >
      {children}
    </div>
  );
}

/**
 * Soft light that slides across the card with the tilt. Because custom
 * properties inherit, this needs no props — just drop it inside a CardItem.
 */
export function CardGlare({ className, size = 420 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100",
        className,
      )}
      style={{
        background: `radial-gradient(${size}px circle at calc(50% + (var(--gm-tilt-x, 0) * 42px)) calc(50% + (var(--gm-tilt-y, 0) * 42px)), rgba(255,255,255,0.09), transparent 62%)`,
      }}
    />
  );
}
