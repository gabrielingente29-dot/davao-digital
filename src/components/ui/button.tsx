import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-[-0.01em] transition-[transform,box-shadow,background-color,color,opacity]",
    "duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "text-ink-950 bg-[#2E86F0] font-semibold shadow-[0_10px_34px_-14px_rgba(30,111,217,0.85)] hover:bg-[#4f95f5] hover:shadow-[0_16px_44px_-14px_rgba(30,111,217,0.95)]",
        warm:
          "text-ink-950 bg-leaf-brand font-semibold shadow-[0_10px_34px_-16px_rgba(76,175,80,0.8)] hover:bg-[#66bb6a]",
        secondary:
          "text-[var(--text-primary)] glass hairline hairline-plain hover:bg-[var(--tint-hover)] hover:shadow-[0_14px_40px_-16px_rgba(255,255,255,0.35)]",
        outline:
          "text-[var(--text-secondary)] border border-[var(--border-strong)] bg-transparent hover:border-[var(--border-strong)] hover:bg-[var(--tint-3)] hover:text-[var(--text-primary)]",
        ghost: "text-[var(--text-secondary)] hover:bg-[var(--tint-3)] hover:text-[var(--text-primary)]",
        link: "text-[var(--accent-2)] underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-[13px] [&_svg]:size-4",
        default: "h-11 rounded-full px-5 text-[15px] [&_svg]:size-4",
        lg: "h-13 rounded-full px-7 text-base [&_svg]:size-[18px]",
        xl: "h-14 rounded-full px-8 text-[17px] [&_svg]:size-5",
        icon: "size-11 rounded-full [&_svg]:size-[18px]",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "default", block: false },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, block, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
