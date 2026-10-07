# Getting Davao Digital live on GitHub + Cloudflare Pages

This project is a **static site**. `bun run build` produces a plain `dist/` folder
of HTML, CSS, JS and images — no server, no database, nothing to keep running.
That makes hosting trivial and free.

Two parts: put the code on GitHub, then let Cloudflare build and serve it.

Everything below assumes you are in the project folder:

```bash
cd "/c/Users/gabmig/Videos/Captures/Documents/gm-web-solutions"
```

---

## Part 0 — Check it builds locally first

Never push code you have not built. Run:

```bash
bun install
bun run typecheck     # TypeScript check, must be silent
bun run build         # writes dist/
bun run preview       # serves the built site to check it
```

If `bun run build` fails with `EPERM ... dist/og.png`, that is a Windows
read-only-file quirk on this machine, not a code problem:

```bash
cmd //c "attrib -r dist\og.png"
bun run build
```

That issue does **not** exist on Cloudflare's Linux builders.

---

## Part 1 — GitHub

### 1.1 Turn the folder into a repository

```bash
git init -b main
git add .
git commit -m "Davao Digital marketing site"
```

`.gitignore` is already set up, so `node_modules/`, `dist/`, screenshots and logs
stay out of the repo. Verify what is about to be committed:

```bash
git status --short          # should be a clean tree after the commit
git ls-files | wc -l        # count tracked files — should be source only
```

> ⚠️ The unrelated file `hd-rubber-backup-inlined.html` sits in the **parent**
> `Documents` folder, not in this project, so it will not be committed. Leave it
> out of the repository — it belongs to a different project.

### 1.2 Create the repo on GitHub

**Option A — in the browser**

1. Go to <https://github.com/new>.
2. Repository name: `davao-digital`. Private is fine.
3. **Do not** tick "Add a README", "Add .gitignore" or "Choose a license" — you
   already have those locally and the extra commit will conflict.
4. Click **Create repository**, then run the two commands it shows you:

```bash
git remote add origin https://github.com/YOUR-USERNAME/davao-digital.git
git push -u origin main
```

**Option B — with the GitHub CLI** (if you have `gh` installed)

```bash
gh repo create davao-digital --private --source=. --push
```

### 1.3 From now on

```bash
git add .
git commit -m "what changed"
git push
```

Every push to `main` automatically triggers a new Cloudflare deployment once
Part 2 is done.

---

## Part 2 — Cloudflare Pages

Cloudflare Pages is free for this (unlimited static requests, unlimited
bandwidth), gives you HTTPS automatically, a global CDN, and a preview URL for
every branch. Its builders already include **Bun 1.2.15** and **Node 22**, so it
can run this project's exact toolchain.

### 2.1 Create the project

1. Sign up / log in at <https://dash.cloudflare.com>.
2. Left sidebar → **Workers & Pages** → **Create** → **Pages** tab →
   **Connect to Git**.
3. Authorise GitHub and pick the `davao-digital` repository.
4. On the build-settings screen, enter exactly this:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | **None** (or **Vite** — either works) |
| Build command | `bun install && bun run build` |
| Build output directory | `dist` |
| Root directory | *(leave empty — the repo root **is** the project)* |
| Environment variables | *(none required)* |

Notes:

- You must type the build command yourself if the preset fills in `npm run build`
  — this project uses Bun because that is what generated `bun.lock`. npm would
  work too, but there is no `package-lock.json`, so installs would not be
  reproducible.
- **Do not set `NODE_ENV=production`.** If that variable is present, package
  managers skip `devDependencies`, `typescript` never gets installed, and the
  build dies with `tsc: not found`. See Troubleshooting.
- Optional: add `BUN_VERSION` = `1.2.15` to pin the Bun version.

5. **Save and Deploy.** The first build takes 1–2 minutes.

### 2.2 Check the result

You will get a URL like `https://davao-digital.pages.dev`. Check all four pages:

- `/` — the landing page
- `/privacy.html`
- `/thanks.html`
- `/404.html` and also a nonsense URL like `/nope` (must show the 404 design —
  Cloudflare serves the root `404.html` automatically)

Then open the browser console: there should be **zero** errors.

---

## Part 3 — Point davaodigital.ph at it

### If the domain is already on Cloudflare

**Workers & Pages** → your project → **Custom domains** → **Set up a domain** →
enter `davaodigital.ph`, repeat for `www.davaodigital.ph`. Cloudflare creates the
DNS records and the SSL certificate itself.

### If the domain is registered somewhere else

1. In Cloudflare: **Add a site** → enter `davaodigital.ph` → choose the Free plan.
2. Cloudflare gives you two nameservers.
3. At your registrar (GoDaddy, Namecheap, etc.), replace the nameservers with
   those two. Propagation is usually minutes, up to 24 hours.
4. Then add the custom domains as above.

Keep the `*.pages.dev` URL — it stays useful as a staging link before you point
the real domain over.

### Then swap the placeholder domain in the code

Everything shipped assumes `https://davaodigital.ph`. If the real domain differs,
update it in exactly these places:

| File | What to change |
|---|---|
| `index.html` | canonical link, `og:url`, `og:image`, `twitter:image`, `@id`/`url` in JSON-LD |
| `public/robots.txt` | the `Sitemap:` line |
| `public/sitemap.xml` | both `<loc>` entries and `<lastmod>` |

Then commit and push — Cloudflare redeploys automatically.

---

## Part 4 — Post-deploy checklist

- [ ] All four pages load on the live domain over HTTPS
- [ ] A nonsense URL shows the custom 404 page
- [ ] Domain swapped in `index.html`, `robots.txt`, `sitemap.xml`
- [ ] GA4 Measurement ID pasted in `index.html` (`var GA_ID = "G-XXXXXXXXXX"`)
      — then add a cookie notice, which GA4 legally requires in the Philippines
- [ ] Google Search Console: verify the domain, submit `sitemap.xml`
- [ ] Google Business Profile: add the website URL
- [ ] Test the enquiry form end to end (see "The form" below)
- [ ] Send yourself the link and open it on a real phone

### The form

The enquiry form currently has **no backend** — it opens the visitor's own mail
app. It works for some people and silently fails for anyone whose phone has no
mail client configured, and you get no record of either case. Fix this before you
spend money driving traffic to the page. Options, cheapest first:

- **Cloudflare Pages Functions** — you are already on Cloudflare, so you can add
  a `/functions/api/enquiry.js` endpoint that emails or forwards the lead. No
  third party, no extra account.
- **Web3Forms / Formspree** — swap the form `action` for their endpoint, 5-minute
  setup, free tiers are plenty at this size.

Whatever you choose, the form should end by sending the visitor to
`/thanks.html` so the conversion is trackable.

---

## Troubleshooting

**`tsc: not found` / `error TS: Cannot find module 'typescript'`**
The builder skipped devDependencies, almost always because `NODE_ENV=production`
is set as a build variable. Delete that variable
(Settings → Environment variables) and redeploy. As a belt-and-braces fix you can
change the build command to `bun install --frozen-lockfile && bun run build`.

**Build succeeds but the site is unstyled / assets 404**
The output directory is wrong. It must be `dist`, not `build` or `.`.

**`bun install` hangs or crashes**
Pin the version: add `BUN_VERSION` = `1.2.15` as an environment variable and
redeploy.

**Nothing new appears after a push**
Check the deployment list for a failed build, and confirm Cloudflare is watching
the branch you pushed to (`main`).

**Canonical tags still point at the wrong domain**
They are hard-coded in `index.html` — no environment variable is used. See Part 3.

---

## Alternative: deploy straight from your machine

If you would rather not connect GitHub yet, you can upload the built folder
directly with Wrangler (Bun can run it, no separate npm install):

```bash
bun run build
bun x wrangler pages deploy dist --project-name=davao-digital
```

The first run opens a browser to log in to Cloudflare. This is handy for a
one-off preview, but you lose automatic deploys on push, so use the Git
connection for the real thing.
