#!/usr/bin/env python3
"""
Generate every brand/favicon/social image from one source logo.

Run only when the logo changes:

    python3 scripts/gen-seo-assets.py

Requires Python 3 + Pillow (`pip install pillow`).

Input : brand/logo-source.png   (square, any size — the master artwork)
Output: public/favicon.ico, public/favicon-16.png, public/favicon-32.png,
        public/apple-touch-icon.png, public/icon-192.png, public/icon-512.png,
        public/logo.png  (512², used as the schema `logo` and in llms.txt),
        public/og.png    (1200×630 social card)
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "brand" / "logo-source.png"
PUBLIC = ROOT / "public"
PUBLIC.mkdir(exist_ok=True)


def sample_background(img: Image.Image) -> tuple[int, int, int]:
    """The logo's own navy, read from a corner so the card matches exactly."""
    px = img.convert("RGB")
    corner = [px.getpixel((2, 2)), px.getpixel((px.width - 3, 2)), px.getpixel((2, px.height - 3))]
    return tuple(sum(channel) // len(corner) for channel in zip(*corner))


def square(size: int) -> Image.Image:
    return logo.resize((size, size), Image.LANCZOS)


logo = Image.open(SOURCE).convert("RGB")
background = sample_background(logo)

# --- icons ---------------------------------------------------------------
square(512).save(PUBLIC / "logo.png", optimize=True)
square(512).save(PUBLIC / "icon-512.png", optimize=True)
square(192).save(PUBLIC / "icon-192.png", optimize=True)
square(180).save(PUBLIC / "apple-touch-icon.png", optimize=True)
square(32).save(PUBLIC / "favicon-32.png", optimize=True)
square(16).save(PUBLIC / "favicon-16.png", optimize=True)

# A single .ico with the classic size ladder, for /favicon.ico requests.
square(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# --- 1200×630 social card ------------------------------------------------
card = Image.new("RGB", (1200, 630), background)
mark = square(470)
card.paste(mark, ((1200 - 470) // 2, (630 - 470) // 2))
card.save(PUBLIC / "og.png", optimize=True)

for path in sorted(PUBLIC.glob("*.png")) + [PUBLIC / "favicon.ico"]:
    print(f"{path.relative_to(ROOT)}  {path.stat().st_size / 1024:.1f} kB")
print(f"\nbackground sampled from the logo: #{background[0]:02x}{background[1]:02x}{background[2]:02x}")
