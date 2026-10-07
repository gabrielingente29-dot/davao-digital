/**
 * Asserts the native cursor is never suppressed where the custom cursor isn't
 * actually rendered: below `lg` the layer is `hidden`, so `cursor: none` must
 * not be applied, or the visitor gets no cursor at all.
 */
const CHROME = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const PORT = 9336;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const chrome = Bun.spawn(
  [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
   "--no-default-browser-check", `--remote-debugging-port=${PORT}`,
   "--user-data-dir=" + `${process.env.TEMP}/gm-qa-cursor`, "about:blank"],
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
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 300));
  return r.result?.result?.value as T;
};

await send("Page.enable");
await send("Runtime.enable");
// Motion on, so the custom cursor layer mounts.
await send("Page.navigate", { url: "http://localhost:4180/" });
await sleep(1500);
await ev(`(() => { try { localStorage.setItem('gm:motion', 'full') } catch (e) {} return 1 })()`);

const PROBE = `(() => {
  const html = document.documentElement;
  const layer = document.querySelector('[data-slot="cursor"]');
  const probe = document.createElement('div');
  document.body.appendChild(probe);
  const bodyCursor = getComputedStyle(document.body).cursor;
  const probeCursor = getComputedStyle(probe).cursor;
  probe.remove();
  return {
    width: innerWidth,
    classApplied: html.classList.contains('gm-custom-cursor'),
    layerMounted: !!layer,
    layerDisplay: layer ? getComputedStyle(layer).display : null,
    bodyCursor,
    probeCursor,
    finePointer: matchMedia('(hover: hover) and (pointer: fine)').matches,
  };
})()`;

const results = [];
for (const width of [1440, 1024, 1023, 900, 768, 390]) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(400);
  // Fresh load per width so the CSS media query re-evaluates cleanly.
  await send("Page.navigate", { url: `http://localhost:4180/?w=${width}&t=${Date.now()}` });
  await sleep(2600);
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: false });
  await sleep(900);
  const r = await ev<any>(PROBE);
  const layerVisible = r.layerDisplay !== "none";
  const nativeHidden = r.probeCursor === "none";
  // The invariant: native cursor is suppressed ONLY when the custom one is visible.
  const pass = nativeHidden === layerVisible;
  results.push({ ...r, layerVisible, nativeHidden, pass });
}

console.log(
  ["width", "classApplied", "layerMounted", "layerDisplay", "bodyCursor", "finePointer", "nativeHidden", "PASS"].join(" | "),
);
for (const r of results) {
  console.log(
    [r.width, r.classApplied, r.layerMounted, r.layerDisplay, r.bodyCursor, r.finePointer, r.nativeHidden, r.pass ? "OK" : "FAIL"].join(" | "),
  );
}
const failed = results.filter((r) => !r.pass);
console.log(`\n${failed.length === 0 ? "ALL PASS" : `${failed.length} FAILED`} — invariant: native cursor hidden iff custom cursor visible`);
ws.close();
chrome.kill();
process.exit(failed.length === 0 ? 0 : 1);
