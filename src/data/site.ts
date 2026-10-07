/* ------------------------------------------------------------------ *
 * Single source of truth for every word, price and link on the site.  *
 * ------------------------------------------------------------------ */

export const brand = {
  name: "Davao Digital",
  city: "Davao City",
  region: "Davao del Sur, Philippines",
  email: "davaodigital@gmail.com",
  phone: "+63 969 193 3721",
  phoneHref: "+639691933721",
  /** Messenger short link for the page ID above. */
  messenger: "https://m.me/61595369930225",
  viber: "viber://chat?number=%2B639691933721",
  facebook: "https://www.facebook.com/profile.php?id=61595369930225",
  /**
   * The studio is ONLINE-ONLY: there is no walk-in address and no Google
   * Business Profile yet, so nothing on the site may claim one. If an address
   * or a GBP link ever exists, add it here — see MISSING-INFO.md §2.
   */
  location: "Davao City, Philippines · working with clients online",
  meetingNote:
    "Usually online — calls, Messenger or Viber. We're happy to meet in person in Davao City when it helps.",
  hours: "Mon–Sat · 9AM–6PM (PHT)",
} as const;

/**
 * The terms we actually trade on. Kept together so the FAQ, the pricing cards
 * and the schema can never drift apart.
 */
export const policies = {
  /** 48-hour priority delivery, on top of the standard package price. */
  rushFee: 5000,
  /** Not VAT-registered, so no VAT is added to any price. */
  vatRegistered: false,
  /** Cancellation term for the monthly Care Plan. */
  cancellation: "Cancel any month with 30 days' notice — there is no lock-in contract.",
};

export const promise = {
  responseTime: "We reply within 1 business day",
  detail: "Usually much faster — most enquiries get an answer the same day.",
};

export const nav = [
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
];

export type HeroTrustItem = {
  icon: "people" | "clock" | "shield";
  label?: string;
  prefix?: string;
  value?: number;
  suffix?: string;
};

export const hero = {
  eyebrow: "Davao City · Web design & digital marketing",
  headlineLead: "Your business, online in",
  headlineHighlight: "7 days",
  subhead:
    "We build your website first — free. You review it, we launch it within a week, then we keep it fast, updated and growing for a flat monthly fee.",
  primaryCta: { label: "Get my free preview", href: "#get-started" },
  secondaryCta: { label: "See our work", href: "#work" },
  priceTeaser: {
    fromLabel: "From",
    build: 15000,
    buildNote: "one-time build",
    monthly: 3000,
    monthlyNote: "/month Care Plan",
    cta: { label: "See all packages", href: "#pricing" },
  },
  trust: [
    { icon: "people", label: "Davao businesses served", value: 10, suffix: "+" },
    { icon: "clock", prefix: "Live in ", value: 7, suffix: " days" },
    { icon: "shield", label: "No lock-in contracts" },
  ] satisfies HeroTrustItem[],
};

export const problemSolution = {
  eyebrow: "Why it matters",
  heading: "A Facebook page alone isn't a business website.",
  body: "It works until someone searches your name on Google, or wants to book you at 11PM. That's when a real website pays for itself.",
  before: {
    label: "Facebook page only",
    points: [
      "Invisible on Google Search",
      "No booking, no quote form",
      "Posts get buried in a week",
      "Looks the same as your competitors",
    ],
  },
  after: {
    label: "A site that wins customers",
    points: [
      "Ranks for “near me” searches",
      "Enquiries land in your inbox daily",
      "Loads in under 2 seconds",
      "Looks like the best business in town",
    ],
  },
};

export const processSteps = [
  {
    step: "01",
    title: "We build your site first — free",
    body: "Tell us about your business. We design and build a real, working website before you pay anything. No deposit, no risk.",
    detail: "Takes us 3–5 days",
    screen: "draft",
  },
  {
    step: "02",
    title: "You review it and tell us what to change",
    body: "You get a private link. We adjust the words, photos and colours until it feels exactly like your business.",
    detail: "Two rounds of changes until it looks right",
    screen: "review",
  },
  {
    step: "03",
    title: "We launch in 7 days",
    body: "Domain, hosting, Google Search setup, Google Business Profile, speed and mobile checks. You're live, and your customers can find you.",
    detail: "Everything handled for you",
    screen: "live",
  },
  {
    step: "04",
    title: "We manage and grow it monthly",
    body: "Updates, backups, security, local SEO, monthly reports — plus Meta ads when you want more reach. You run the business, we run the website.",
    detail: "One flat monthly fee",
    screen: "grow",
  },
];

export type ServiceIconKey =
  | "browser"
  | "shield"
  | "pin"
  | "search"
  | "chart"
  | "megaphone";

export const services: {
  icon: ServiceIconKey;
  title: string;
  body: string;
  span: string;
  featured?: boolean;
  wide?: boolean;
}[] = [
  {
    icon: "browser",
    title: "Website design",
    body: "Custom sites built around how your customers actually buy. Fast, mobile-first and written to convert.",
    span: "lg:col-span-4",
    featured: true,
  },
  {
    icon: "shield",
    title: "Hosting & updates",
    body: "Managed hosting, backups, security patches and content edits. You never touch a dashboard.",
    span: "lg:col-span-2",
  },
  {
    icon: "pin",
    title: "Google Business Profile",
    body: "We claim, verify and optimise your profile so you show up in Maps and local searches.",
    span: "lg:col-span-2",
  },
  {
    icon: "search",
    title: "Local SEO",
    body: "Davao City and nationwide keywords, service pages and reviews that push you up the results.",
    span: "lg:col-span-2",
  },
  {
    icon: "chart",
    title: "Monthly reports",
    body: "Plain-language numbers: visitors, calls, enquiries and what we're fixing next.",
    span: "lg:col-span-2",
  },
  {
    icon: "megaphone",
    title: "Meta ads management",
    body: "Facebook and Instagram campaigns pointed at your best offers, with the budget and results reported every month.",
    span: "lg:col-span-6",
    wide: true,
  },
];

export type Tier = {
  id: string;
  name: string;
  tagline: string;
  build: { from: number; to: number };
  monthly: number;
  included: string[];
  adds: string[];
  popular?: boolean;
  cta: string;
};

export const pricing = {
  eyebrow: "Pricing · Basic from ₱15,000",
  heading: "Clear prices. No surprise invoices.",
  body:
    "Every package includes design, build, hosting and management. You own your domain, always.",
  /** Toggle labels above the cards. */
  toggle: { build: "One-time build", year: "First year, all in" },
  tiers: [
    {
      id: "basic",
      name: "Basic",
      tagline: "A professional online presence for small businesses and startups.",
      build: { from: 15000, to: 18000 },
      monthly: 3000,
      included: [
        "1–3 pages",
        "Modern, clean layout",
        "Mobile-responsive design",
        "Contact form",
        "Basic SEO setup",
        "Fast loading speed",
        "1 revision round",
        "Live in 7 days",
      ],
      adds: [],
      cta: "Start with Basic",
    },
    {
      id: "standard",
      name: "Standard",
      tagline: "A complete website built for growing businesses.",
      build: { from: 20000, to: 25000 },
      monthly: 3000,
      included: [
        "5–6 pages",
        "Custom design tailored to your brand",
        "Conversion-focused layout",
        "Enhanced content structure",
        "Mobile-responsive design",
        "Contact form",
        "Basic SEO setup",
        "Fast loading and performance optimization",
        "2 revision rounds",
        "Live in 7 days",
      ],
      adds: [],
      popular: true,
      cta: "Choose Standard",
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "A full-scale website for ambitious brands.",
      build: { from: 30000, to: 30000 },
      monthly: 3000,
      included: [
        "9–10 pages",
        "Premium design with a polished, high-end brand feel",
        "Lead- and conversion-optimized structure",
        "Enhanced content structure",
        "Mobile-responsive design",
        "Advanced SEO setup",
        "Performance and speed optimization",
        "3 revision rounds",
        "Live in 7 days",
      ],
      adds: [],
      cta: "Talk about Premium",
    },
  ] satisfies Tier[],
  /** Shown under the cards. */
  reassurance: ["No lock-in.", "You own your domain.", "Free preview before you pay."],
};

export type CaseStudy = {
  client: string;
  industry: string;
  location: string;
  headline: string;
  summary: string;
  quote: string;
  quoteBy: string;
  before: { src: string | null; caption: string };
  after: { src: string | null; caption: string };
  stats: { label: string; value: string }[];
  accent: string;
  mock: "clinic" | "cafe" | "workshop";
};

export const caseStudies: CaseStudy[] = [
  {
    client: "[CLIENT 1]",
    industry: "Dental clinic",
    location: "Davao City",
    headline: "+38 online enquiries in the first month",
    summary:
      "We replaced an outdated Facebook-only presence with a clean booking site, then optimised their Google Business Profile for “dentist Davao”.",
    quote:
      "Patients now show up already knowing our services and prices. The front desk stopped repeating itself all day.",
    quoteBy: "[CLIENT 1] — Clinic manager",
    before: { src: null, caption: "Old page — no booking, no prices" },
    after: { src: null, caption: "New site — book in two taps" },
    stats: [
      { label: "Enquiries / month", value: "38" },
      { label: "Page load", value: "1.4s" },
      { label: "Mobile traffic", value: "72%" },
    ],
    accent: "cyan",
    mock: "clinic",
  },
  {
    client: "[CLIENT 2]",
    industry: "Machine shop & fabrication",
    location: "Davao City",
    headline: "3× more quote requests from Mindanao clients",
    summary:
      "A gallery-first site that shows the work, plus service pages for the jobs that pay best. Quote forms route straight to their shop phone.",
    quote:
      "Clients from Tagum and General Santos now call us first. The site does the talking for us.",
    quoteBy: "[CLIENT 2] — Owner",
    before: { src: null, caption: "Photos scattered on social media" },
    after: { src: null, caption: "Organised, searchable project gallery" },
    stats: [
      { label: "Quote requests", value: "3×" },
      { label: "Avg. job size", value: "+41%" },
      { label: "Cities reached", value: "12" },
    ],
    accent: "violet",
    mock: "workshop",
  },
];

/**
 * 🔴 PLACEHOLDER REVIEWS — NOT REAL YET.
 *
 * Every quote below is layout filler written by us. They are attributed to
 * bracketed placeholders on purpose, and the testimonials section reads
 * `testimonialsArePlaceholders` so the page says so out loud instead of
 * implying these are paying customers.
 *
 * To finish this properly: collect 6–8 real reviews (quote, first name,
 * business name, area, and written permission to publish), delete the brackets
 * from `name` and `meta`, then set `testimonialsArePlaceholders = false`.
 * Tracked in MISSING-INFO.md §5.
 */
export const testimonialsArePlaceholders = true;

export const testimonials = [
  {
    quote:
      "They sent us a finished website before we paid a single peso. We just said yes and it was live the following week.",
    name: "[Client name — cafe owner]",
    meta: "[Business] · Davao City",
  },
  {
    quote:
      "Our Google profile finally works. We get calls from people searching for us in Davao and as far as General Santos.",
    name: "[Client name — hardware supplier]",
    meta: "[Business] · Davao City",
  },
  {
    quote:
      "The monthly report is the first marketing report I actually read. Short, clear, and it always comes with a next step.",
    name: "[Client name — real estate broker]",
    meta: "[Business] · Davao City",
  },
  {
    quote:
      "Bookings went up without us spending more on ads. The website just does the work now.",
    name: "[Client name — salon owner]",
    meta: "[Business] · Davao City",
  },
  {
    quote:
      "They replied the same day, every time. Updates are done before I even remember to ask.",
    name: "[Client name — logistics company]",
    meta: "[Business] · Tagum",
  },
  {
    quote:
      "We're in Cebu and Davao. One site, two location pages, and both rank. That solved a real headache for us.",
    name: "[Client name — bakery & café group]",
    meta: "[Business] · Cebu City",
  },
  {
    quote:
      "Our clinic looks like a chain now. Same staff, same building, completely different first impression.",
    name: "[Client name — dental clinic owner]",
    meta: "[Business] · Davao City",
  },
  {
    quote:
      "Facebook ads used to burn money. Now they point at a proper page and the numbers make sense.",
    name: "[Client name — auto shop owner]",
    meta: "[Business] · Cagayan de Oro",
  },
];

export const faqs = [
  {
    q: "How fast can my website be live?",
    a: "Seven days from the moment we have your details — the same promise on every package. We usually have the first working version in front of you within 3–5 days, then we polish and launch. Need it sooner? A 48-hour rush is ₱5,000.",
  },
  {
    q: "What do I need to give you?",
    a: "Your logo, a few photos of your business, your services and prices, and your contact details. No logo or photos yet? We can handle that. If you only have a Facebook page, we'll pull what we can and rewrite it properly.",
  },
  {
    q: "Who owns the website and the domain?",
    a: "You do. The domain is registered in your name and the site files are yours. If you ever leave, we hand everything over — no hostage situations, no exit fees.",
  },
  {
    q: "Can I cancel the monthly plan?",
    a: "Yes, any month, with 30 days notice. There's no lock-in contract. Your site stays online if you want to manage hosting yourself, or we can transfer it to your own account.",
  },
  {
    q: "What exactly is included in the Care Plan?",
    a: "Hosting and domain management, security and software updates, automatic backups, uptime and speed monitoring, up to 2 hours of content edits a month, priority support, a monthly performance report and ongoing local SEO tuning — ₱3,000 per month, available with every package.",
  },
  {
    q: "How much does a website cost in Davao City?",
    a: "Our packages run from ₱15,000 to ₱30,000+ depending on page count and features, plus an optional ₱3,000 per month Care Plan for hosting, updates, backups and support. We are not VAT-registered, so no VAT is added. That's deliberately in line with what local businesses can carry — no agency retainers.",
  },
  {
    q: "Do you work with businesses outside Davao City?",
    a: "Yes. We're based in Davao City and work with clients across the Philippines — Tagum, General Santos, Cebu, Cagayan de Oro, Metro Manila and everywhere in between. Everything runs online, with calls in Bisaya, Tagalog or English. We're happy to meet in person in Davao City when it helps.",
  },
];

export const footer = {
  blurb:
    "A Davao City studio building fast, honest websites for businesses across the Philippines — then keeping them fast, secure and updated for a flat monthly fee. We work online, reply within a business day, and never lock you in.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Website design", href: "#services" },
        { label: "Hosting & updates", href: "#services" },
        { label: "Google Business Profile", href: "#services" },
        { label: "Local SEO", href: "#services" },
        { label: "Meta ads management", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our work", href: "#work" },
        { label: "Pricing", href: "#pricing" },
        { label: "How it works", href: "#process" },
        { label: "FAQ", href: "#faq" },
        { label: "Get a free preview", href: "#get-started" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy.html" },
        { label: "Terms of service", href: "/terms.html" },
        { label: "Cookie notice", href: "/privacy.html" },
      ],
    },
  ],
  /** Confirmed service areas — kept to cities, not neighbourhoods. */
  areas: [
    "Davao City",
    "Tagum",
    "General Santos",
    "Cebu City",
    "Cagayan de Oro",
    "Metro Manila",
    "Nationwide Philippines",
  ],
};
