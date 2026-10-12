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
  facebook: "https://www.facebook.com/profile.php?id=61595369930225",
  /**
   * The studio is ONLINE-ONLY: there is no walk-in address and no Google
   * Business Profile yet, so nothing on the site may claim one. If an address
   * or a GBP link ever exists, add it here — see MISSING-INFO.md §2.
   */
  location: "Davao City, Philippines · working with clients online",
  meetingNote:
    "Usually online — calls, Messenger or email. We're happy to meet in person in Davao City when it helps.",
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
  eyebrow: "Davao City & Mindanao · Web design, SEO & digital marketing",
  headlineLead: "Your business, online in",
  headlineHighlight: "7 days",
  subhead:
    "Web design for Davao City and Mindanao businesses. We build your website first — free. You review it, we launch it within a week, then we keep it fast, updated and growing for a flat monthly fee.",
  primaryCta: { label: "Get my free preview", href: "#get-started" },
  secondaryCta: { label: "See our work", href: "#work" },
  priceTeaser: {
    fromLabel: "From",
    build: 10000,
    buildNote: "one-time build",
    monthly: 3000,
    monthlyNote: "/month Care Plan",
    cta: { label: "See all packages", href: "#pricing" },
  },
  trust: [
    { icon: "people", label: "Industries we design for", value: 6, suffix: "+" },
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
    body: "Custom web design for Davao City and Mindanao businesses, built around how your customers actually buy. Fast, mobile-first and written to convert.",
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
    body: "SEO services for Davao City, Mindanao and nationwide keywords — service pages, structured data and reviews that push you up the results.",
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
  eyebrow: "Pricing · Basic from ₱10,000",
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
      build: { from: 10000, to: 13000 },
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
      id: "professional",
      name: "Professional",
      tagline: "A complete website built for growing businesses.",
      build: { from: 15000, to: 20000 },
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
      cta: "Choose Professional",
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "A full-scale website for ambitious brands.",
      build: { from: 25000, to: 25000 },
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

/* ------------------------------ PREVIOUS WORK ----------------------------- */

export type WorkShot = { src: string; alt: string };

export type FeaturedProject = {
  name: string;
  industry: string;
  location: string;
  url: string;
  urlLabel: string;
  headline: string;
  summary: string;
  built: string[];
  shots: WorkShot[];
  /** A real, permissioned review from the client — shown beside the showcase. */
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    rating: number;
  };
};

/**
 * The one real build, live on its own domain. Every screenshot in
 * /public/work was captured from the live site — nothing here is a mockup,
 * a projection or an invented result. Add the next project above this one as
 * real builds land (see TODO-BEFORE-PUBLISH.md, item 2).
 */
export const featuredProject: FeaturedProject = {
  name: "H.D. Rubber Manufacturer & Machine Shop",
  industry: "Rubber manufacturing & machine shop",
  location: "Agdao, Davao City",
  url: "https://hdrubberdavao.com",
  urlLabel: "hdrubberdavao.com",
  headline: "A 45-year-old Davao workshop, online and findable.",
  summary:
    "H.D. Rubber has been making custom rubber and machined parts on R. Castillo St since 1979. We built the site that explains what they make, who they serve and how to reach the workshop — with the local-search structure underneath it.",
  built: [
    "Six service sections: custom rubber parts, gaskets & seals, machining, industrial rollers, metal fabrication and OEM replacement parts",
    "Search structure for buying terms — structured data, descriptive service headings and Davao City meta tags",
    "Click-to-call, email and a Google Map to the Agdao workshop, so enquiries reach the shop phone",
    "Mobile-first layout, built to stay quick on a phone connection",
  ],
  shots: [
    {
      src: "/work/hd-rubber-home.jpg",
      alt: "H.D. Rubber homepage hero: “Davao City's Trusted Rubber Manufacturer & Machine Shop”, with Get a Quote and call buttons",
    },
    {
      src: "/work/hd-rubber-services.jpg",
      alt: "Services section listing custom rubber parts, gaskets and seals, machining, industrial rollers, metal fabrication and OEM replacement parts",
    },
    {
      src: "/work/hd-rubber-why.jpg",
      alt: "“Why Davao Businesses Trust H.D. Rubber” section with four trust cards",
    },
    {
      src: "/work/hd-rubber-process.jpg",
      alt: "“From Idea to Finished Part in Davao” three-step process section",
    },
  ],
  testimonial: {
    quote:
      "Before Davao Digital, our business online was a Facebook page and no Google presence, doing nothing for us. Most of our business came from word of mouth. Within a couple of weeks of launching the new site, we were getting 25+ inquiries a month, up from 5 only. Customers now message or call us already knowing our services and ready to buy. The site looks professional, loads fast, and works great on phones. They also made the whole process easy and didn't charge big-agency prices. If you want a website that brings in business, not just one that looks nice, I'd recommend Davao Digital.",
    author: "Jonathan D. Ingente",
    role: "Owner, H.D. Rubber Manufacturer & Machine Shop · Davao City",
    rating: 5,
  },
};

/* ---------------------------- CONCEPT PREVIEWS ---------------------------- */

export type ConceptPreview = {
  id: string;
  title: string;
  audience: string;
  blurb: string;
  points: string[];
  mock: "cafe" | "workshop";
};

/**
 * 🔵 ILLUSTRATIVE CONCEPTS — NOT CLIENT WORK.
 *
 * Design studies drawn with the studio's own layout system, so a buyer can see
 * the standard before paying anything. No real business, no results and no
 * quotes are claimed anywhere on them. They exist so the "work" section is a
 * "here is what yours would look like" page until real builds land.
 */
export const conceptPreviews: ConceptPreview[] = [
  {
    id: "cafe",
    title: "Café, restaurant or food business",
    audience: "Single location · menu · walk-ins and orders",
    blurb:
      "The menu, prices and opening hours up front, with ordering and directions one tap away — the page a customer finds instead of scrolling your Facebook photos.",
    points: [
      "Menu and price list you can update in a minute",
      "Tap-to-call, directions and order links",
      "Google Map and opening hours, always current",
    ],
    mock: "cafe",
  },
  {
    id: "workshop",
    title: "Manufacturing, fabrication or machine shop",
    audience: "Multi-industry · quote led · B2B",
    blurb:
      "Built for buyers who arrive with a drawing and a deadline: capabilities, materials and industries served, with the quote request impossible to miss.",
    points: [
      "Capabilities and materials, written for engineers",
      "Industries served and proof of work",
      "Quote enquiries routed straight to your phone",
    ],
    mock: "workshop",
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
    a: "Our packages run from ₱10,000 to ₱25,000+ depending on page count and features, plus an optional ₱3,000 per month Care Plan for hosting, updates, backups and support. We are not VAT-registered, so no VAT is added. That's deliberately in line with what local businesses in Davao City and Mindanao can carry — no agency retainers.",
  },
  {
    q: "Do you build websites for businesses across Mindanao?",
    a: "Yes. We're a Davao City studio and take on work anywhere in Mindanao — Davao del Sur, Davao del Norte, Tagum, General Santos, Cagayan de Oro, Butuan, Koronadal and further afield. Everything runs online through calls, Messenger or email, and you see a live preview before you pay anything.",
  },
  {
    q: "Do you work with businesses outside Davao City?",
    a: "Yes. We're based in Davao City and work with clients across Mindanao and the rest of the Philippines — Tagum, General Santos, Cagayan de Oro, Butuan, Cebu, Metro Manila and everywhere in between. Everything runs online, with calls in Bisaya, Tagalog or English. We're happy to meet in person in Davao City when it helps.",
  },
  {
    q: "How long does a website take to build?",
    a: "Most projects go live within seven days of getting your logo, photos and prices. A simple one- to three-page Basic site can be finished in a couple of days; a nine- to ten-page Premium site with more content usually takes the full week. The clock starts when your materials arrive, not when you first message us.",
  },
  {
    q: "Do you build websites for small businesses in Davao?",
    a: "Yes — small and growing businesses are most of what we do: clinics, cafés, hardware and supply shops, trades, workshops and service businesses around Davao City. You do not need a big budget, a logo or existing photos; we work with what you have. The free preview means you see the website before you pay anything.",
  },
  {
    q: "Do you provide hosting and the domain, or do I need my own?",
    a: "We handle both, and both are included in the ₱3,000 per month Care Plan — managed hosting, SSL, daily backups and security updates. The domain is registered in your name, so it stays yours even if you stop working with us. If you already own a domain or hosting, we will set the site up on what you have.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Every build ships with the technical groundwork: fast mobile-first pages, structured data, clean headings, a sitemap and a Google Search Console setup so Google can index you. We also set up and optimise your Google Business Profile so you appear in Maps and \"near me\" searches. Nobody can honestly promise a specific ranking — local results also depend on competition and reviews — but we build for it and tune it every month.",
  },
];

export const footer = {
  blurb:
    "A Davao City web design company building fast, honest websites for businesses across Mindanao and the Philippines — then keeping them fast, secure and updated for a flat monthly fee. We work online, reply within a business day, and never lock you in.",
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
    "Davao Region",
    "Mindanao",
    "Tagum",
    "General Santos",
    "Cebu City",
    "Cagayan de Oro",
    "Metro Manila",
    "Nationwide Philippines",
  ],
};

/* -------------------------------------------------------------------------- */
/* ABOUT — who we are, what we do, who we serve. Easy for AI to quote.         */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About the studio",
  heading: "A small Davao City web design studio, working online.",
  lede: "Davao Digital is a web design company and digital marketing studio in Davao City, Philippines. As a small team of website designers and developers, we design, build, host and maintain websites for small and growing businesses across Davao, Mindanao and the rest of the country. Every project starts with a free preview: we build the first version of your website before you pay anything.",
  body: [
    "We are deliberately small. The same person who designs your site builds it, launches it and answers the phone when you need a change — so nothing gets lost between a salesperson and a developer.",
    "We work with clinics, cafés and restaurants, hardware and supply shops, trades and contractors, workshops and manufacturers, and service businesses that need to be findable on Google and easy to contact. Most of our clients came to us with a Facebook page and no website at all.",
    "We are an online-first studio: no walk-in office and no storefront. Work happens over calls, Messenger and email, which keeps our overheads — and your price — low. We are happy to meet in person in Davao City when a project needs it.",
  ],
  stats: [
    { value: "7 days", label: "From first message to a live website" },
    { value: "₱10,000", label: "Starting price, one-time build" },
    { value: "₱3,000/mo", label: "Care Plan: hosting, updates, support" },
    { value: "Free", label: "Preview built before you pay" },
  ],
  operatingSince: "",
  differentiators: [
    "We build your website first, free — you see it working before you pay.",
    "You own your domain and your site files. No lock-in, cancel any month.",
    "Fixed, published prices in pesos, not 'request a quote'.",
    "Live in 7 days, on every package.",
    "Local search is built in: Google Business Profile, structured data, sitemap.",
  ],
} as const;


