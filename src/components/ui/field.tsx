import * as React from "react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--tint-2)] px-4 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-300 ease-[var(--ease-out-expo)] hover:border-[var(--border-strong)] focus:border-ocean-brand/60 focus:bg-[var(--tint-3)] focus:shadow-[0_0_0_4px_rgba(30,111,217,0.14)]";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "min-h-[120px] resize-y py-3 leading-relaxed", className)}
      {...props}
    />
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea, Label };
