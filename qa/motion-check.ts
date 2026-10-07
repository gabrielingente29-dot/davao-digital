/**
 * Behavioural motion check.
 *
 * Class snapshots are ambiguous (Lenis leaves its `lenis` class behind on
 * destroy), so this measures what the visitor actually perceives:
 *   1. state probe (data-motion, cursor, Lenis classes) before and after the
 *      real nav toggle is clicked
 *   2. a wheel-scroll test — samples scrollY after each wheel event. Lenis
 *      eases over many frames; native scrolling jumps in one step. The frame
 *      count is the verdict.
 *   3. whether the custom cursor dot/ring is actually painted after a move
 *
 * Usage: bun qa/motion-check.ts [--pref full|reduced|system] [--click]
 */

const CHROME = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const PORT = 9334;

const argv = process.argv.slice(2);
const arg = (n: string, d: string) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};
const PREF = arg("pref", "full");
const URL_UNDER_TEST = arg("url", "http://localhost:4180/");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const chrome = Bun.spawn(
  [
    CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    "--no-default-browser-check", `--remote-debugging-port=${PORT}`,
    "--user-data-dir=" + `${process.env.TEMP}/gm-qa-motion`, "about:blank",
  ],
  { stdout: "ignore", stderr: "ignore" },
);

class Cdp {
  private ws!: WebSocket;
  private id = 0;
  private pending = new Map<number, (v: any) => void>();
  static async connect(url: string) {
    const c = new Cdp();
    c.ws = new WebSocket(url);
    await new Promise<void>((res, rej) => {
      c.ws.onopen = () => res();
      c.ws.onerror = (e) => rej(e);
    });
    c.ws.onmessage = (ev: MessageEvent) => {
      const m = JSON.parse(String(ev.data));
      const d = c.pending.get(m.id);
      if (d) { c.pending.delete(m.id); d(m); }
    };
    return c;
  }
  send(method: string, params: any = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise<any>((res) => this.pending.set(id, res));
  }
  async eval<T>(expression: string): Promise<T> {
    const r = await this.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
    return r.result?.result?.value as T;
  }
}

let target: any = null;
for (let i = 0; i < 40 && !target; i++) {
  try {
    const list = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()) as any[];
    target = list.find((t) => t.type === "page");
  } catch {}
  if (!target) await sleep(250);
}
if (!target) { console.error("no chrome"); chrome.kill(); process.exit(1); }

const cdp = await Cdp.connect(target.webSocketDebuggerUrl);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");

await cdp.send("Page.navigate", { url: URL_UNDER_TEST });
await sleep(1800);
// "system" means no stored override at all — the accessible default.
await cdp.eval(
  PREF === "system"
    ? `(() => { try { localStorage.removeItem('gm:motion') } catch (e) {} return 1 })()`
    : `(() => { try { localStorage.setItem('gm:motion', ${JSON.stringify(PREF)}) } catch (e) {} return 1 })()`,
);
await cdp.send("Page.navigate", { url: `${URL_UNDER_TEST}?m=${Date.now()}` });
await sleep(2600);
await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1600, height: 900, deviceScaleFactor: 1, mobile: false });
await sleep(1000);

const PROBE = String.raw`
(() => {
  const html = document.documentElement;
  const cursorRoot = document.querySelector('[data-slot="cursor"]');
  const dot = cursorRoot && cursorRoot.children[0];
  const ring = cursorRoot && cursorRoot.children[1];
  const cs = (e) => (e ? getComputedStyle(e) : null);
  return {
    dataMotion: html.dataset.motion,
    htmlClass: html.className,
    stored: (() => { try { return localStorage.getItem('gm:motion') } catch { return null } })(),
    osReduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
    cursorMounted: !!cursorRoot,
    cursorDisplay: cursorRoot ? cs(cursorRoot).display : null,
    cursorNoneClass: html.classList.contains('gm-custom-cursor'),
    dotTransform: dot ? dot.style.transform : null,
    dotOpacity: dot ? cs(dot).opacity : null,
    ringTransform: ring ? ring.style.transform : null,
    ringSize: ring ? cs(ring).width + 'x' + cs(ring).height : null,
    // reveal wrappers: inline style present only when the motion branch rendered
    revealStyled: document.querySelectorAll('#pricing [style*="transform"], #pricing [style*="opacity"]').length,
    revealSample: Array.from(document.querySelectorAll('#pricing [style*="transform"]')).slice(0,2).map((e) => (e.getAttribute('style')||'').slice(0,80)),
  };
})()
`;

/** Wheel down, then sample scrollY every frame to see if it eases or jumps. */
async function scrollSmoothness() {
  await cdp.eval(`(() => { window.scrollTo(0, 1200); return 1 })()`);
  await sleep(700);
  await cdp.eval(`(() => { window.__samples = []; const tick = () => { window.__samples.push(Math.round(window.scrollY)); if (window.__samples.length < 90) requestAnimationFrame(tick) }; requestAnimationFrame(tick); return 1 })()`);
  await sleep(150);
  for (let i = 0; i < 6; i++) {
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 800, y: 450, deltaX: 0, deltaY: 120 });
    await sleep(60);
  }
  await sleep(1800);
  const samples = await cdp.eval<number[]>(`(() => window.__samples)()`);
  let moved = 0;
  for (let i = 1; i < samples.length; i++) if (samples[i] !== samples[i - 1]) moved++;
  return { total: samples.length, distinctPositions: moved, start: samples[0], end: samples[samples.length - 1] };
}

async function movePointer() {
  for (let i = 0; i < 8; i++) {
    await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 400 + i * 40, y: 400 + i * 10, buttons: 0 });
    await sleep(70);
  }
  await sleep(600);
}

const before = await cdp.eval<any>(PROBE);
await movePointer();
const afterMove = await cdp.eval<any>(PROBE);
const scrollBeforeClick = await scrollSmoothness();

let clicked: any = null;
let afterClick: any = null;
let scrollAfterClick: any = null;
if (argv.includes("--click")) {
  clicked = await cdp.eval<any>(`(() => {
    const btn = document.querySelector('button[aria-label*="nimations"]');
    if (!btn) return 'NO-BUTTON';
    const label = btn.getAttribute('aria-label');
    btn.click();
    return label;
  })()`);
  await sleep(1800);
  await movePointer();
  afterClick = await cdp.eval<any>(PROBE);
  scrollAfterClick = await scrollSmoothness();
}

console.log(JSON.stringify({ pref: PREF, clicked, before, afterMove, scrollBeforeClick, afterClick, scrollAfterClick }, null, 2));
cdp.ws?.close?.();
chrome.kill();
process.exit(0);
