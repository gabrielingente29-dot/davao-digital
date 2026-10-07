/** Confirms both motion controls exist, and that the footer switch works too. */
const CHROME = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const PORT = 9335;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const chrome = Bun.spawn(
  [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
   "--no-default-browser-check", `--remote-debugging-port=${PORT}`,
   "--user-data-dir=" + `${process.env.TEMP}/gm-qa-ctl`, "about:blank"],
  { stdout: "ignore", stderr: "ignore" },
);

let ws: WebSocket;
let id = 0;
const pending = new Map<number, (v: any) => void>();
let target: any = null;
for (let i = 0; i < 40 && !target; i++) {
  try {
    const list = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()) as any[];
    target = list.find((t) => t.type === "page");
  } catch {}
  if (!target) await sleep(250);
}
ws = new WebSocket(target.webSocketDebuggerUrl);
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
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 300));
  return r.result?.result?.value as T;
};

await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url: "http://localhost:4180/" });
await sleep(1500);
await ev(`(() => { try { localStorage.removeItem('gm:motion') } catch (e) {} return 1 })()`);
await send("Page.navigate", { url: `http://localhost:4180/?c=${Date.now()}` });
await sleep(3000);
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await sleep(800);

const INSPECT = `(() => {
  const html = document.documentElement;
  const navBtn = document.querySelector('header nav button[aria-label*="nimations"]');
  const footerSw = document.querySelector('footer [role="switch"]');
  return {
    dataMotion: html.dataset.motion,
    stored: (() => { try { return localStorage.getItem('gm:motion') } catch { return null } })(),
    navBtn: navBtn ? { label: navBtn.getAttribute('aria-label'), pressed: navBtn.getAttribute('aria-pressed') } : null,
    footerSw: footerSw ? { checked: footerSw.getAttribute('aria-checked'), text: footerSw.textContent.trim() } : null,
    cursorMounted: !!document.querySelector('[data-slot="cursor"]'),
    lenis: html.classList.contains('lenis-active'),
  };
})()`;

const initial = await ev<any>(INSPECT);
// Click the FOOTER switch this time.
const clicked = await ev<string>(`(() => { const s = document.querySelector('footer [role="switch"]'); if (!s) return 'MISSING'; s.click(); return 'clicked' })()`);
await sleep(1500);
const afterFooter = await ev<any>(INSPECT);
// And back again via the footer switch.
await ev(`(() => { document.querySelector('footer [role="switch"]').click(); return 1 })()`);
await sleep(1500);
const afterSecond = await ev<any>(INSPECT);

console.log(JSON.stringify({ clicked, initial, afterFooter, afterSecond }, null, 2));
ws.close();
chrome.kill();
process.exit(0);
