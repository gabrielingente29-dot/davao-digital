# Davao Digital — everything still missing or faked

Last updated after the header/logo/pricing pass. This is the complete list: every
item below is either a **placeholder**, an **unverified claim**, or a **question
only you can answer**. Answer them and I can drop the real values straight in.

**Legend** — 🔴 blocks launch · 🟡 before you start advertising · 🟢 nice to have

---

## 0. Placeholder inventory (every fake value on the site right now)

Exact locations, so nothing gets missed.

| # | Where | What is there now | What it needs |
|---|---|---|---|
| 1 | `src/data/site.ts` → `brand.viber` | `viber://chat?number=%2B639170000000` — the old demo number | 🔴 your real Viber number, or delete the link |
| 2 | `brand.messenger` | `https://m.me/davaodigital` | 🟡 your Facebook page uses a numeric ID, so this short link probably will not resolve. Send the exact link from the page's "Send message" button |
| 3 | `brand.instagram` | `https://instagram.com/davaodigital` | 🟡 real account, or remove the link |
| 4 | `brand.linkedin` | `https://linkedin.com/company/davaodigital` | 🟡 real page, or remove the link |
| 5 | `brand.directionsUrl` + `brand.mapsEmbedUrl` | generic "Davao City, Philippines" | 🔴 the map in the footer points at a whole city, not an office |
| 6 | `brand.hours` | `Mon–Sat · 9AM–6PM (PHT)` | 🟡 confirm, or correct |
| 7 | `caseStudies[].client` | literally `[CLIENT 1]` and `[CLIENT 2]` on the page | 🔴 real names, or "a Bajada dental clinic" if they are anonymous |
| 8 | `caseStudies[].before/after.src` | `null` → falls back to **illustrated mockups** | 🔴 real before/after screenshots |
| 9 | `caseStudies[].stats` | `38`, `1.4s`, `72%`, `3×`, `+41%`, `12` | 🔴 real numbers, or remove them |
| 10 | `caseStudies[].quote` / `quoteBy` | invented quotes | 🔴 real client quotes + permission to publish |
| 11 | `testimonials` (8 entries) | invented — "Cafe owner", "Hardware supplier", … | 🔴 real reviews with name, business, area and permission |
| 12 | `hero.trust` | `10+` Davao businesses served | 🟡 confirm 10 is true — a prospect may check |
| 13 | testimonials stat strip | `10+`, `7 days`, `1.4s`, `98/100` | 🟡 the load time and mobile score should be re-measured after launch |
| 14 | `faqs` → rush answer | "48 hours for a small priority fee" — **no amount** | 🟡 how much is the rush fee? |
| 15 | `index.html` JSON-LD `geo` | `7.1907, 125.4553` — central Davao | 🔴 your actual coordinates |
| 16 | `index.html` JSON-LD `address` | city + region only, no street | 🔴 street address (or confirm you are online-only) |
| 17 | `index.html` JSON-LD | no `sameAs` social profiles | 🟡 now that the Facebook page is real, it should be listed |
| 18 | `index.html` | `var GA_ID = "G-XXXXXXXXXX"` — the snippet is installed but **dormant** | 🟡 your GA4 Measurement ID |
| 19 | `index.html` canonical / OG / JSON-LD `@id` | all assume `https://davaodigital.ph` | 🔴 confirm the domain, then swap if different |
| 20 | `public/robots.txt`, `public/sitemap.xml` | same assumed domain, `lastmod 2026-10-05` | 🔴 same |
| 21 | `public/og.png`, `public/favicon.svg` | generated from your logo by me | 🟢 a designed share image would look sharper |
| 22 | `src/components/sections/final-cta.tsx` (line ~122) | form placeholder text: `facebook.com/yourpage or 0917 000 0000` | 🟢 replace the example number with a real-looking one |
| 23 | `final-cta.tsx` form | **no backend** — it opens the visitor's mail app | 🔴 see §10 |
| 24 | `src/components/art/mock-pages.tsx`, `process.tsx` | the fake browser screenshots contain `davaodigital.ph` and `0917 000 0000` | 🟢 cosmetic, inside decorative mockups — only worth changing once the real content lands |

---

## 1. Contact & identity

| Item | Status |
|---|---|
| Business name `Davao Digital` | ✅ assume correct |
| Email `davaodigital@gmail.com` | ✅ in place — see the note in §12 about moving to a domain address |
| Phone `+63 969 193 3721` | ✅ in place, including the schema |
| Facebook page | ✅ `https://www.facebook.com/profile.php?id=61595369930225` |
| Viber, Messenger, Instagram, LinkedIn | 🔴 / 🟡 items 1–4 above |
| Opening hours | 🟡 item 6 |
| Registered business name / DTI or SEC number | 🟢 not shown anywhere — do you want it in the footer? |
| VAT / TIN | 🟡 not shown anywhere (see §3) |

---

## 2. Location 🔴

The whole site sells "local Davao", so this is the weakest part right now.

- 🔴 **Street address** — needed for the footer, the map, and local ranking.
- 🔴 **Google Business Profile link** — the share/place link from your listing.
- 🔴 **Google Maps embed URL** — Maps → Share → Embed a map → copy the `src`.
- 🔴 **Exact coordinates** — replace `7.1907, 125.4553`.
- 🟡 **Service areas** — I guessed: Davao City, Bajada, Lanang, Matina, Torres,
  Bunawan, Tagum, General Santos, Cebu City, Cagayan de Oro, Metro Manila. Confirm.
- 🟡 **Do you meet clients, or is everything online?** — changes the wording from
  "visit our office" to "serving clients online".

---

## 3. Pricing

✅ The three packages you sent are live on the page, in the JSON-LD schema, in the
FAQ answers and in the meta descriptions: **Basic ₱15,000–18,000**,
**Standard ₱20,000–25,000** (Most Popular), **Premium ₱30,000+**, with the
**Care Plan at ₱3,000/month** as a full-width banner under the cards.

Still open:

- 🟡 **Do prices include VAT?** Not stated anywhere. If you are VAT-registered this
  must be said before you invoice.
- 🟡 **Extra page price** — the old add-on list said ₱1,500/page and has been
  removed. Do you want per-page pricing shown again?
- 🟡 **Rush fee amount** (item 14).
- 🟢 **Payment terms** — the schema says "Cash, GCash, Bank Transfer". Is a deposit
  ever required? Right now the site promises "No payment until you approve".

---

## 4. Two promises that contradict each other 🔴

Both of these are visible to a careful reader and will cost you trust.

1. **Delivery time.** The hero and process section both say **"online in 7 days"**,
   but the packages you gave me say 5–7 days (Basic), **1–2 weeks** (Standard) and
   **2–3 weeks** (Premium). Someone buying Standard is told 7 days, then shown
   1–2 weeks. Pick one of:
   - keep "7 days" and scope it to Basic only, or
   - soften the hero to something like "live in as little as 5 days".

2. **Revisions.** The packages list 1 / 2 / 3 revision rounds, but the process
   section still promises **"Unlimited revisions before launch."** Which is true?

---

## 5. Proof — reviews and case studies 🔴

**This is the biggest gap on the site.** Both case studies and all eight
testimonials are invented. Publishing fake reviews is risky (the Philippine
Consumer Act and Google's own review policies) and the numbers are exactly the
kind of thing a prospect checks.

Needed:

- 🔴 **6–8 real reviews** — quote, first name, business name, area, and permission.
- 🔴 **A Google review link** so a "leave us a review" button can work.
- 🔴 **2–3 real case studies** — client name, industry, location, before
  screenshot, after screenshot, 3 real numbers, and a quote.
- 🟡 **Client logos** (with written permission).
- 🟡 **Real portfolio screenshots** — today's are hand-drawn SVG mockups.

If the numbers are not real yet, the honest move is to delete them. A short page
with true claims converts better than a long one with invented ones.

---

## 6. Images & media

| Item | Status |
|---|---|
| Logo mark in the header | ✅ redrawn inline as SVG to match your artwork — it cannot break |
| Higher-resolution original | 🟡 if you have the `.ai` / `.eps` / `.svg`, send it and I will swap it in |
| Light-background logo variant | 🟡 the white lens fades into a white pill in light mode |
| Team photos | 🟢 none — you currently come across as a studio, not named people |
| Real portfolio screenshots | 🔴 see §5 |
| Designed OG share image | 🟢 `og.png` is generated from the logo |

---

## 7. Legal 🟡

- 🟡 **Privacy policy review** — `privacy.html` is a careful skeleton, but a
  lawyer should read it before launch.
- 🔴 **DPO name + email** — the Data Privacy Act expects a designated Data
  Protection Officer once you process personal data (which the form does).
- 🟡 **NPC registration** — are you registered with the National Privacy Commission?
- 🟡 **Terms of service** — do you want a separate page?
- 🟡 **Refund / cancellation policy** — the site says "cancel any month, 30 days
  notice". Confirm that is the real policy.
- 🟡 **Cookie notice** — required the moment GA4 goes live.

---

## 8. Analytics & tracking 🟡

| Item | Status |
|---|---|
| GA4 Measurement ID | 🟡 snippet present on every page, blank ID — dormant until you paste it |
| Google Search Console | 🟡 needs your access to verify and submit the sitemap |
| Meta Pixel / Google Ads tag | 🟢 not installed — only needed if you run ads |
| Call tracking | 🟢 not needed at this size |

---

## 9. SEO 🟡

- 🟡 Confirm the primary keyword target: "web design Davao City"?
- 🟡 3–5 secondary keywords you actually want to rank for.
- 🟡 Any old URLs that need redirects? (Send the list.)
- 🟡 Is your Google Business Profile verified?
- 🟢 Do you want a blog / articles section? There is no CMS yet.
- 🟡 `lastmod` in `sitemap.xml` should be refreshed at launch.

---

## 10. Forms & lead handling 🔴

The enquiry form has **no backend**. It opens the visitor's own mail app, which
means:

- anyone without a mail client configured loses the lead silently,
- you get no record of what was submitted,
- nothing lands in a spreadsheet or CRM automatically.

Decisions needed:

- 🔴 Which inbox should enquiries go to?
- 🔴 Do you want a real form backend? (Recommended — I have left this ready to
  wire: Cloudflare Pages Functions since you are already on Cloudflare, or
  Web3Forms/Formspree for a 5-minute setup.)
- 🟡 Should the visitor get an automatic confirmation email?
- 🟡 Should leads also land in a Google Sheet, CRM or Slack?
- 🟡 Should "Send my details" push the visitor to `/thanks.html`? It should, so
  conversions are trackable.

---

## 11. Build & deploy

✅ See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the step-by-step GitHub + Cloudflare
Pages walkthrough. Open questions:

- 🟡 Where will it be hosted? (Cloudflare Pages is free and already fits this
  project exactly.)
- 🟡 Do you own `davaodigital.ph`, and do you have DNS access?
- 🟡 Do you need email on the domain (`hello@davaodigital.ph`) as well?
- 🟢 Is there an existing site that must stay live until launch?

---

## 12. Copy I wrote — confirm or replace 🟡

| Item | Current |
|---|---|
| Hero headline | "Your business, online in 7 days." |
| Sub-headline | "We build your website first — free…" |
| Trust numbers | `10+` businesses, live in `7 days`, `1.4s` load, `98/100` mobile |
| Guarantees | "No payment until you approve your site", "No lock-in", "You own your domain" |
| Response promise | "We reply within 1 business day" |
| All 7 FAQ answers | written by me — check the claims about ownership, cancellation and scope |
| Footer blurb | "A small Davao City studio building fast, honest websites…" |
| Contact email | `davaodigital@gmail.com` — a gmail address is fine to start, but
  `hello@davaodigital.ph` reads more established and lands in spam less often |

---

## Launch blockers, in order

1. 🔴 **A real form backend** — you are losing leads today.
2. 🔴 **Address + Google Business Profile + map** — the entire local pitch rests on it.
3. 🔴 **Real reviews and case studies** — replace or delete the invented ones.
4. 🔴 **Fix the 7-day vs 1–3 week delivery contradiction** and the revision-round conflict.
5. 🔴 **Viber / Messenger / Instagram / LinkedIn** — real links or removed.
6. 🔴 **Privacy policy review + DPO details.**
7. 🟡 **GA4 ID + cookie notice.**
8. 🟡 **Confirm prices include or exclude VAT.**
9. 🟡 **Domain + DNS**, then swap the placeholder domain in 3 files.
10. 🟡 **Hosting** — Cloudflare Pages, per DEPLOYMENT.md.
