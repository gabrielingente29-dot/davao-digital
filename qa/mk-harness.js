/**
 * QA-only harness builder for screenshots.
 *
 * Copies the built index.html and bakes the requested scroll offset into CSS
 * (`#root { margin-top: -Ypx }`) instead of scrolling with JS. That matters
 * because headless Chrome does not advance timers inside a sub-frame, so any
 * setTimeout-based scrolling silently does nothing when the page is rendered
 * inside the mobile iframe wrapper. CSS applies at paint time, so it always works.
 *
 * Usage: bun qa/mk-harness.js --y=8728 [--menu]
 *
 * Writes only into dist/ (_qa.html + mobile-frame.html), which is rebuilt from
 * source — these files can never end up in a deploy.
 */
const fs = require("fs");

const args = process.argv.slice(2);
const y = Number((args.find((a) => a.startsWith("--y=")) || "--y=0").split("=")[1]) || 0;
const menu = args.includes("--menu");

let html = fs.readFileSync("dist/index.html", "utf8");

let extra = "";
if (y > 0) {
  extra += `<style>#root{margin-top:${-y}px}</style>`;
}
if (menu) {
  // No timers: react to the button appearing in the DOM instead.
  extra +=
    `<script>(function(){var mo=new MutationObserver(function(){` +
    `var b=document.querySelector('button[aria-controls="mobile-menu"]');` +
    `if(b){b.click();mo.disconnect();}});` +
    `mo.observe(document.documentElement,{childList:true,subtree:true});})();<\/script>`;
}

html = html.replace("</body>", extra + "\n</body>");
fs.writeFileSync("dist/_qa.html", html);
fs.copyFileSync("qa/mobile-frame.html", "dist/mobile-frame.html");
console.log(`harness ready: y=${y} menu=${menu}`);
