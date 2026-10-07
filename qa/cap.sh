#!/bin/bash
# Desktop QA captures. Run `bun run build` first; the harness bakes the scroll
# offset into dist/_qa.html (CSS, not JS, so it works in headless Chrome).
# Usage: bash qa/cap.sh
CHROME="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
OUT="$(pwd -W)/qa/shots"
mkdir -p "$OUT"

shoot () {
  local name="$1" y="$2" w="$3" h="$4"
  bun qa/mk-harness.js --y="$y" >/dev/null
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --force-prefers-reduced-motion --window-size="$w,$h" --virtual-time-budget=9000 \
    --screenshot="$OUT/$name" "http://localhost:4180/_qa.html" 2>&1 | tail -1
}

# Offsets measured at a 1440px viewport: pricing 5973, care plan 7420, work 8056
shoot d-hero.png      0     1440 850
shoot d-pricing.png   6000  1440 850
shoot d-careplan.png  7350  1440 850
shoot d-work.png      8060  1440 850
