# Getting Davao Digital online

Everything is wired. This is the exact sequence to go from "code on GitHub" to
"live on your own domain".

Companion files: [MISSING-INFO.md](MISSING-INFO.md) (what is still fake or
missing) and [FINAL-NOTES.md](FINAL-NOTES.md) (opinions and next steps).

---

## Where things stand today

| Thing | State |
|---|---|
| GitHub repo | `github.com/gabrielingente29-dot/davao-digital` (private), branch `main` |
| Cloudflare account | `Gabrielingente29@gmail.com's Account` (`76b4fb425f263c9bcf6c49dfeb604f01`) |
| Cloudflare project | **A Worker named `davao-digital`** — not a Pages project |
| Live today | <https://davao-digital.gabrielingente29.workers.dev> ✅ serving the site |
| `wrangler.jsonc` | In the repo — this is what makes the Worker serve `dist/` |
| Custom domain | `davaodigital.com` — **not purchased yet** |
| Auto-deploy on push | **Not connected yet** — see Part 1 |

Two earlier dashboard drag-and-drop uploads are what is live right now. They
serve the site fine, but they do not rebuild when you push. Part 1 fixes that.

---

## Part 1 — Connect GitHub so pushes deploy themselves

This is the last manual step, and it is done once.

1. GitHub → the repo → make sure `main` is up to date (it is).
2. Cloudflare dashboard → **Workers & Pages** → click the **`davao-digital`**
   Worker → **Settings** → **Builds** (sometimes shown as **Build**).
3. **Connect** the repository `gabrielingente29-dot/davao-digital`.
4. Set these exactly:

   | Field | Value |
   |---|---|
   | Branch | `main` |
   | Root directory | `/` |
   | Build command | `bun install && bun run build` |
   | Deploy command | `npx wrangler deploy` |

5. **Save**. Cloudflare queues a build immediately — read the log.

### Why the old build was failing

Cloudflare always ran `bun install --frozen-lockfile`, whatever the build
command said. The repo's `bun.lock` was written by a newer Bun than the builder
runs (1.2.15), so the builder could not parse it, ignored it, and then refused to
continue because "lockfile had changes, but lockfile is frozen".

**That lockfile is now deleted**, so there is nothing to be frozen against and
the install succeeds. Two related traps, if it ever comes back:

- Do **not** add `NODE_ENV=production` as a build variable. Package managers then
  skip `devDependencies`, `typescript` never installs, and the build dies with
  `tsc: not found`.
- You can pin Bun with a build variable `BUN_VERSION=1.3.0` if you want
  reproducibility, but a locked-in version is what broke last time.

---

## Part 2 — Give the enquiry form somewhere to send mail

The form POSTs to `/api/enquiry`, which is served by the small Worker entry in
`worker/index.js` using the handler in `functions/api/enquiry.js`.

Until a Resend key is set, the endpoint answers `503` and the browser
**automatically falls back** to opening the visitor's own mail app with the
message pre-filled. So you are never worse off than before — but you do not get
the emails or the spreadsheet until you do this.

### 2.1 Resend (the email part) — required

1. Sign up at <https://resend.com> (free: 3,000 emails/month) using
   **davaodigital@gmail.com**, so the lead notifications arrive in the right inbox.
2. **API Keys** → **Create API Key** → full access → copy it (starts with `re_`).
3. Put it on the Worker as a secret:

   ```bash
   npx wrangler secret put RESEND_API_KEY
   ```

   (Or dashboard → the `davao-digital` Worker → **Settings** → **Variables and
   Secrets** → add `RESEND_API_KEY` as an encrypted secret.)

**Read this before you wonder where the visitor confirmations went.** Resend's
shared test sender, `onboarding@resend.dev`, can only deliver to the Resend
account owner's own address. So:

- **Lead notifications to you → work immediately.** ✅
- **Confirmation emails to visitors → switched off automatically** until
  `davaodigital.com` is bought and verified inside Resend.

Once the domain is verified, set one more variable and confirmations start
sending on their own:

```bash
npx wrangler secret put RESEND_FROM
# paste: Davao Digital <hello@davaodigital.com>
```

Optional extra: `LEAD_INBOX` if leads should go somewhere other than
`davaodigital@gmail.com`.

### 2.2 Google Sheet (the record-keeping part) — optional but recommended

Leads are also appended to a Sheet, so you have a permanent list even if an
email gets buried.

1. Create a Google Sheet called **Davao Digital enquiries**. Add a tab named
   `Enquiries`.
2. **Extensions → Apps Script**, delete the placeholder, paste this:

   ```javascript
   var SECRET = "make-up-a-long-random-string";

   function doPost(e) {
     var body = JSON.parse(e.postData.contents);
     if (SECRET && body.secret !== SECRET) {
       return ContentService.createTextOutput("forbidden");
     }
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var sheet = ss.getSheetByName("Enquiries") || ss.insertSheet("Enquiries");
     if (sheet.getLastRow() === 0) {
       sheet.appendRow(["Received", "Name", "Business", "Email", "Facebook / phone", "Message"]);
     }
     sheet.appendRow([
       body.receivedAt, body.name, body.business, body.email, body.reach, body.message,
     ]);
     return ContentService.createTextOutput("ok");
   }
   ```

3. **Deploy → New deployment → Web app.** Execute as **Me**. Who has access:
   **Anyone**. Deploy, authorise it, and copy the `/exec` URL.
4. Set it on the Worker:

   ```bash
   npx wrangler secret put SHEET_WEBHOOK_URL      # paste the /exec URL
   npx wrangler secret put SHEET_WEBHOOK_SECRET   # paste the same SECRET string
   ```

If a Sheet write fails, the enquiry still reaches you by email — the Sheet is
never allowed to break the form.

### 2.3 Test it

Open the live `#get-started` form, submit a real enquiry with your own email,
and confirm all three: the email in `davaodigital@gmail.com`, a new Sheet row,
and the redirect to `/thanks.html`.

---

## Part 3 — Point davaodigital.com at it

The domain is **not purchased yet**. Everything in the code already points at
`https://davaodigital.com` (canonical tags, Open Graph, JSON-LD, sitemap,
robots), so once you buy it, there is no code change to make.

1. Buy `davaodigital.com` (Cloudflare Registrar is the cheapest at cost, and it
   is already the account you are deploying with).
2. Cloudflare → **Workers & Pages** → `davao-digital` → **Settings** →
   **Domains & Routes** → **Add** → **Custom domain** → `davaodigital.com`.
3. Repeat for `www.davaodigital.com`.
4. Cloudflare creates the DNS records and the TLS certificate itself.

Until then, the `*.workers.dev` URL is a perfectly good staging link — but put
`noindex` on it or keep it out of your marketing, because a search engine that
finds both URLs sees duplicate content.

### Then, in Resend

**Domains → Add domain → `davaodigital.com`**, add the DKIM/SPF records it shows
you to Cloudflare DNS, and wait for "Verified". That is what unlocks visitor
confirmation emails and better inbox placement.

---

## Part 4 — Launch checklist

- [ ] `bun run build` passes locally and Cloudflare's build goes green
- [ ] All five pages load over HTTPS: `/`, `/privacy.html`, `/terms.html`,
      `/thanks.html`, `/404.html`
- [ ] A nonsense URL like `/nope` shows the branded 404 page
- [ ] Enquiry form tested end to end (see 2.3)
- [ ] `davaodigital.com` bought, connected, and verified in Resend
- [ ] GA4 Measurement ID pasted into `index.html` (`var GA_ID = "G-XXXXXXXXXX"`)
- [ ] Google Search Console: verify the domain, submit `/sitemap.xml`
- [ ] Google Business Profile: create it, add the website URL
- [ ] Real reviews and case studies replace the bracketed placeholders
      (see MISSING-INFO.md §5) — do this **before** advertising
- [ ] Privacy policy and terms read by a lawyer
- [ ] Open the real domain on a real phone

---

## Troubleshooting

**The build fails on `bun install` / lockfile**
A `bun.lock` was committed that the builder's Bun cannot parse. Delete it, commit,
push. Do not "fix" it by pinning an older Bun.

**`tsc: not found`**
`NODE_ENV=production` is set as a build variable, so devDependencies were skipped.
Delete the variable.

**The build goes green but the site is unstyled, or `/api/enquiry` 404s**
`wrangler.jsonc` is missing or its `assets.directory` is wrong. It must be
`./dist`, and `main` must be `worker/index.js`.

**The deploy command can't find `wrangler`**
`npx wrangler deploy` is Cloudflare's own default and its build image ships
wrangler. If it ever fails, add `wrangler` to `devDependencies` and change the
deploy command to `bun x wrangler deploy`.

**`POST /api/enquiry` returns 503**
`RESEND_API_KEY` is not set on the Worker. See 2.1. The form is deliberately
falling back to `mailto:` in the meantime, so no lead is lost.

**`POST /api/enquiry` returns 502**
The endpoint is configured but Resend rejected the send. Usually an invalid or
deleted API key — check the Worker's live logs under **Observability**.

**Nothing new appears after a push**
The Git connection (Part 1) is not set up, or it is watching a different branch.
Until it is, use a manual upload for urgent changes.

---

## Manual upload, if you need it right now

```bash
bun run build
npx wrangler deploy
```

That deploys to the existing `davao-digital` Worker using `wrangler.jsonc`. The
first run opens a browser to log in to Cloudflare. It is a fine stop-gap, but
the Git connection is what you actually want.
