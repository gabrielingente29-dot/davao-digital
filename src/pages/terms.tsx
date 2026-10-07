import * as React from "react";

import { MeshField } from "@/components/art/mesh";
import { Reveal, Section } from "@/components/fx/reveal";
import { brand, policies, pricing } from "@/data/site";
import { Breadcrumbs, PageHeading, PageShell } from "@/pages/page-shell";
import { peso } from "@/lib/utils";

/** PLACEHOLDER — set this to the date you publish the terms. */
const LAST_UPDATED = "7 October 2026";

/** Prices come from src/data/site.ts so the terms can never drift from the page. */
const PACKAGE_LINES = pricing.tiers.map((tier) => {
  const range =
    tier.build.from === tier.build.to
      ? `₱${peso(tier.build.from)}+`
      : `₱${peso(tier.build.from)}–${peso(tier.build.to)}`;
  return `${tier.name} — ${range} one-time, covering ${tier.included
    .filter(
      (item) =>
        !item.startsWith("Live in ") && !item.toLowerCase().includes("revision round"),
    )
    .join(", ")
    .toLowerCase()}.`;
});

type Block = { heading: string; paras: string[]; list?: string[] };

const sections: Block[] = [
  {
    heading: "Who we are",
    paras: [
      `These terms are between you (the client) and ${brand.name}, a web design studio based in ${brand.city}, ${brand.region}. They cover the website packages and the monthly Care Plan we sell through this website.`,
      `By asking us to start work you agree to these terms. If anything here is unclear, email ${brand.email} before you begin and we will explain it in plain language.`,
      `PLACEHOLDER: review these terms with a lawyer before you rely on them commercially.`,
    ],
  },
  {
    heading: "What our service is",
    paras: [
      "We design, build, host and maintain websites for small and growing businesses. Our packages are:",
    ],
    list: [
      ...PACKAGE_LINES,
      `${pricing.tiers[0].name === "Basic" ? "All packages" : "All packages"} include design, build, hosting and management for the build period. You own your domain, always.`,
    ],
  },
  {
    heading: "Pricing and payment",
    paras: [
      "You see your website first. No payment is due until you approve the site we have built for you — that is the whole point of the free preview, and it is not a limited-time offer.",
      "Prices are quoted in Philippine pesos. We are not VAT-registered, so no VAT is added to any price on this site.",
      "Once you approve the design, the one-time build fee becomes payable, and the monthly Care Plan starts from the day we launch. We accept cash, GCash and bank transfer.",
      "If you cancel a Care Plan part-way through a billing month, we do not refund the part-month you have already used, but we never charge you for a month you have not used.",
    ],
  },
  {
    heading: "Delivery",
    paras: [
      "We launch within seven days of having everything we need from you — your logo, photos, service and price details, and your contact information. The seven-day clock starts when those arrive, not when you first message us.",
      `Need it sooner? A 48-hour rush is ₱${peso(policies.rushFee)} on top of your package price, subject to our current workload.`,
      "If you send us material late, or take longer than expected to reply to a review request, the launch date moves by the same amount. We will always tell you when that happens.",
    ],
  },
  {
    heading: "Changes and revisions",
    paras: [
      "Each package includes a set number of revision rounds before launch — 1 round on Basic, 2 on Standard and 3 on Premium. A round is one batch of changes sent to us at once.",
      "We do not start a new round until you have seen the previous one, so nothing gets lost. Changes requested after launch are handled under the Care Plan, which includes content edits every month.",
    ],
  },
  {
    heading: "The monthly Care Plan",
    paras: [
      `The Care Plan is ₱${peso(pricing.tiers[0].monthly)} per month and is available with every package. It covers hosting and domain management, security and software updates, automatic backups, uptime and speed monitoring, up to 2 hours of content edits a month, priority support, a monthly performance report and ongoing local SEO tuning.`,
      `You can cancel any month with 30 days' notice. ${policies.cancellation} There is no lock-in contract and no exit fee.`,
      "If you cancel, your website stays online while we arrange the handover. If you ask us to, we will transfer the site files and hosting to an account you control.",
      "Advertising budgets (for example Meta ads) are paid to the platform, not to us, and are separate from the Care Plan.",
    ],
  },
  {
    heading: "Who owns what",
    paras: [
      "You own your domain name, registered in your name. You own the finished website files. We keep no hostage situation and charge no release fee — if you leave, everything we built for you is handed over.",
      "We own the general tools, layout systems and code we use to build sites across many clients. Nothing in the finished site you paid for is held back from you.",
      "Third-party components we use (fonts, libraries, hosting) stay under their own licences.",
    ],
  },
  {
    heading: "What we need from you",
    paras: ["To hit the seven-day launch, we need you to:"],
    list: [
      "Give us accurate information about your business, services and prices.",
      "Only send us images, logos and text you have the right to use. You keep responsibility for the content you supply.",
      "Reply to review requests within a reasonable time.",
      "Tell us who is authorised to approve the design, so we are not waiting on several people.",
    ],
  },
  {
    heading: "What we do not promise",
    paras: [
      "We build fast, well-structured sites and do the local SEO work that gives them the best chance of ranking. We cannot guarantee a specific position on Google, a specific number of enquiries, or a specific revenue result — nobody honestly can, because search results depend on many factors outside our control.",
      "Uptime for hosting is governed by our hosting provider's own service levels. We monitor it and fix what we can, but we do not underwrite third-party outages.",
    ],
  },
  {
    heading: "Limitation of liability",
    paras: [
      "To the extent permitted by law, our total liability to you for any claim relating to our services is limited to the amount you paid us in the twelve months before the claim.",
      "We are not liable for indirect or consequential loss, including lost profit or lost business opportunity. Nothing here limits rights you have under Philippine consumer law that cannot legally be waived.",
    ],
  },
  {
    heading: "Changes to these terms",
    paras: [
      "If we change these terms we will update this page and change the date at the top. Changes do not apply retroactively to work you have already commissioned and paid for.",
    ],
  },
  {
    heading: "Governing law",
    paras: [
      "These terms are governed by the laws of the Republic of the Philippines. If we cannot resolve a disagreement between us directly, it will be handled by the courts of Davao City.",
    ],
  },
];

export function TermsPage() {
  return (
    <Section className="relative pb-28 pt-32 sm:pt-40">
      <MeshField variant="cool" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Breadcrumbs trail={[{ label: "Terms of service" }]} />

        <PageHeading
          eyebrow="The fine print, in plain English"
          title="Terms of service"
          intro="What our packages include, how the seven-day launch works, what the monthly Care Plan covers, and who owns your domain and files. Short version: you own everything, you can cancel any month, and you never pay until you approve the site."
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
                  <p
                    key={para}
                    className="mt-3 text-[15.5px] leading-relaxed text-[var(--text-secondary)]"
                  >
                    {para}
                  </p>
                ))}
                {block.list ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {block.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] text-[var(--text-secondary)]"
                      >
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
              Questions about these terms?
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
              Email{" "}
              <a
                href={`mailto:${brand.email}`}
                className="text-[var(--accent-1)] underline-offset-4 hover:underline"
              >
                {brand.email}
              </a>{" "}
              or call {brand.phone} and we&apos;ll walk you through it. See also our{" "}
              <a
                href="/privacy.html"
                className="text-[var(--accent-1)] underline-offset-4 hover:underline"
              >
                privacy policy
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Route entry — applies the shared shell. */
export function TermsRoute() {
  return (
    <PageShell>
      <TermsPage />
    </PageShell>
  );
}
