import { MessageCircle, Phone } from "lucide-react";
import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Reveal, Section, SectionHeading } from "@/components/fx/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { brand, faqs } from "@/data/site";

export function Faq() {
  return (
    <Section id="faq" className="relative py-24 sm:py-28 lg:py-32">
      <MeshField variant="soft" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading
            align="left"
            eyebrow="Questions"
            title={
              <>
                Straight answers,
                <span className="text-[var(--accent-1)]"> no sales talk.</span>
              </>
            }
            body="If your question isn't here, message us — you'll get a real person, usually within the hour."
          />

          <Reveal delay={0.16} className="mt-9">
            <div className="glass hairline rounded-4xl p-6">
              <Badge variant="warm" size="sm" className="uppercase tracking-[0.14em]">
                Fastest reply
              </Badge>
              <p className="mt-4 text-[15px] leading-relaxed text-white/62">
                Send us your Facebook page or Google listing and we&apos;ll tell you exactly what
                we&apos;d change — free, no obligation.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button asChild size="default" block className="group">
                  <a href={brand.messenger} target="_blank" rel="noreferrer noopener">
                    <MessageCircle className="size-4" />
                    Message on Messenger
                  </a>
                </Button>
                <Button asChild variant="secondary" size="default" block>
                  <a href={`tel:${brand.phoneHref}`}>
                    <Phone className="size-4" />
                    {brand.phone}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="flex flex-col gap-3">
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
