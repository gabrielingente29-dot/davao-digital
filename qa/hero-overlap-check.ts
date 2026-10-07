/**
 * Hero overlap audit.
 *
 * The mockups are absolutely positioned and bleed across the grid gutter on
 * purpose. That is fine — until a bleed reaches far enough to cover an
 * interactive element in the copy column, which is what happened to the
 * "See our work" button.
 *
 * This asserts that no positioned decorative element in the hero overlaps a
 * button/anchor it is not an ancestor of, at every breakpoint, and that the
 * clearances survive the pointer-parallax range (the phone drifts up to
 * +-15px on x).
 *
 * Usage: bun qa/hero-overlap-check.ts
 */

const CHROME = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const PORT = 9337;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const chrome = Bun.spawn(
  [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
   "--no-default-browser-check", `--remote-debugging-port=${PORT}`,
   "--user-data-dir=" + `${process.env.TEMP}/gm-qa-hero`, "about:blank"],
  { stdout: "ignore", stderr: "ignore" },
);

let target: any = null;
for (let i = 0; i < 40 && !target; i++) {
  try {
    const list = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()) as any[];
    target = list.find((t) => t.type === "page");
  } catch {}
  if (!target) await sleep(250);
}

let id = 0;
const pending = new Map<number, (v: any) => void>();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise<void>((r) => (ws.onopen = () => r()));
ws.onmessage = (ev: MessageEvent) => {
  const m = JSON.parse(String(ev.data));
  const d = pending.get(m.id);
  if (d) { pending.delete(m.id); d(m); }
};
const send = (method: string, params: any = {}) => {
  const i = ++id;
  ws.send(JSON.stringify({ id: i, method, params }));
  return new Promise<any>((res) => pending.set(i, res));
};
const ev = async <T,>(expr: string): Promise<T> => {
  const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400));
  return r.result?.result?.value as T;
};

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:4180/" });
await sleep(1500);
await ev(`(() => { try { localStorage.setItem('gm:motion','full') } catch (e) {} return 1 })()`);

const AUDIT = `(() => {
  const hero = document.getElementById('top');
  const px = (v) => Math.round(v * 100) / 100;
  const overlapArea = (a, b) => {
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return w > 0 && h > 0 ? px(w * h) : 0;
  };

  // Interactive targets in the hero that a decorative layer could cover.
  const targets = Array.from(hero.querySelectorAll('a, button')).map((el) => ({
    el,
    label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 26),
    r: el.getBoundingClientRect(),
  })).filter((t) => t.r.width > 0 && t.label);

  // Absolutely positioned layers that actually receive pointer events. Full-bleed
  // background washes are pointer-events:none and cannot cover anything, so they
  // are not part of this audit (they are painted behind the content anyway).
  const decor = Array.from(hero.querySelectorAll('div')).map((el) => ({
    el, r: el.getBoundingClientRect(), cs: getComputedStyle(el),
  })).filter((d) =>
    d.cs.position === 'absolute' &&
    d.cs.pointerEvents !== 'none' &&
    d.r.width > 4 && d.r.height > 4 &&
    // only the mockup column's children, not page-level sections
    d.el.closest('#top') && !d.el.classList.contains('inset-0'),
  );

  const collisions = [];
  for (const d of decor) {
    for (const t of targets) {
      // Skip if the target is inside the decor element (legitimate).
      if (d.el.contains(t.el) || t.el.contains(d.el)) continue;
      const area = overlapArea(d.r, t.r);
      if (area > 4) {
        collisions.push({
          decor: (d.el.className || '').toString().slice(0, 46),
          target: t.label,
          overlapPx2: area,
          overlapW: px(Math.min(d.r.right, t.r.right) - Math.max(d.r.left, t.r.left)),
        });
      }
    }
  }
  collisions.sort((a, b) => b.overlapPx2 - a.overlapPx2);

  const phoneEl = hero.querySelector('[data-slot="phone-mockup"]');
  const phoneRect = phoneEl ? phoneEl.getBoundingClientRect() : null;
  const phoneTransform = phoneEl ? (phoneEl.getAttribute('style') || '') : '';
  // Both hero CTAs, so we can report the tightest clearance to either.
  const ctas = Array.from(hero.querySelectorAll('a')).filter((a) =>
    /Get my free preview|See our work/i.test(a.textContent || ''));
  const ctaRects = ctas.map((a) => ({ label: a.textContent.trim().slice(0, 20), r: a.getBoundingClientRect() }));
  // Tightest horizontal gap to a CTA that the phone vertically overlaps.
  // Framer's render loop overwrites any inline transform we set, and CDP
  // pointermove does not drive the spring, so the pointer-parallax worst case
  // cannot be measured directly. It is known analytically instead:
  //   frontX = sx * 30, and mx/sx are normalised to [-0.5, 0.5]
  // so the phone drifts at most 15px further LEFT than its measured position.
  // Requiring PARALLAX_SLACK + BREATHING of clearance makes that safe.
  const PARALLAX_SLACK = 15;
  const BREATHING = 8;
  const REQUIRED = PARALLAX_SLACK + BREATHING;

  let minGap = null;
  let minGapLabel = null;
  if (phoneRect) {
    for (const t of targets) {
      const vOverlap = Math.min(phoneRect.bottom, t.r.bottom) - Math.max(phoneRect.top, t.r.top);
      if (vOverlap <= 0) continue; // this CTA is on a different row; no conflict
      // POSITIVE = the phone's left edge sits to the right of the CTA's right
      // edge, i.e. clear. NEGATIVE = the phone reaches into the CTA.
      const gap = px(phoneRect.left - t.r.right);
      if (minGap === null || gap < minGap) { minGap = gap; minGapLabel = t.label; }
    }
  }

  return {
    width: innerWidth,
    collisions: collisions.slice(0, 8),
    phone: phoneRect ? { left: px(phoneRect.left), right: px(phoneRect.right), w: px(phoneRect.width), transform: phoneTransform.slice(0, 90) } : null,
    ctas: ctaRects.map((c) => ({ label: c.label, left: px(c.r.left), right: px(c.r.right) })),
    minGap,
    minGapLabel,
    required: REQUIRED,
  };
})()`;

const widths = [1920, 1750, 1600, 1440, 1280, 1100, 1024, 900, 768, 390];
let failures = 0;
const rows: any[] = [];


for (const width of widths) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `http://localhost:4180/?w=${width}&t=${Date.now()}` });
  await sleep(2400);
  await send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: false });
  await sleep(1000);

  // Neutral, then worst-case pointer parallax (mouse pushed to each edge).
  // Neutral, then the worst case for pointer parallax.
  //
  // Synthesising pointermove through CDP turned out not to drive the Framer
  // spring at all (phoneLeft was byte-identical in all three pointer states),
  // so instead of trusting a dead simulation we apply the known worst-case
  // offset directly. frontX = sx * 30 with sx in [-0.5, 0.5], so the phone can
  // drift 15px further left than its base position.

  for (const st of ["neutral"]) {
    const r = await ev<any>(AUDIT);
    const ok = r.collisions.length === 0 && (r.minGap === null || r.minGap >= r.required);
    rows.push({ width, state: st, ...r, ok });
    if (!ok) failures++;
  }
}

let cur = "";
for (const r of rows) {
  if (r.width !== cur) { cur = r.width; console.log(`\n--- ${r.width}px ---`); }
  const c = r.collisions[0];
  const px2 = r.phone ? r.phone.left : "-";
  const gap = r.minGap === null ? "n/a" : `${r.minGap}px`;
  const need = r.minGap === null ? "" : ` (need >=${r.required})`;
  console.log(
    `  ${r.state.padEnd(8)} collisions=${String(r.collisions.length).padEnd(2)} phoneLeft=${String(px2).padStart(8)}` +
      ` gap-to-CTA=${gap.padStart(9)}${need.padEnd(16)} ${c ? `OVERLAP "${c.target}" w=${c.overlapW}` : ""} ${r.ok ? "OK" : "*** FAIL ***"}`,
  );
}
console.log(`\n${failures === 0 ? "ALL CLEAN" : `${failures} state(s) with collisions`}`);
ws.close();
chrome.kill();
process.exit(failures === 0 ? 0 : 1);
