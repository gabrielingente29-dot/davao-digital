import { ArrowRight, Check, Mail, MapPin, MessageCircle, Navigation, Phone, Send, ShieldCheck } from "lucide-react";
import * as React from "react";

import { GridField, MeshField } from "@/components/art/mesh";
import { LampContainer } from "@/components/fx/lamp";
import { Magnetic } from "@/components/fx/magnetic";
import { Reveal, Section } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { brand } from "@/data/site";

const nextSteps = [
  "We reply within one business day (usually much faster).",
  "We build the first version of your site — free.",
  "You review it. If you love it, we launch in 7 days.",
];

export function FinalCta() {
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const business = String(data.get("business") ?? "");
    const reach = String(data.get("reach") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Free site preview — ${business || name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness: ${business}\nFacebook page or phone: ${reach}\n\n${message}`,
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="get-started" className="relative isolate scroll-mt-24">
      <LampContainer>
        <GridField className="opacity-40" />
        <MeshField variant="cta" />

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-28 pt-40 sm:px-8 sm:pt-44">
          <div className="flex flex-col items-center text-center">
            <Reveal blur={false} y={12}>
              <Badge variant="accent" size="lg" className="uppercase tracking-[0.16em]">
                <span className="size-1.5 rounded-full bg-teal-brand shadow-[0_0_10px_2px_rgba(23,190,187,0.7)]" />
                Free preview · No obligation
              </Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--text-primary)]">
                Let&apos;s get your business online —
                <span className="text-[var(--accent-1)]"> starting today.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--text-secondary)]">
                Tell us about your business. We&apos;ll build your first website preview free, and
                you decide from there.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* form */}
            <Reveal delay={0.1}>
              <div className="glass hairline relative overflow-hidden rounded-4xl p-7 shadow-[0_60px_140px_-80px_rgba(30,111,217,0.95)] sm:p-9">
                <div className="relative">
                  <h3 className="font-display text-[1.4rem] font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                    Get your free site preview
                  </h3>
                  <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">
                    Four fields. That&apos;s all we need to start.
                  </p>

                  {sent ? (
                    <div className="mt-8 rounded-3xl border border-teal-brand/25 bg-teal-brand/[0.07] p-6">
                      <span className="grid size-11 place-items-center rounded-full bg-ocean-brand">
                        <Check className="size-5 text-ink-950" />
                      </span>
                      <p className="mt-4 font-display text-[1.15rem] font-semibold text-white">
                        Salamat! Your details are on the way.
                      </p>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                        We&apos;ll reply within one business day. If your mail app didn&apos;t open,
                        message us on Messenger or Viber and we&apos;ll pick it up from there.
                      </p>
                      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                        <Button asChild size="default" className="sm:flex-1">
                          <a href={brand.messenger} target="_blank" rel="noreferrer noopener">
                            <MessageCircle className="size-4" />
                            Messenger
                          </a>
                        </Button>
                        <Button asChild variant="secondary" size="default" className="sm:flex-1">
                          <a href={brand.viber}>
                            Viber
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="name">Your name</Label>
                          <Input id="name" name="name" required placeholder="Juan Dela Cruz" autoComplete="name" />
                        </div>
                        <div>
                          <Label htmlFor="business">Business name</Label>
                          <Input id="business" name="business" required placeholder="Davao Smile Dental" autoComplete="organization" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="reach">Facebook page or phone number</Label>
                        <Input
                          id="reach"
                          name="reach"
                          required
                          placeholder="facebook.com/yourpage or 0917 000 0000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">What do you need the site to do?</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="We need bookings, our prices listed, and to show up when people search for a dentist in Davao."
                        />
                      </div>
                      <Magnetic strength={0.14} className="mt-1">
                        <Button type="submit" size="xl" className="group w-full sm:w-auto">
                          Send my details
                          <Send className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </Magnetic>
                      <p className="flex items-center gap-2 text-[12.5px] text-[var(--text-muted)]">
                        <ShieldCheck className="size-3.5 text-teal-brand/80" />
                        We never share your details. No spam, no mailing list.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>

            {/* side panel */}
            <div className="flex flex-col gap-6">
              <Reveal delay={0.16}>
                <div className="hairline rounded-4xl border border-white/[0.07] bg-white/[0.015] p-7 backdrop-blur-xl">
                  <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Prefer to chat?
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <Button asChild variant="secondary" size="lg" block className="justify-between">
                      <a href={brand.messenger} target="_blank" rel="noreferrer noopener">
                        <span className="flex items-center gap-2.5">
                          <MessageCircle className="size-4 text-teal-brand" />
                          Messenger
                        </span>
                        <ArrowRight className="size-4 opacity-50" />
                      </a>
                    </Button>
                    <Button asChild variant="secondary" size="lg" block className="justify-between">
                      <a href={brand.viber}>
                        <span className="flex items-center gap-2.5">
                          <span className="grid size-4 place-items-center rounded-full bg-ocean-brand/25 text-[9px] font-bold text-[var(--accent-1)]">
                            V
                          </span>
                          Viber
                        </span>
                        <ArrowRight className="size-4 opacity-50" />
                      </a>
                    </Button>
                    <Button asChild variant="secondary" size="lg" block className="justify-between">
                      <a href={`mailto:${brand.email}`}>
                        <span className="flex items-center gap-2.5">
                          <Mail className="size-4 text-leaf-brand" />
                          Email us
                        </span>
                        <span className="text-[12.5px] text-[var(--text-muted)]">{brand.email}</span>
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" block className="justify-between">
                      <a href={`tel:${brand.phoneHref}`}>
                        <span className="flex items-center gap-2.5">
                          <Phone className="size-4" />
                          Call the studio
                        </span>
                        <span className="text-[12.5px] text-[var(--text-muted)]">{brand.phone}</span>
                      </a>
                    </Button>
                  </div>
                  <p className="mt-5 text-[12.5px] text-[var(--text-muted)]">{brand.hours}</p>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <ol className="hairline rounded-4xl border border-[var(--border)] bg-[var(--tint-1)] p-7 backdrop-blur-xl">
                  <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    What happens next
                  </p>
                  <div className="mt-5 flex flex-col gap-4">
                    {nextSteps.map((step, index) => (
                      <li key={step} className="flex items-start gap-3.5">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--tint-2)] font-display text-[11px] font-semibold text-[var(--text-muted)]">
                          {index + 1}
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{step}</span>
                      </li>
                    ))}
                  </div>
                </ol>
              </Reveal>

              {/* map + directions — PLACEHOLDER embed, swap brand.mapsEmbedUrl for the real pin */}
              <Reveal delay={0.28}>
                <div className="hairline overflow-hidden rounded-4xl border border-[var(--border)] bg-[var(--tint-1)]">
                  <iframe
                    title={`Map — ${brand.name}, ${brand.city}`}
                    src={brand.mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-44 w-full border-0 grayscale-[0.3]"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <p className="flex items-center gap-2.5 text-[13.5px] text-[var(--text-muted)]">
                      <MapPin className="size-4 shrink-0 text-leaf-brand/80" />
                      {brand.city} · {brand.region}
                    </p>
                    <Button asChild variant="secondary" size="sm">
                      <a href={brand.directionsUrl} target="_blank" rel="noreferrer noopener">
                        <Navigation className="size-3.5" />
                        Get directions
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </LampContainer>
    </section>
  );
}
