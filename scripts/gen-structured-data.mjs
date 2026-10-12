/**
 * Generate the homepage JSON-LD from src/data/site.ts.
 *
 *   node scripts/gen-structured-data.mjs
 *
 * Why generate it instead of hand-writing it: prices, services and FAQ answers
 * already live in one place (`src/data/site.ts`). Writing the schema by hand
 * means the page can say ₱10,000 while the schema says ₱12,000 — which is how
 * rich results get dropped. This script reads the data through Vite (so the
 * TypeScript, the `@/` alias and the types all work) and rewrites everything
 * between the STRUCTURED-DATA markers in index.html.
 *
 * Runs automatically as the first step of `npm run build`.
 *
 * Emits, as one @graph:
 *   Organization           — who we are, logo, contact, social
 *   ProfessionalService    — the local business: area served, hours, offers
 *   WebSite                — the site itself
 *   Service (one per card) — each service with its published "from" price
 *   FAQPage                — every question and answer, ready to be quoted
 *
 * Deliberately NOT emitted: Review / AggregateRating. The site does not display
 * any real reviews yet, and machine-readable reviews that are not on the page
 * are a rich-results and trust risk. Add them when the reviews are real.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createServer } from "vite";

const root = process.cwd();
const indexPath = path.join(root, "index.html");
const START = "<!-- STRUCTURED-DATA:START -->";
const END = "<!-- STRUCTURED-DATA:END -->";

const SITE = "https://davaodigital.com";
const LOGO = `${SITE}/logo.png`;

const server = await createServer({
  root,
  configFile: path.join(root, "vite.config.ts"),
  appType: "custom",
  logLevel: "warn",
  server: { middlewareMode: true, hmr: false },
});

try {
  const { brand, services, pricing, faqs, about, footer, hero, featuredProject } =
    await server.ssrLoadModule("/src/data/site.ts");

  const businessId = `${SITE}/#business`;
  const organizationId = `${SITE}/#organization`;

  const description =
    `${brand.name} is a web design and digital marketing studio in ${brand.city}, Philippines. ` +
    `We design, build, host and maintain websites for small and growing businesses across Davao, ` +
    `Mindanao and the rest of the country. Websites start at ₱${pricing.tiers[0].build.from.toLocaleString("en-PH")} ` +
    `one-time and are live in 7 days, with an optional ₱${pricing.tiers[0].monthly.toLocaleString("en-PH")} per month Care Plan.`;

  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: brand.name,
      url: `${SITE}/`,
      logo: { "@type": "ImageObject", url: LOGO, width: 512, height: 512 },
      image: `${SITE}/og.png`,
      description,
      email: brand.email,
      telephone: brand.phone,
      ...(about.operatingSince ? { foundingDate: about.operatingSince } : {}),
      sameAs: [brand.facebook, brand.messenger],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: brand.phone,
          email: brand.email,
          areaServed: "PH",
          availableLanguage: ["English", "Filipino", "Cebuano"],
        },
      ],
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": businessId,
      name: brand.name,
      alternateName: "Davao Digital — Premium Web Design",
      url: `${SITE}/`,
      logo: LOGO,
      image: `${SITE}/og.png`,
      description,
      slogan: `${hero.headlineLead} ${hero.headlineHighlight}.`,
      email: brand.email,
      telephone: brand.phone,
      parentOrganization: { "@id": organizationId },
      // Online-first studio: city and country only, no street address on purpose.
      address: {
        "@type": "PostalAddress",
        addressLocality: brand.city,
        addressRegion: "Davao del Sur",
        addressCountry: "PH",
      },
      geo: { "@type": "GeoCoordinates", latitude: 7.1907, longitude: 125.4553 },
      areaServed: footer.areas.map((area) => ({ "@type": "Place", name: area })),
      knowsAbout: [
        "Web design",
        "Website development",
        "Small business websites",
        "Local SEO",
        "Google Business Profile",
        "Website hosting and maintenance",
        "Digital marketing",
        "Meta ads management",
      ],
      priceRange: `₱${pricing.tiers[0].build.from.toLocaleString("en-PH")}–₱${pricing.tiers[2].build.from.toLocaleString("en-PH")}+`,
      currenciesAccepted: "PHP",
      paymentAccepted: "Cash, GCash, Bank transfer",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: [brand.facebook, brand.messenger],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website packages",
        itemListElement: pricing.tiers.map((tier) => ({
          "@type": "Offer",
          name: `${tier.name} website package`,
          description: `${tier.tagline} From ₱${tier.build.from.toLocaleString("en-PH")}+ one-time, then ₱${tier.monthly.toLocaleString("en-PH")} per month for the Care Plan.`,
          priceCurrency: "PHP",
          price: String(tier.build.from),
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "PHP",
            minPrice: tier.build.from,
            maxPrice: tier.build.to,
          },
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "Philippines" },
        })),
      },
      // The one build that actually exists, as citable evidence.
      subjectOf: {
        "@type": "CreativeWork",
        name: `${featuredProject.name} — website`,
        url: featuredProject.url,
        about: featuredProject.headline,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: brand.name,
      inLanguage: "en-PH",
      publisher: { "@id": organizationId },
    },
    ...services.map((service) => ({
      "@type": "Service",
      "@id": `${SITE}/#service-${service.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`,
      name: service.title,
      serviceType: service.title,
      description: `${service.body} ${service.price}.`,
      provider: { "@id": businessId },
      areaServed: { "@type": "Country", name: "Philippines" },
      offers: {
        "@type": "Offer",
        priceCurrency: "PHP",
        description: service.price,
        availability: "https://schema.org/InStock",
        url: `${SITE}/#services`,
      },
    })),
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);

  const html = await readFile(indexPath, "utf8");
  const startAt = html.indexOf(START);
  const endAt = html.indexOf(END);
  if (startAt === -1 || endAt === -1) {
    console.error(`✗ ${START} / ${END} markers are missing from index.html`);
    process.exit(1);
  }

  const block = `${START}\n    <script type="application/ld+json">\n${json
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n")}\n    </script>\n    ${END}`;

  const next =
    html.slice(0, startAt) +
    block +
    html.slice(endAt + END.length);

  await writeFile(indexPath, next, "utf8");
  console.log(
    `✓ structured data written: ${graph.length} nodes (${services.length} services, ${faqs.length} FAQs)`,
  );
} finally {
  await server.close();
}
