# Davao Digital — what is still missing or faked

Updated after the big content-capture pass. Everything you answered is now in the
code; this file lists only what is **still** a placeholder, a claim we cannot
evidence, or a decision only you can make.

**Legend** — 🔴 blocks launch · 🟡 before you advertise · 🟢 nice to have

---

## 1. Done in this pass (so you know it landed)

| You said | What changed |
|---|---|
| Viber `+63 969 193 3721` | Real Viber deep link, everywhere |
| Messenger page ID | `m.me/61595369930225` |
| Remove Instagram + LinkedIn | Both gone — no dead social links left |
| Hours Mon–Sat 9–6 PHT | Confirmed and unchanged |
| Rush fee ₱5,000 | In the FAQ **and** the JSON-LD schema |
| Online only, no address | Footer, contact panel, schema and meta all reworded. **The map iframe and "Get directions" were removed** — there is nothing to point at |
| Service areas confirmed | Cities only: Davao City, Tagum, General Santos, Cebu City, Cagayan de Oro, Metro Manila (+ nationwide). Bajada/Lanang/Matina/Torres/Bunawan removed |
| Not VAT-registered | Stated in the FAQ, the schema and the terms |
| Domain `davaodigital.com` | Swapped in **every** file: canonical, OG, JSON-LD, sitemap, robots, sub-pages |
| Cookie notice | A real, dismissible notice that remembers the choice |
| Terms of service page | `/terms.html` built and linked in the footer |
| Footer blurb | Rewritten |
| Revisions: 1/2/3 rounds | Process section now says "Two rounds of changes until it looks right" |
| Care Plan strongly recommended | Wording kept as-is |
| Form backend | `/api/enquiry` endpoint built — see §4 |
| Light-mode logo | The white lens no longer vanishes; it now has its own light-mode colour |
| SEO keywords | Your primary + 5 secondary keywords are in the meta keywords, title and copy |

### One thing I had to decide for you — please confirm

**Delivery time.** In §6 you said "our guarantee is that a website will be fully
done in 7 days regardless of the tier", but in §7 you picked the option that
scopes 7 days to Basic only. Those cannot both be true, so I went with your own
words: **"7 days" now applies to every package**, and the per-package lines
(`Delivery: 1–2 weeks`, `2–3 weeks`) are gone. It also matches the case-study
section, which already said "same seven-day timeline".

If you actually want it scoped to Basic, say so — it is a one-line change in
`src/data/site.ts` (the three `"Live in 7 days"` entries) plus the same three
strings in `index.html`.

---

## 2. Placeholder inventory (every fake value still on the site)

| # | Where | What is there now | What it needs |
|---|---|---|---|
| 1 | `src/data/site.ts` → `testimonials` | 8 invented reviews. Attributions are visibly bracketed (`[Client name — cafe owner]`) and the section says "Placeholder quotes…" | 🔴 6–8 real reviews: quote, first name, business, area, written permission. Then delete the brackets and flip `testimonialsArePlaceholders` to `false` |
| 2 | `src/data/site.ts` → `caseStudies[].client` | literally `[CLIENT 1]` and `[CLIENT 2]` | 🔴 real client names, or "a dental clinic in Davao City" if they want to stay anonymous |
| 3 | `caseStudies[].stats` | `38`, `1.4s`, `72%`, `3×`, `+41%`, `12` | 🔴 real numbers, or delete the row |
| 4 | `caseStudies[].quote` / `quoteBy` | invented quotes | 🔴 real quotes + permission to publish |
| 5 | `caseStudies[].before/after.src` | `null` → the page falls back to illustrated mockups with a dashed "drop your screenshot here" box | 🔴 real before/after screenshots (`/public/case-1-before.jpg`, `case-1-after.jpg`, `case-2-before.jpg`, `case-2-after.jpg`) |
| 6 | `hero.trust` + the stats strip | `10+` businesses served, `1.4s` load, `98/100` mobile | 🟡 you confirmed 10+; re-measure the load time and mobile score after launch and update them |
| 7 | `src/components/art/mock-pages.tsx` | the decorative browser/phone screenshots | 🟢 see §3 — the real content list |
| 8 | `public/og.png`, `public/favicon.svg` | generated from the logo mark | 🟢 you said the OG image is fine. Send the hi-res logo and I will re-render both |
| 9 | `index.html` → `var GA_ID` | `G-XXXXXXXXXX` — the snippet is installed but **dormant** | 🟡 your GA4 Measurement ID |
| 10 | `src/pages/privacy.tsx` + `src/pages/terms.tsx` | both carry a "PLACEHOLDER: have a lawyer review" note | 🔴 get both read before you rely on them |

---

## 3. The mockup content list (you asked "tell me what's needed, then drop it in")

The browser and phone "screenshots" on the page are **not images** — they are
real DOM and CSS drawn in `src/components/art/mock-pages.tsx`. That is why they
stay razor sharp on retina screens and cost nothing to load. It also means
swapping the content is a text edit, not a design job.

There are three fictional showcase businesses. **This is the content I need from
you** — one row per thing you can change:

| Mockup | Where it appears | Hard-coded sample | Real content needed |
|---|---|---|---|
| **Davao Smile Dental** (`davaosmiledental.ph`) | Hero main window, process section, case study 1 | Business name, "Bajada · Davao City", headline "Gentle dental care in Davao City.", intro paragraph, 3 price cards (₱1,200 / Free / ₱4,500), "1,200+ patients treated", "4.9 on Google", phone `0917 000 0000`, "Book in two taps" | A real dental client — or any real client — with permission: name, area, one-line promise, 3 services with prices, one trust number, phone number |
| **Kapé Dabaw** | Hero phone screen, case study 2 | Cafe name, "single-origin Bukidnon beans… Bolton Street", 3 menu prices (₱140/₱175/₱195), "4.9 ★ · 612 reviews" | A real café client's name, area, specialities and 3 prices |
| **Mindanao Metal Works** (`mindanaometalworks.ph`) | Hero back window | Business name, "Bunawan · since 2006", stats "18 yrs / 240+ projects / ±0.05mm tolerance", 4 capability tiles | A real fabrication/machining client, with their real numbers |
| Browser URL bars | Hero + process | `davaosmiledental.ph`, `mindanaometalworks.ph`, `preview.davaodigital.com` | Real client domains if you have them. `preview.davaodigital.com` is already correct |

**If you have no real clients yet, the honest option is to label them.** Add a
small "Sample project" chip to each mockup so nobody mistakes a fictional café
for a case study. That is a five-minute change whenever you want it — say the
word.

A real phone number you *can* use today is your own: `+63 969 193 3721` replaces
`0917 000 0000` in the dental mockup if you would rather the sample not look like
a template.

---

## 4. The form backend (built — needs your keys)

`/api/enquiry` now does four things: emails the lead to you, logs it to a Google
Sheet, sends the visitor a confirmation, and silently drops bot spam via a
honeypot field. **You also now have an email field on the form** — it was not
there before, and a confirmation email is impossible without it.

Two things still need you:

- 🔴 **Resend API key** (`RESEND_API_KEY`) — the endpoint returns `503` without it
  and the browser falls back to `mailto:`. Step-by-step in DEPLOYMENT.md §2.1.
- 🟡 **`davaodigital.com` verified in Resend** — until then, visitor confirmation
  emails are switched off on purpose, because Resend's free test sender can only
  deliver mail to you, not to strangers. Lead notifications to you work today.
- 🟡 **Google Sheet webhook** (`SHEET_WEBHOOK_URL`) — optional; instructions in
  DEPLOYMENT.md §2.2.

---

## 5. Legal & identity

| Item | State |
|---|---|
| Business name `Davao Digital` | ✅ in place. No DTI/SEC registration shown, which is fine |
| VAT / TIN | ✅ not VAT-registered, and the site now says so |
| Privacy policy | 🟡 written, but a lawyer should read it |
| Terms of service | 🟡 new page — same caveat |
| Refund / cancellation policy | ✅ "cancel any month, 30 days notice" confirmed and now written into the terms |
| DPO name + email | 🔴 **not appointed.** The Data Privacy Act expects one once you process personal data — which the form now does, into a Sheet |
| NPC registration | 🟡 you were not sure. Check at <https://privacy.gov.ph> whether your processing needs registering |
| Cookie notice | ✅ built |
| Domain email | ✅ staying on `davaodigital@gmail.com`. `hello@davaodigital.com` will exist for *sending* once Resend verifies the domain — reception still lands in Gmail |
| Old URLs needing redirects | ✅ none |

---

## 6. SEO

- 🟡 Primary target confirmed: **"web design Davao City"** (title, H1, description, schema).
- ✅ Secondary keywords in place: website designer Davao, web developer Davao,
  website development Davao City, business website Philippines, affordable web
  design Davao.
- 🟡 **Google Business Profile — not created.** This is the single biggest lever
  left for local search, and you can register as a service-area business without
  publishing a street address. Do this after the domain is live.
- 🟡 Google Search Console: verify and submit `sitemap.xml` once the domain resolves.
- 🟢 A blog/articles section would give Google more to rank. There is no CMS yet.

---

## 7. Images

| Item | State |
|---|---|
| Logo mark | ✅ inline SVG — cannot break, cannot 404 |
| Light-mode variant | ✅ fixed; the lens has its own light colour |
| Hi-res original | 🟢 send the `.ai`/`.eps`/`.svg` and I will swap it in |
| Team photos | ✅ none, and named staff were removed from the mockups so nothing implies a bigger team than you have |
| Real portfolio screenshots | 🔴 see §2, item 5 |
| OG share image | ✅ you said it is fine |

---

## Launch blockers, in order

1. 🔴 **Buy and connect `davaodigital.com`**, then verify it in Resend.
2. 🔴 **Set `RESEND_API_KEY`** — the form is falling back to `mailto:` until you do.
3. 🔴 **Replace or genuinely mark the reviews and case studies** (§2, items 1–5).
   Do not advertise while invented proof is on the page.
4. 🔴 **DPO + a lawyer pass on privacy and terms.**
5. 🟡 **Connect the GitHub → Cloudflare build** so a push deploys itself.
6. 🟡 **Create the Google Business Profile** and get GA4 live.
7. 🟡 **Confirm the 7-day guarantee applies to every tier** (§1).
