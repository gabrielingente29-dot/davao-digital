import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--tint-1)] transition-colors duration-500",
        "hover:border-[var(--border-strong)] hover:bg-[var(--tint-3)]",
        "data-[state=open]:border-ocean-brand/25 data-[state=open]:bg-[var(--tint-3)]",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-6 px-6 py-5 text-left",
          "font-display text-[17px] font-medium tracking-[-0.02em] text-[var(--text-strong)] transition-colors duration-300",
          "hover:text-[var(--text-primary)] sm:px-8 sm:py-6 sm:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="relative grid size-8 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-2)] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-[var(--border-strong)] group-hover:bg-[var(--tint-4)] group-data-[state=open]:border-transparent group-data-[state=open]:bg-[#2E86F0]"
        >
          <Plus className="size-4 text-[var(--text-secondary)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-data-[state=open]:rotate-45 group-data-[state=open]:text-ink-950" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-[15px] leading-relaxed text-[var(--text-secondary)] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-6 pb-6 pr-12 sm:px-8 sm:pb-8 sm:pr-16", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
