/**
 * Real-browser QA via the Chrome DevTools Protocol.
 *
 * Why this exists: measuring a block-level element with getBoundingClientRect()
 * returns the *block box* width, not the width of the text inside it. That made
 * an overflowing price look like it "fit with 34px of slack". This harness
 * measures text with Range.getBoundingClientRect() (the real ink box) inside a
 * real font-rendering, real-viewport context, and additionally walks every
 * descendant of a container looking for boxes that escape their parent's
 * padding box — which is what clipping actually looks like.
 *
 * Usage: bun qa/measure.ts [--url http://localhost:4180/] [--motion full|reduced|system]
 */

const CHROME = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const PORT = 9333;

type Size = { width: number; height: number };

const argv = process.argv.slice(2);
const arg = (name: string, fallback: string) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const URL_UNDER_TEST = arg("url", "http://localhost:4180/");
const MOTION = arg("motion", "");
const PRICING_MODE = arg("pricing", "build");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  return Bun.spawn(
    [
      CHROME,
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${PORT}`,
      "--user-data-dir=" + `${process.env.TEMP}/gm-qa-profile`,
      "about:blank",
    ],
    { stdout: "ignore", stderr: "ignore" },
  );
}

/** Minimal CDP client over Bun's built-in WebSocket. */
class Cdp {
  private ws!: WebSocket
  private id = 0
  private pending = new Map<number, (v: any) => void>()

  static async connect(url: string) {
    const c = new Cdp()
    c.ws = new WebSocket(url)
    await new Promise<void>((res, rej) => {
      c.ws.onopen = () => res()
      c.ws.onerror = (e) => rej(new Error(`ws error: ${e}`))
    })
    c.ws.onmessage = (ev: MessageEvent) => {
      const msg = JSON.parse(String(ev.data))
      const done = c.pending.get(msg.id)
      if (done) {
        c.pending.delete(msg.id)
        done(msg)
      }
    }
    return c
  }

  send(method: string, params: any = {}) {
    const id = ++this.id
    this.ws.send(JSON.stringify({ id, method, params }))
    return new Promise<any>((res) => this.pending.set(id, res))
  }

  async eval<T>(expression: string): Promise<T> {
    const r = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails))
    return r.result?.result?.value as T
  }

  close() {
    this.ws.close()
  }
}

/** Runs inside the page. Reports real ink widths and real escapees. */
const AUDIT = String.raw`
(async () => {
  if (document.fonts) {
    await document.fonts.ready;
    try { await document.fonts.load('600 40px "Clash Display"'); } catch {}
  }

  const px = (v) => Math.round(v * 100) / 100;
  const ink = (el) => { const r = document.createRange(); r.selectNodeContents(el); return px(r.getBoundingClientRect().width); };
  const clip = (s) => (s || '').toString().slice(0, 70);
  const isSrOnly = (el) => { for (let n = el; n && n !== document.body; n = n.parentElement) { if (n.classList && n.classList.contains('sr-only')) return true; } return false; };

  const out = {
    viewport: [innerWidth, innerHeight],
    doc: { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth },
    font: (() => { const p = document.createElement('span'); p.style.cssText='position:absolute;visibility:hidden;font-family:var(--font-display);font-size:100px'; p.textContent='P'; document.body.appendChild(p); const f = getComputedStyle(p).fontFamily; p.remove(); return { stack: f, loaded: document.fonts ? document.fonts.check('600 40px "Clash Display"') : null }; })(),
    cards: [],
  };

  // ---- 1. text ink wider than its own content box, anywhere on the page ----
  const textOverflow = [];
  document.querySelectorAll('p,h1,h2,h3,h4,span,li,div,a,button,strong,em').forEach((el) => {
    const hasOwnText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!hasOwnText) return;
    if (isSrOnly(el)) return;
    const cs = getComputedStyle(el);
    if (cs.position === 'absolute' && cs.overflow === 'visible') return;
    // Must use getBoundingClientRect, not clientWidth: elements are
    // scale-transformed (CardItem translateZ, FitScale's mock-page canvas) while
    // computed padding stays layout-only. Scale the padding to match.
    const er = el.getBoundingClientRect();
    const scale = el.offsetWidth ? er.width / el.offsetWidth : 1;
    const avail = er.width - (parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)) * scale;
    if (avail <= 0) return;
    const w = ink(el);
    if (w > avail + 1) {
      textOverflow.push({ tag: el.tagName.toLowerCase(), cls: clip(el.className), avail: px(avail), inkW: w, over: px(w - avail), text: (el.textContent||'').trim().slice(0,34), whiteSpace: cs.whiteSpace });
    }
  });
  out.textOverflow = textOverflow.slice(0, 30);

  // ---- 2. descendants escaping a pricing card's padding box (the real clip) ----
  const pricing = document.getElementById('pricing');
  if (pricing) {
    const articles = Array.from(pricing.querySelectorAll('article'));
    const labels = [];
    articles.forEach((card, i) => {
      const cs = getComputedStyle(card);
      const padL = parseFloat(cs.paddingLeft), padR = parseFloat(cs.paddingRight), padT = parseFloat(cs.paddingTop);
      const box = card.getBoundingClientRect();
      const right = box.right - padR, left = box.left + padL;
      const escapees = [];
      card.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) return;
        // Decorative bars that deliberately run edge-to-edge are not clipping.
        if (el.classList.contains('pointer-events-none') && getComputedStyle(el).position === 'absolute') return;
        const overR = px(r.right - right), overL = px(left - r.left);
        if (overR > 1 || overL > 1) {
          const ecs = getComputedStyle(el);
          escapees.push({ tag: el.tagName.toLowerCase(), cls: clip(el.className), overRight: overR, overLeft: overL, text: (el.textContent||'').trim().slice(0,28), pos: ecs.position, tr: clip(ecs.transform === 'none' ? '' : ecs.transform) });
        }
      });
      // price block geometry
      const bigPrice = card.querySelector('p.tnum');
      const tagline = card.querySelector('h3 + p');
      const tl = tagline ? tagline.getBoundingClientRect() : null;
      out.cards.push({
        i,
        cardW: px(box.width),
        inner: px(box.width - padL - padR),
        name: card.querySelector('h3')?.textContent?.trim(),
        badge: card.querySelector('[class*="uppercase"]')?.textContent?.trim() || null,
        badgeW: px(card.querySelector('[class*="uppercase"]')?.getBoundingClientRect().width || 0),
        escapees,
        price: bigPrice ? { text: bigPrice.textContent.trim(), fontSize: getComputedStyle(bigPrice).fontSize, inkW: ink(bigPrice), boxW: px(bigPrice.getBoundingClientRect().width), wrapLines: Math.round(bigPrice.getBoundingClientRect().height / parseFloat(getComputedStyle(bigPrice).lineHeight || 1)) } : null,
        priceTopY: bigPrice ? px(bigPrice.getBoundingClientRect().top - box.top) : null,
        taglineLines: tl ? Math.round(tl.height / parseFloat(getComputedStyle(tagline).lineHeight || 1)) : null,
        taglineH: tl ? px(tl.height) : null,
      });
      labels.push(bigPrice ? px(bigPrice.getBoundingClientRect().top) : null);
    });
    out.priceRowsAligned = new Set(labels.map((v) => Math.round((v ?? 0) / 2))).size === 1;
    out.priceRowTops = labels;
  }

  // ---- 3. nav must not overflow after adding the motion toggle ----
  const navEl = document.querySelector('header nav');
  if (navEl) {
    const nr = navEl.getBoundingClientRect();
    const ncs = getComputedStyle(navEl);
    const navAvail = nr.width - (parseFloat(ncs.paddingLeft) + parseFloat(ncs.paddingRight));
    const kids = Array.from(navEl.children).map((k) => {
      const kr = k.getBoundingClientRect();
      return { tag: k.tagName.toLowerCase(), w: px(kr.width), right: px(kr.right - nr.right + parseFloat(ncs.paddingRight)) };
    });
    out.nav = {
      width: px(nr.width), avail: px(navAvail), scrollW: navEl.scrollWidth, clientW: navEl.clientWidth,
      overflows: navEl.scrollWidth > navEl.clientWidth + 1,
      togglePresent: !!navEl.querySelector('button[aria-label*="nimations"]'),
      children: kids,
      anyChildPastRight: kids.some((k) => k.right > 1),
    };
  }

  // ---- 4. motion / cursor ----
  const html = document.documentElement;
  out.motion = {
    storedPref: (() => { try { return localStorage.getItem('gm:motion'); } catch { return null } })(),
    osReduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
    dataMotion: html.dataset.motion || null,
    cursorNoneClass: html.classList.contains('gm-custom-cursor'),
    cursorLayer: !!document.querySelector('div.fixed.inset-0.z-\\[100\\]'),
    lenis: html.classList.contains('lenis-active'),
    // a section that should have animated in
    heroH1Opacity: getComputedStyle(document.querySelector('#top h1') || document.body).opacity,
  };
  return out;
})()
`

async function runAt(cdp: Cdp, size: Size) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: size.width,
    height: size.height,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await cdp.send("Page.navigate", { url: `${URL_UNDER_TEST}#pricing` })
  await sleep(2600)
  if (PRICING_MODE === "year") {
    // Flip the real pricing toggle so the longest amount strings get measured
    // (year mode is "₱111,000 / up to ₱121,000" — 33% longer than build mode).
    // Retry until it actually flips, otherwise a slow hydration silently drops
    // the click and we'd measure build mode while believing we measured year.
    for (let attempt = 0; attempt < 12; attempt++) {
      const flipped = await cdp.eval<boolean>(`(() => {
        const btns = Array.from(document.querySelectorAll('[aria-label*="first-year total"] button'));
        const target = btns.find((b) => b.getAttribute('aria-pressed') === 'false');
        if (!target) return false;
        target.click();
        return true;
      })()`)
      if (flipped) {
        await sleep(500)
        const nowYear = await cdp.eval<boolean>(
          `(() => { const p = document.querySelector('#pricing p.tnum'); return !!p && /\\u20b1(70|111|150),000/.test(p.textContent) })()`,
        )
        if (nowYear) break
      }
      await sleep(600)
    }
  }
  await cdp.eval(
    `(() => { const el = document.getElementById('pricing'); if (el) el.scrollIntoView({block:'start'}); return true })()`,
  )
  await sleep(1400)
  return cdp.eval(AUDIT)
}

const chrome = await launch()
let target: any = null
for (let i = 0; i < 40 && !target; i++) {
  try {
    const list = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()) as any[]
    target = list.find((t) => t.type === "page")
  } catch {}
  if (!target) await sleep(250)
}
if (!target) {
  console.error("could not reach Chrome DevTools")
  chrome.kill()
  process.exit(1)
}

const cdp = await Cdp.connect(target.webSocketDebuggerUrl)
await cdp.send("Page.enable")
await cdp.send("Runtime.enable")

/** Hard-reload so the inline <head> script re-runs with the stored preference. */
async function reload() {
  await cdp.send("Page.navigate", { url: `${URL_UNDER_TEST}?qa=1` })
  await sleep(2000)
}

if (MOTION === "click") {
  // Exercise the real UI: click the actual nav toggle a visitor would click.
  await reload()
  const clicked = await cdp.eval<string>(`(() => {
    const btn = document.querySelector('button[aria-label*="animations"], button[aria-label*="Animations"]');
    if (!btn) return 'no-button';
    btn.click();
    return btn.getAttribute('aria-label');
  })()`)
  console.error(`[qa] clicked motion toggle: ${clicked}`)
  await sleep(1500)
} else if (MOTION) {
  await reload()
  await cdp.eval(`(() => { try { localStorage.setItem('gm:motion', ${JSON.stringify(MOTION)}); } catch (e) {} return true })()`)
  await reload()
}

const sizes: Size[] = [
  { width: 1920, height: 1080 },
  { width: 1600, height: 900 },
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
]

const all: any = {}
for (const size of sizes) {
  try {
    all[`${size.width}x${size.height}`] = await runAt(cdp, size)
  } catch (e) {
    all[`${size.width}x${size.height}`] = { error: String(e) }
  }
}

console.log(JSON.stringify(all, null, 2))
cdp.close()
chrome.kill()
process.exit(0)
