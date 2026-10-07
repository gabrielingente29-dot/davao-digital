# Final notes — what I'd do next, and what I need you to decide

Companion to [MISSING-INFO.md](MISSING-INFO.md) (the raw list of placeholders) and
[DEPLOYMENT.md](DEPLOYMENT.md) (how to get it live). This file is the opinionated
version: my recommendations, and the decisions I cannot make for you.

---

## 1. What changed in the content-capture pass

All ten sections of your content form are now in the code. Gone: Instagram and
LinkedIn links, the fake map and "Get directions", every `davaodigital.ph`
reference, the invented neighbourhood list (Bajada, Lanang, Matina, Torres,
Bunawan), the "unlimited revisions" promise, the per-package delivery windows
that contradicted the 7-day hero, `Dr. Reyes`, and the `0917 000 0000` form
placeholder.

Added or rebuilt:

- **A real form backend.** `/api/enquiry` emails the lead, logs it to a Google
  Sheet, confirms to the visitor, and swallows bot spam via a honeypot. The form
  gained an **email field** — a confirmation email is impossible without one.
- **A Terms of Service page** at `/terms.html`, with package prices pulled from
  the same data file as the pricing cards, so they cannot drift apart.
- **A cookie notice** that remembers the visitor's choice.
- **The light-mode logo fix.** The lens and ring are now theme-coloured tokens,
  so the mark no longer disappears into a white nav pill.
- **`wrangler.jsonc` + a Worker entry**, so the existing `davao-digital` Worker
  serves `dist/` *and* the API from one `npx wrangler deploy`.
- **`testimonialsArePlaceholders`** in `src/data/site.ts`. The reviews are still
  invented, but they are now billed as placeholders in the UI instead of
  masquerading as real customers — and it is one flag to flip once you have real
  ones.

**One decision I made for you:** you said the guarantee is "a website fully done
in 7 days regardless of the tier", but also picked the option that scopes it to
Basic. I went with your own words — every package now says "Live in 7 days".
Confirm or flip it; details in MISSING-INFO.md §1.

Verified after these changes: `bun run typecheck` clean, `bun run build` clean,
all five pages return 200, zero console errors, no horizontal overflow at 390 or
1440px, and the live Worker still serves the site.

---

## 2. Decisions from the previous pass — now resolved

All six were answered in your content form. The outcomes are recorded in
MISSING-INFO.md §1. The only one that needs your eyes is the 7-day delivery
scope above.

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
