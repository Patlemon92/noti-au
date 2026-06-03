#!/usr/bin/env python3
"""Generate the Acupressure Atlas PWA icon set.

Apothecary palette, drawn as a concentric "pressure-point" motif:
an outer jade ring, a thin gold ring, a cinnabar ring and a cinnabar
centre dot with a small paper depression. Rendered at 4x and downsampled
for crisp edges. Run:  python3 generate.py
"""
from PIL import Image, ImageDraw

PAPER    = (244, 236, 224, 255)
JADE     = (63, 107, 84, 255)
GOLD     = (176, 132, 54, 255)
CINNABAR = (168, 57, 42, 255)

SS = 4  # supersample factor


def ring(d, cx, cy, r, width, color):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=int(round(width)))


def dot(d, cx, cy, r, color):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)


def make(size, motif=0.42, bg=PAPER):
    S = size * SS
    img = Image.new("RGBA", (S, S), bg)
    d = ImageDraw.Draw(img)
    cx = cy = S / 2
    base = S * motif
    ring(d, cx, cy, base,        S * 0.020, JADE)
    ring(d, cx, cy, base * 0.74, S * 0.013, GOLD)
    ring(d, cx, cy, base * 0.50, S * 0.030, CINNABAR)
    dot(d, cx, cy, base * 0.20, CINNABAR)
    dot(d, cx, cy, base * 0.075, PAPER)  # the acupoint depression
    return img.resize((size, size), Image.LANCZOS)


def save(img, name):
    img.save(name)
    print("wrote", name)


if __name__ == "__main__":
    # "any" icons — a little breathing room around the motif
    save(make(192, motif=0.42), "icon-192.png")
    save(make(512, motif=0.42), "icon-512.png")
    # maskable icons — motif kept inside the 80% safe zone, full-bleed paper
    save(make(192, motif=0.34), "icon-192-maskable.png")
    save(make(512, motif=0.34), "icon-512-maskable.png")
    # iOS home-screen icon (no transparency, OS rounds the corners)
    save(make(180, motif=0.42), "apple-touch-icon.png")
    # favicons
    save(make(32, motif=0.44), "favicon-32.png")
    save(make(16, motif=0.46), "favicon-16.png")
    make(64, motif=0.44).save("favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote favicon.ico")
