#!/bin/bash
# Mobile QA captures at a true 390x844 viewport (via dist/mobile-frame.html).
# Usage: bash qa/cap-mobile.sh
CHROME="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
OUT="$(pwd -W)/qa/shots"
mkdir -p "$OUT"

shoot () {
  local name="$1" y="$2" flags="$3"
  bun qa/mk-harness.js --y="$y" $flags >/dev/null
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --force-prefers-reduced-motion --window-size=400,860 --virtual-time-budget=9000 \
    --screenshot="$OUT/$name" "http://localhost:4180/mobile-frame.html" 2>&1 | tail -1
}

shoot mb1-hero.png         0     ""
shoot mb2-compare.png      2026  ""
shoot mb3-pricing.png      8728  ""
shoot mb4-careplan.png     11936 ""
shoot mb5-testimonials.png 16470 ""
shoot mb6-form.png         19589 ""
shoot mb7-menu.png         0     "--menu"
