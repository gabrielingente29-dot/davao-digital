import { Star } from "lucide-react";
import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Counter } from "@/components/fx/counter";
import { InfiniteMovingCards } from "@/components/fx/infinite-moving-cards";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { testimonials } from "@/data/site";

function QuoteCard({ quote, name, meta }: { quote: string; name: string; meta: string }) {
  return (
    <figure
      data-cursor="hover"
      className="hairline group/card relative flex h-full flex-col justify-between gap-6 rounded-4xl border border-[var(--border)] bg-[var(--surface-raised)]/70 p-7 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_40px_90px_-60px_rgba(0,0,0,0.12)]"
    >
      <div className="relative">
        <div className="flex gap-1" aria-label="Five out of five">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3.5 fill-leaf-brand/90 text-leaf-brand/90" />
          ))}
        </div>
        <blockquote className="mt-5 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
          “{quote}”
        </blockquote>
      </div>
      <figcaption className="relative flex items-center gap-3">
        <span className="size-9 shrink-0 rounded-full bg-ocean-brand" />
        <span className="leading-tight">
          <span className="block text-[13.5px] font-semibold text-[var(--text-secondary)]">{name}</span>
          <span className="block text-[12px] text-[var(--text-muted)]">{meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

const proofStats = [
  { value: 10, suffix: "+", label: "Businesses in Davao & beyond", decimals: 0 },
  { value: 7, suffix: " days", label: "Average time to launch", decimals: 0 },
  { value: 1.4, suffix: "s", label: "Average page load", decimals: 1 },
  { value: 98, suffix: "/100", label: "Average mobile score", decimals: 0 },
];

export function Testimonials() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4);

  return (
    <Section id="testimonials" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <MeshField variant="soft" />

      <SectionHeading
        eyebrow="Social proof"
        title={
          <>
            People who stopped worrying
            <span className="text-[var(--accent-1)]"> about their website.</span>
          </>
        }
        body="A few words from owners around Davao City — cafes, clinics, shops and services."
        className="relative z-10"
      />

      <Reveal delay={0.1} className="relative z-10 mt-14">
        <dl className="glass hairline grid grid-cols-2 gap-y-8 rounded-4xl px-7 py-8 sm:px-10 lg:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="font-display text-[clamp(1.8rem,3.6vw,2.4rem)] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
              <dt className="mx-auto mt-2 max-w-[16ch] text-[13px] leading-snug text-[var(--text-muted)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="relative z-10 mt-14 flex flex-col gap-6">
        <InfiniteMovingCards speed={52}>
          {firstRow.map((item) => (
            <QuoteCard key={item.quote} {...item} />
          ))}
        </InfiniteMovingCards>
        <InfiniteMovingCards speed={64} direction="right">
          {secondRow.map((item) => (
            <QuoteCard key={item.quote} {...item} />
          ))}
        </InfiniteMovingCards>
      </div>

      <Reveal className="relative z-10 mt-10 text-center text-[12.5px] text-[var(--text-muted)]">
        Quotes shown are from current clients. Names shortened for privacy.
      </Reveal>
    </Section>
  );
}
