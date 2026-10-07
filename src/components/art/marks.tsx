import * as React from "react";

import { cn } from "@/lib/utils";

/* ============================== LOGO ===================================== */

/**
 * The brand mark: a slate magnifier ring with a white lens and a blue trend
 * arrow breaking out of the upper right. Drawn inline (no external file) so it
 * can never fail to load, and sized by the caller so it can never collapse.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      aria-hidden="true"
      className={cn("block size-8 shrink-0", className)}
    >
      <g transform="translate(1.6 3)">
        {/* handle — slate near the ring, blue at the tip */}
        <path
          d="M37.6 35.6 L45 43"
          stroke="#9BA4B5"
          strokeWidth="8"
          strokeLinecap="butt"
        />
        <path
          d="M45 43 L49.6 47.6"
          stroke="#2E7BF6"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* lens */}
        <circle cx="27" cy="25" r="11.5" fill="#ffffff" />

        {/* ring, open where the arrow breaks through */}
        <path
          d="M41.57 19.7 A15.5 15.5 0 1 1 34.75 11.58"
          fill="none"
          stroke="#9BA4B5"
          strokeWidth="7.5"
          strokeLinecap="round"
        />

        {/* trend line */}
        <path
          d="M14 33 L22.5 24.5 L28.5 30.5 L40.5 18.5"
          fill="none"
          stroke="#2E7BF6"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* arrowhead */}
        <path d="M47.57 11.43 L44.39 22.39 L36.61 14.61 Z" fill="#2E7BF6" />
      </g>
    </svg>
  );
}

/**
 * The nav lockup: the mark plus the two-line wordmark. Every part is
 * `whitespace-nowrap` + `shrink-0` so a tight header can never stack the text
 * into a column the way it used to.
 */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2.5 whitespace-nowrap", className)}>
      <LogoMark className={compact ? "size-7" : "size-8"} />
      <span className="flex flex-col justify-center leading-none">
        <span className="block whitespace-nowrap font-display text-[14px] font-semibold uppercase leading-none tracking-[0.01em] text-[var(--text-primary)]">
          Davao <span className="text-ocean-brand">Digital</span>
        </span>
        <span className="mt-1 block whitespace-nowrap text-[9px] font-medium uppercase leading-none tracking-[0.15em] text-[var(--text-muted)]">
          Premium web design
        </span>
      </span>
    </span>
  );
}

/* ============================ MT. APO HORIZON ============================ */

/**
 * Stylised Mt. Apo silhouette — Davao's landmark, drawn in four receding
 * ridgelines with a warm sunrise behind it.
 */
export function MtApoHorizon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 260"
      className={cn("h-auto w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="apo-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe0b0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffb347" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="apo-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5085" />
          <stop offset="100%" stopColor="#20243c" />
        </linearGradient>
        <linearGradient id="apo-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3153" />
          <stop offset="100%" stopColor="#141728" />
        </linearGradient>
        <linearGradient id="apo-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#181b2e" />
          <stop offset="100%" stopColor="#090a12" />
        </linearGradient>
        <radialGradient id="apo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb347" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#1E6FD9" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#1E6FD9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sunrise behind the range */}
      <circle cx="700" cy="132" r="170" fill="url(#apo-glow)" />
      <circle cx="700" cy="128" r="46" fill="url(#apo-sun)" />

      {/* far ridge (lighter, receding) */}
      <path
        d="M0 176 L150 142 L262 160 L392 108 L500 140 L612 96 L700 66 L792 104 L884 84 L984 130 L1092 108 L1200 148 L1312 130 L1440 166 L1440 260 L0 260 Z"
        fill="url(#apo-1)"
        opacity="0.92"
      />
      {/* snow-lit summit */}
      <path d="M648 96 L700 66 L756 100 L726 92 L700 110 L674 90 Z" fill="#d8dbff" opacity="0.5" />
      {/* mid ridge */}
      <path
        d="M0 206 L120 188 L252 200 L372 172 L500 196 L642 164 L730 132 L822 162 L942 190 L1062 168 L1182 196 L1312 180 L1440 200 L1440 260 L0 260 Z"
        fill="url(#apo-2)"
      />
      {/* near ridge */}
      <path
        d="M0 238 L170 226 L342 236 L502 220 L682 240 L862 222 L1032 238 L1202 224 L1362 240 L1440 230 L1440 260 L0 260 Z"
        fill="url(#apo-3)"
      />
    </svg>
  );
}

/* ============================== EAGLE WING =============================== */

export function EagleWingMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 164 92"
      className={cn("h-auto w-full fill-none", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ewG" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e6fd9" />
          <stop offset="55%" stopColor="#17bebb" />
          <stop offset="100%" stopColor="#4caf50" />
        </linearGradient>
      </defs>
      <path
        d="M2 74 C28 66 60 64 92 58 C118 53 140 47 160 39 C158 34 152 32 145 35 C124 44 102 50 82 57 C66 62 49 65 30 69 C22 71 15 72 10 71 C2 72 0 73 2 74Z"
        fill="url(#ewG)"
        opacity="0.85"
      />
      <path
        d="M2 74 C 16 70 30 68 46 65 C 60 63 76 61 92 58"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M162 38 C 156 32 148 32 140 35 C 118 43 98 50 78 58 C 58 65 38 71 18 75 C 14 76 10 76 7 75"
        stroke="url(#ewG)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M144 54 L 160 39"
        stroke="url(#ewG)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M92 58 C 110 50 128 43 144 36"
        stroke="url(#ewG)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ============================== DURIAN MARK ============================== */

/**
 * Durian — the unofficial mascot of Davao. Drawn as a low-poly spiky husk with
 * a single warm-yellow gradient so it never conflicts with the cool brand palette.
 */
export function DurianMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="durianG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6d365" />
          <stop offset="100%" stopColor="#fda085" />
        </linearGradient>
      </defs>
      {/* husk spikes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const rad = (angle * Math.PI) / 180;
        const inner = 38;
        const outer = 62;
        const tip = 76;
        const x1 = 60 + inner * Math.cos(rad - Math.PI / 4);
        const y1 = 60 + inner * Math.sin(rad - Math.PI / 4);
        const x2 = 60 + outer * Math.cos(rad);
        const y2 = 60 + outer * Math.sin(rad);
        const x3 = 60 + tip * Math.cos(rad + Math.PI / 5);
        const y3 = 60 + tip * Math.sin(rad + Math.PI / 5);
        const x4 = 60 + inner * Math.cos(rad + Math.PI / 4);
        const y4 = 60 + inner * Math.sin(rad + Math.PI / 4);
        return (
          <path
            key={i}
            d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} L${x4.toFixed(1)} ${y4.toFixed(1)} Z`}
            fill="url(#durianG)"
            opacity="0.92"
          />
        );
      })}
      {/* husk body */}
      <ellipse cx="60" cy="62" rx="38" ry="40" fill="url(#durianG)" />
      {/* stylized cracks */}
      {[
        [40, 48, 50, 78],
        [50, 42, 62, 76],
        [62, 44, 74, 74],
      ].map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#7a3b00" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      ))}
    </svg>
  );
}
