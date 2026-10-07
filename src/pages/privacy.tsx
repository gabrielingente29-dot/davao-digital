import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Reveal, Section } from "@/components/fx/reveal";
import { brand } from "@/data/site";
import { Breadcrumbs, PageHeading, PageShell } from "@/pages/page-shell";

/** PLACEHOLDER — set this to the date you publish the policy. */
const LAST_UPDATED = "5 October 2026";

type Block = { heading: string; paras: string[]; list?: string[] };

const sections: Block[] = [
  {
    heading: "Who we are",
    paras: [
      `${brand.name} is a web design and digital marketing studio based in ${brand.city}, ${brand.region}. This policy explains what personal information we collect through this website, why we collect it, and what we do with it.`,
      `For anything privacy-related you can reach us at ${brand.email} or ${brand.phone}.`,
    ],
  },
  {
    heading: "What we collect",
    paras: [
      "We only collect what we need to answer your enquiry and run the website.",
    ],
    list: [
      "Details you type into our enquiry form — your name, business name, a Facebook page or phone number, and your message.",
      "Basic technical data (pages visited, approximate location by city, device type) if analytics is switched on.",
      "Anything you send us directly by email, Messenger, Viber or phone.",
    ],
  },
  {
    heading: "Why we use it",
    paras: ["We use your information to:"],
    list: [
      "Reply to your enquiry and prepare a free website preview.",
      "Provide the services you asked for and keep in touch about them.",
      "Improve the website and understand which pages are useful.",
      "Meet our legal and accounting obligations.",
    ],
  },
  {
    heading: "Form submissions",
    paras: [
      "Our enquiry form opens your own email app with the details pre-filled, so your message reaches us directly from your inbox. We do not sell or rent your details to anyone, ever.",
      "PLACEHOLDER: if you later connect a form service (Formspree, Netlify Forms, a CRM), name that provider here and link its privacy policy.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paras: [
      "PLACEHOLDER: describe the analytics and cookie tools you actually run. The site ships with a Google Analytics 4 snippet that stays dormant until a Measurement ID is added.",
      "If you enable analytics, add a cookie banner and update this section to say which cookies are set and how a visitor can refuse them.",
    ],
  },
  {
    heading: "How long we keep it",
    paras: [
      "Enquiry emails are kept for as long as we need them to serve you, and for our own records afterwards. You can ask us to delete your details at any time and we will, unless we are required by law to keep them.",
    ],
  },
  {
    heading: "Your rights",
    paras: [
      "Under the Philippine Data Privacy Act of 2012 (RA 10173) you have the right to be informed, to object, to access, to correct, to erase or block, to damages, and to data portability.",
      `To exercise any of these, email ${brand.email} and we will respond within a reasonable time.`,
    ],
  },
  {
    heading: "Third parties",
    paras: [
      "We use a small number of trusted providers to run the site and our work — for example hosting, fonts and (if enabled) analytics. Each only receives the minimum data needed to do its job.",
      "PLACEHOLDER: list the exact vendors you use, e.g. hosting provider, form provider, analytics provider.",
    ],
  },
  {
    heading: "Changes to this policy",
    paras: [
      "If we change how we handle your information we will update this page and change the date at the top. Significant changes will be called out on the home page.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <Section className="relative pb-28 pt-32 sm:pt-40">
      <MeshField variant="cool" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Breadcrumbs trail={[{ label: "Privacy policy" }]} />

        <PageHeading
          eyebrow="Your data"
          title="Privacy policy"
          intro="Plain-English version: we collect only what we need to answer your enquiry, we never sell your details, and you can ask us to delete them whenever you like."
        />

        <p className="mt-6 text-[13px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Last updated {LAST_UPDATED}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((block, index) => (
            <Reveal key={block.heading} delay={index * 0.03}>
              <section>
                <h2 className="font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {block.heading}
                </h2>
                {block.paras.map((para) => (
                  <p key={para} className="mt-3 text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
                    {para}
                  </p>
                ))}
                {block.list ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {block.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--text-secondary)]">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ocean-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="hairline mt-14 rounded-4xl border border-[var(--border)] bg-[var(--tint-1)] p-7">
            <p className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Questions about your data?
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
              Email{" "}
              <a href={`mailto:${brand.email}`} className="text-[var(--accent-1)] underline-offset-4 hover:underline">
                {brand.email}
              </a>{" "}
              and we&apos;ll help.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Route entry — applies the shared shell. */
export function PrivacyRoute() {
  return (
    <PageShell>
      <PrivacyPage />
    </PageShell>
  );
}
