import { motion } from "framer-motion";
import * as React from "react";

import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style "Text Generate Effect".
 * Words fade + lift into place, either on mount or when scrolled into view.
 */
export function TextGenerateEffect({
  text,
  className,
  wordClassName,
  stagger = 0.055,
  delay = 0,
  once = true,
  highlight,
  highlightClassName = "text-[var(--accent-1)]",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  /** Optional substring rendered in the accent colour. */
  highlight?: string;
  highlightClassName?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const words = React.useMemo(() => text.split(" "), [text]);
  const highlightWords = React.useMemo(
    () => new Set(highlight ? highlight.split(" ") : []),
    [highlight],
  );

  if (reduce) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className={highlightWords.has(word) ? highlightClassName : undefined}>
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cn("inline-block will-change-transform", wordClassName, highlightWords.has(word) && highlightClassName)}
          variants={{
            hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
