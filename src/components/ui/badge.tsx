import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "relative inline-flex w-fit items-center gap-2 rounded-full border font-medium tracking-[0.02em] transition-colors duration-300",
  {
    variants: {
      variant: {
        default: "border-[var(--border)] bg-[var(--tint-2)] text-[var(--text-secondary)] glass",
        accent:
          "border-ocean-brand/35 bg-ocean-brand/12 text-[var(--accent-1)]",
        warm: "border-leaf-brand/25 bg-leaf-brand/10 text-[var(--accent-3)]",
        outline: "border-[var(--border-strong)] bg-transparent text-[var(--text-secondary)]",
        solid: "border-transparent bg-[var(--surface-1)] text-ink-950",
      },
      size: {
        sm: "px-2.5 py-1 text-[11px] [&_svg]:size-3",
        default: "px-3 py-1.5 text-xs [&_svg]:size-3.5",
        lg: "px-4 py-2 text-sm [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
