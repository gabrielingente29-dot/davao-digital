import * as React from "react";

import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function BentoItem({
  children,
  className,
  spanClass,
}: {
  children: React.ReactNode;
  className?: string;
  spanClass?: string;
}) {
  return (
    <li className={cn("group/bento relative min-w-0", spanClass)}>
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/[0.07] bg-ink-850/70 p-7 backdrop-blur-xl transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
          "hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_30px_80px_-40px_rgba(30,111,217,0.75)]",
          className,
        )}
      >
        {children}
      </div>
    </li>
  );
}
