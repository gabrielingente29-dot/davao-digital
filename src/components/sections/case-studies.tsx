import { ArrowUpRight, Check, ExternalLink, Quote, Star, Sparkles } from "lucide-react";

import { BrowserMockup } from "@/components/art/browser-mockup";
import { FitScale } from "@/components/art/fit-scale";
import { MeshField } from "@/components/art/mesh";
import { mockPages } from "@/components/art/mock-pages";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { conceptPreviews, featuredProject, type ConceptPreview } from "@/data/site";

/** A real screenshot inside browser chrome — never a generated mockup. */
function Shot({
  src,
  alt,
  compact = false,
  ratio = "aspect-[16/10]",
  className,
}: {
  src: string;
  alt: string;
  compact?: boolean;
  ratio?: string;
  className?: string;
}) {
  return (
    <BrowserMockup url={featuredProject.urlLabel} compact={compact} ratio={ratio} className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </BrowserMockup>
  );
}

/**
 * The one real build. Copy comes from src/data/site.ts and the screenshots in
 * /public/work were captured from the live site, so this block can only ever
 * describe work that actually exists.
 */
function FeaturedWork() {
  const [hero, ...rest] = featuredProject.shots;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
      <Reveal className="flex flex-col items-start">
        <Badge variant="accent" size="default" className="uppercase tracking-[0.14em]">
          <span className="size-1.5 rounded-full bg-teal-brand shadow-[0_0_10px_2px_rgba(23,190,187,0.7)]" />
          Live now · Real client
        </Badge>

        <h3 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[var(--text-primary)]">
          {featuredProject.name}
        </h3>

        <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {featuredProject.industry} · {featuredProject.location}
        </p>

        <p className="mt-5 text-[17px] leading-relaxed text-[var(--text-secondary)]">
          {featuredProject.headline}
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--text-muted)]">
          {featuredProject.summary}
        </p>

        <ul className="mt-7 flex flex-col gap-3">
          {featuredProject.built.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-secondary)]"
            >
              <span className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full bg-ocean-brand/15 ring-1 ring-inset ring-ocean-brand/30">
                <Check className="size-2.5 text-[var(--accent-1)]" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button asChild size="lg" variant="secondary" className="group">
            <a href={featuredProject.url} target="_blank" rel="noopener">
              Visit {featuredProject.urlLabel}
              <ExternalLink className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <span className="text-[13px] text-[var(--text-muted)]">
            Screenshots taken from the live site.
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="flex flex-col gap-3 sm:gap-4">
        <Shot src={hero.src} alt={hero.alt} />
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {rest.map((shot) => (
            <Shot key={shot.src} src={shot.src} alt={shot.alt} compact ratio="aspect-[4/3]" />
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/** The client's real, permissioned review — shown attached to the showcase above. */
function FeaturedTestimonial() {
  const t = featuredProject.testimonial;
  if (!t) return null;

  return (
    <Reveal className="relative z-10 mt-14">
      <figure className="glass hairline relative overflow-hidden rounded-4xl border border-[var(--border)] p-8 sm:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(30,111,217,0.14),transparent_66%)] blur-2xl"
        />
        <div className="relative flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ocean-brand/15 text-[var(--accent-1)]">
              <Quote className="size-5" />
            </span>
            <div
              className="flex items-center gap-1"
              aria-label={`${t.rating} out of 5 stars`}
            >
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-[var(--accent-1)] text-[var(--accent-1)]" />
              ))}
              <span className="ml-2 text-[13px] font-medium text-[var(--text-muted)]">
                {t.rating}.0 · verified client
              </span>
            </div>
          </div>

          <blockquote className="max-w-4xl text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
            “{t.quote}”
          </blockquote>

          <figcaption className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-brand text-[13px] font-semibold text-ink-950">
              {t.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-[var(--text-primary)]">{t.author}</p>
              <p className="mt-1 text-[13px] text-[var(--text-muted)]">{t.role}</p>
            </div>
          </figcaption>
        </div>
      </figure>
    </Reveal>
  );
}

/** One illustrative layout. Labelled as a concept on the card itself. */
function ConceptCard({ concept, index }: { concept: ConceptPreview; index: number }) {
  const Mock = mockPages[concept.mock];

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="glass hairline flex h-full flex-col overflow-hidden rounded-4xl border border-[var(--border)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)] bg-ink-900">
          <FitScale designWidth={1120} ratio={0.625}>
            <Mock />
          </FitScale>
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
            Design concept
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            {concept.audience}
          </p>
          <h3 className="mt-3 font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
            {concept.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{concept.blurb}</p>

          <ul className="mt-5 flex flex-col gap-2.5">
            {concept.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[14.5px] text-[var(--text-muted)]">
                <Sparkles className="mt-[3px] size-3.5 shrink-0 text-[var(--accent-2)]" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Button asChild block size="lg" variant="outline" className="group">
              <a href="#get-started">
                Build this for my business
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function CaseStudies() {
  return (
    <Section id="work" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="cool" />

      <SectionHeading
        eyebrow="Work"
        title={
          <>
            One real build — and what yours
            <span className="text-[var(--accent-1)]"> could look like.</span>
          </>
        }
        body="H.D. Rubber in Agdao is live right now, designed and built by us. Under it are concept layouts drawn from the same design system, so you can judge the standard before you pay anything."
        className="relative z-10"
      />

      <div className="relative z-10 mt-16">
        <FeaturedWork />
      </div>

      <FeaturedTestimonial />

      <div className="relative z-10 mt-24 sm:mt-28">
        <SectionHeading
          align="left"
          eyebrow="Concept previews"
          title="What we'd build for your kind of business."
          body="These are illustrative designs, not client work — same layout system, same seven-day process. Ask for a free preview and we'll build one around your business instead."
          titleClassName="max-w-2xl"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {conceptPreviews.map((concept, index) => (
            <ConceptCard key={concept.id} concept={concept} index={index} />
          ))}
        </div>
      </div>

      <Reveal className="relative z-10 mt-16 flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-[15px] text-[var(--text-secondary)]">
          Want to see your own site before you decide? We design the first version free, then you tell
          us what to change.
        </p>
        <Button asChild size="lg" variant="secondary" className="group">
          <a href="#get-started">
            Request my free preview
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
}
