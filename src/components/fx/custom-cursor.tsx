import * as React from "react";

import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Custom cursor: a small dot that tracks the pointer 1:1 and a ring that
 * trails behind with easing. Over elements marked with `data-cursor` the ring
 * grows and shows the label from `data-cursor-label` ("View", "Drag", …).
 *
 * Only mounts for mouse users who haven't asked for reduced motion, and always
 * leaves native focus rings intact for keyboard users.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [variant, setVariant] = React.useState<{ kind: string; label: string } | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("gm-custom-cursor");
    return () => document.documentElement.classList.remove("gm-custom-cursor");
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pointer.x, y: pointer.y };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      if (target) {
        setVariant({
          kind: target.dataset.cursor || "hover",
          label: target.dataset.cursorLabel || "",
        });
      } else {
        const interactive = (event.target as HTMLElement | null)?.closest?.(
          "a, button, input, textarea, select, [role='slider'], summary",
        );
        setVariant(interactive ? { kind: "hover", label: "" } : null);
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = variant?.kind === "drag" || variant?.label ? variant?.label : "";
  const isDrag = variant?.kind === "drag";

  return (
    <div
      data-slot="cursor"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-white transition-opacity duration-300"
        style={{ opacity: visible ? (isDrag ? 0 : 1) : 0 }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 grid place-items-center rounded-full border backdrop-blur-[2px] transition-[width,height,background-color,border-color,opacity] duration-300 ease-[var(--ease-out-expo)]"
        style={{
          opacity: visible ? 1 : 0,
          width: label ? (isDrag ? 62 : 74) : variant ? 44 : 30,
          height: label ? (isDrag ? 62 : 74) : variant ? 44 : 30,
          backgroundColor: label
            ? "rgb(124 92 255 / 0.18)"
            : variant
              ? "rgb(255 255 255 / 0.07)"
              : "transparent",
          borderColor: label
            ? "rgb(168 147 255 / 0.7)"
            : variant
              ? "rgb(255 255 255 / 0.55)"
              : "rgb(255 255 255 / 0.3)",
          transform: "translate3d(-100px, -100px, 0)",
          scale: pressed ? "0.86" : "1",
        }}
      >
        <span
          className="select-none text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
