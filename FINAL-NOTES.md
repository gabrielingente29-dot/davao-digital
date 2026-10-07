# Final notes — what I'd do next, and what I need you to decide

Companion to [MISSING-INFO.md](MISSING-INFO.md) (the raw list of placeholders) and
[DEPLOYMENT.md](DEPLOYMENT.md) (how to get it live). This file is the opinionated
version: my recommendations, and the decisions I cannot make for you.

---

## 1. What changed in this pass

- **The header is fixed for good.** The nav pill is now 1480px wide instead of
  1240px, and every item in it (wordmark, links, phone, buttons) is
  `shrink-0` + `nowrap`. It can get wider, but it can never stack text into a
  column again — which is what the six-line mess in your screenshots was.
- **The logo renders properly.** It is an inline SVG drawn to match your artwork
  (slate magnifier ring, white lens, blue trend arrow, blue handle tip), sized
  `size-8`. It cannot show up as a broken-image icon any more.
- **The nav is no longer see-through.** A big heading scrolling underneath the
  pill used to show straight through the glass and tangle with the wordmark — very
  visible on a phone. It now has a real backing surface (97% opaque + 24px blur).
- **Placeholders fixed:** the JSON-LD schema still advertised the old
  `hello@davaodigital.ph` / `+639170000000`, and the `<noscript>` text did too.
  Both now use the real email and phone. The schema also still listed the old
  Starter/Growth/Premium tiers at ₱5,000–10,000/month — it now matches the real
  packages on the page.
- **Facebook** is live in the footer and the schema: your numeric-ID page URL.
- **Checklist and deploy docs** rewritten: `MISSING-INFO.md`, `DEPLOYMENT.md`.
- `.gitignore` added so the repo only contains source.

Verified after the changes: `bun run typecheck` clean, `bun run build` clean, all
four pages return 200, zero console errors, and no horizontal overflow at 390 /
1024 / 1440px. Screenshots in `qa/shots/`.

---

## 2. Decisions I need from you

Each one has my recommendation — you can just say "yes to all".

**a) Delivery promise.** The hero says "online in 7 days" but Standard takes
1–2 weeks and Premium 2–3 weeks.
> **Recommend:** change the hero to **"Your business, online in as little as 5
> days"** and put the exact delivery window on each package card (already there).
> That keeps the speed promise punchy without over-promising to a Standard buyer.

**b) Revision rounds.** Packages say 1 / 2 / 3 rounds; the process section says
"unlimited revisions before launch".
> **Recommend:** keep the rounds finite — it protects your time — and change the
> process card to "Two rounds of changes until it looks right" (matching Standard,
> your most popular tier).

**c) Is the ₱3,000/month Care Plan optional or required?**
The Care Plan banner says "available with every package", but the hero subhead
says "we keep it fast, updated and growing for a flat monthly fee" and the price
teaser says "/month Care Plan" — which reads like a mandatory subscription.
> **Recommend:** if it is optional, change the hero line to "…then keep it fast and
> updated if you want us to" so nobody feels ambushed by a recurring charge.

**d) Reviews and case studies.** All eight testimonials and both case studies are
invented, including "+38 online enquiries" and `[CLIENT 1]`.
> **Recommend:** delete what you cannot evidence today. Three real reviews and one
> real before/after beat eight invented ones — and nobody can complain about them.
> Real ones can go in later; the sections already handle any number of entries.

**e) Address and map.** Today the footer map points at Davao City as a whole.
> **Recommend:** give me a street address or a Google Business Profile link (or
> tell me you are online-only and I'll reword it to "serving clients online").
> This is the single biggest lever for local search.

**f) The "10+ businesses served" figure.** I lowered this from 40+ at your
request — is 10 accurate? It appears in the hero trust row and the stats strip.
> **Recommend:** keep it only if true; otherwise change to "Davao-owned studio".
> Understatement is safer than a number a prospect can disprove.

---

## 3. Suggestions, in priority order

### Do these now (hours, not days)

1. **Wire up the enquiry form (biggest revenue impact).** It currently opens the
   visitor's mail app, so every lead from a phone without mail configured is
   silently lost. You are deploying to Cloudflare anyway, so a Pages Function
   endpoint costs nothing, or Web3Forms/Formspree takes five minutes. On success,
   redirect to `/thanks.html` so conversions become measurable.
2. **Kill the invented proof.** See 2d above. Fake reviews are a legal and
   Google-policy risk, and the numbers are checkable.
3. **Fix the two contradictions** (delivery + revisions). Both are already called
   out in MISSING-INFO.md §4.
4. **Add the real social profiles to the JSON-LD `sameAs` array.** You have a real
   Facebook page now — the schema should say so. It is a one-line change.
5. **Resolve Viber / Messenger / Instagram / LinkedIn.** A dead link next to a
   working one makes the whole set look untended.
6. **Replace the form's example placeholder** (`0917 000 0000`) with a realistic
   number so it does not look like a template.

### Before you spend money advertising

7. **Make the Care Plan its own selling point.** ₱3,000/month is your actual
   business model, and the eight items you gave me already describe it well.
   Give it its own section or page that targets "website maintenance Davao City"
   — maintenance is a keyword local agencies mostly ignore.
8. **Add a chat-first CTA.** Philippine buyers convert better on Messenger than on
   email. A floating Messenger button (you already have a sticky mobile CTA bar to
   sit next to) will out-perform the contact form.
9. **Put GA4 live and add the cookie notice.** Without it you are guessing which
   half of the page people read. Note the legal bit: GA4 needs a cookie notice here.
10. **Domain email.** `davaodigital@gmail.com` is fine to start, but
    `hello@davaodigital.ph` lands in spam less often and looks more established.

### Bigger bets (what I would do if this were my studio)

11. **A quotable guarantee.** "We build your site before you pay" is a genuinely
    unusual offer — make it a named, specific promise with a stated remedy, and put
    it in the hero. Specific promises get screenshotted and shared; generic ones do
    not.
12. **Industry landing pages.** Your reviews already name the verticals: dental,
    salon, hardware, real estate, logistics, bakery, auto shop. One page each,
    targeting "dentist website Davao" and friends, interlinked from the footer.
    That is where local search traffic actually is.
13. **A free tool that earns links:** a "how much should a website cost in the
    Philippines" calculator, or a `.ph` business-name availability checker. Cheap
    to build on what is already here, genuinely useful, shareable on Facebook
    groups, and it gives Google something to rank other than your homepage.
14. **Turn the before/after slider into a content engine.** The component is
    already built. Publish one real "Facebook page vs website" comparison a month
    for a local business — it doubles as a case study template and as social
    content.
15. **A public results wall.** Link each case study to the client's live site so a
    sceptical prospect can click through and verify. Verifiable proof is rare
    enough locally that it becomes a differentiator by itself.
16. **An offer page for the free preview.** "Get your free site preview" is your
    strongest hook, but it currently lives inside a four-field form. Give the offer
    its own section with a sample preview you built for an imaginary Davao
    business, so the visitor can see exactly what "free preview" means before
    handing over details.

---

## 4. About the QA scripts in `qa/`

They are development tools, not part of the site, and the build ignores them:

| File | What it does |
|---|---|
| `qa/mk-harness.js` | copies `dist/index.html` and injects a scroll/menu helper for screenshots |
| `qa/cap.sh` | capture desktop screenshots at a given section offset |
| `qa/cap-mobile.sh` | capture true-390px mobile screenshots |
| `qa/mobile-frame.html` | iframe wrapper that forces a real phone-width viewport |
| `qa/shots/*.png` | captured screenshots (git-ignored) |

`dist/_qa.html` and `dist/mobile-frame.html` are written by the harness into
`dist/`, which is rebuilt from source — they can never end up in a deploy. If you
would rather not keep any of this, delete the `qa/` folder; nothing in `src/`
depends on it.
