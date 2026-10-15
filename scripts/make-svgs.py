"""Genera los SVG decorativos propios de Brote en public/assets/img/.

Mismas dimensiones que el diseño original para no mover el layout,
pero con trazos dibujados desde cero.
Uso: python3 scripts/make-svgs.py
"""
import math
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "img")
os.makedirs(OUT, exist_ok=True)

GREEN = "#00c65e"
GREEN_SOFT = "#79d97c"
GREEN_LINE = "#5dc26a"
NAVY = "#003e51"
FOREST = "#309b42"
MIST = "#dbe2e9"


def save(name, w, h, body, extra=""):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"{extra}>{body}</svg>\n'
    with open(os.path.join(OUT, name), "w") as f:
        f.write(svg)


def grad(id_, a, b, vertical=False):
    xy = 'x1="0" y1="0" x2="0" y2="1"' if vertical else 'x1="0" y1="0" x2="1" y2="0"'
    return f'<linearGradient id="{id_}" {xy}><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>'


# ---------- Iconos pequeños ----------
save("close.svg", 13, 13,
     f'<path d="M1 1l11 11M12 1L1 12" stroke="{MIST}" stroke-width="1.3" stroke-linecap="round"/>')
save("chev-down.svg", 12, 8,
     f'<path d="M1 1.2l5 5 5-5" fill="none" stroke="{GREEN_LINE}" stroke-width="2"/>')
save("chev-down-mobile.svg", 12, 8,
     '<path d="M1 1.2l5 5 5-5" fill="none" stroke="#fff" stroke-width="2"/>')
for name, color, size in (("search-green.svg", GREEN_LINE, 19), ("search-large.svg", "#fff", 30)):
    r = size * 0.33
    c = size * 0.42
    save(name, size, size,
         f'<circle cx="{c}" cy="{c}" r="{r}" fill="none" stroke="{color}" stroke-width="2"/>'
         f'<path d="M{c + r * 0.72} {c + r * 0.72}L{size - 1.5} {size - 1.5}" stroke="{color}" stroke-width="2" stroke-linecap="round"/>')
save("upper-title-icon.svg", 13, 43,
     f'<path d="M12 1.5L1.5 41.5" stroke="{GREEN_LINE}" stroke-width="2" stroke-linecap="round"/>')
save("jump-link-divider.svg", 16, 55,
     f'<path d="M15 1.5L1.5 53" stroke="{GREEN_LINE}" stroke-width="2" stroke-linecap="round"/>')

# ---------- Máscaras (solo la silueta importa) ----------
def parallelogram(w, h, skew, r):
    # cuadrilátero inclinado con esquinas suavizadas
    return (f'M{skew + r} 0H{w}L{w - skew} {h}H{0}Z')

save("image-left-mask.svg", 560, 340,
     f'<path d="M78 58Q93 0 156 0H560L483 283Q468 340 405 340H0Z"/>')
save("image-right-mask.svg", 560, 340,
     f'<path d="M0 0H404Q467 0 482 58L560 340H155Q92 340 77 283Z"/>')
save("after-left-image.svg", 400, 243,
     f'<path d="M55 42Q66 0 111 0H400L345 201Q334 243 289 243H0Z" fill="{MIST}"/>')
save("after-right-image.svg", 400, 243,
     f'<path d="M0 0H289Q334 0 345 42L400 243H111Q66 243 55 201Z" fill="{MIST}"/>')

HERO_EDGE = "M0 0H1440V660C1240 760 1020 735 780 700C470 655 180 668 0 676Z"
save("slider-hero-mask.svg", 1440, 740, f'<path d="{HERO_EDGE}"/>')
save("slider-large-mask.svg", 1920, 987,
     '<path d="M0 0H1920V880C1650 1010 1360 980 1040 934C625 875 240 890 0 901Z"/>')
MOBILE_EDGE = "M0 0H375V655C310 640 150 630 0 626Z"
save("mask-hero-slider-mobile.svg", 375, 656, f'<path d="{MOBILE_EDGE}"/>')


# ---------- Olas del hero ----------
def hero_waves(w, h, edge):
    s = w / 1440
    def p(x, y):
        return f"{x * s:.1f},{y * s:.1f}"
    layers = [
        (f"M{p(560, 0)}C{p(400, 230)} {p(420, 420)} {p(560, 500)}C{p(800, 640)} {p(1200, 600)} {p(1440, 360)}V{h}H0V0Z", 'url(#g)', 0.3),
        (f"M{p(300, 0)}C{p(230, 210)} {p(250, 360)} {p(380, 450)}C{p(640, 640)} {p(1150, 720)} {p(1440, 470)}V{h}H0V0Z", GREEN, 0.4),
        (f"M{p(140, 0)}C{p(40, 260)} {p(170, 480)} {p(600, 590)}C{p(980, 690)} {p(1300, 560)} {p(1440, 535)}V{h}H0V0Z", 'url(#g)', 0.4),
        (f"M0 0C{p(-40, 330)} {p(260, 600)} {p(700, 740)}H0Z", 'url(#g)', 0.7),
    ]
    body = f'<defs>{grad("g", GREEN, GREEN_SOFT)}<clipPath id="c"><path d="{edge}"/></clipPath></defs><g clip-path="url(#c)">'
    for d, fill, op in layers:
        body += f'<path d="{d}" fill="{fill}" opacity="{op}"/>'
    return body + "</g>"

save("slider-hero-just-waves.svg", 1440, 740, hero_waves(1440, 740, HERO_EDGE))
save("slider-hero-mask-mobile.svg", 375, 656, hero_waves(375, 656, MOBILE_EDGE))


# ---------- Patrón de puntos punteados sobre el hero ----------
def dotted_curves(w, h, n, edge, color="#fff"):
    body = f'<defs><clipPath id="c"><path d="{edge}"/></clipPath></defs><g clip-path="url(#c)" opacity="0.2" fill="none" stroke="{color}" stroke-linecap="round" stroke-dasharray="0 9">'
    for i in range(n):
        t = i / (n - 1)
        x0 = 120 + t * 420
        y1 = 380 + t * 160
        body += (f'<path d="M{x0:.0f} -10C{x0 - 60:.0f} {y1 - 120:.0f} {x0 + 140:.0f} {y1 + 80:.0f} '
                 f'{620 + t * 160:.0f} {y1 + 120:.0f}S{1250:.0f} {y1 + 60 - t * 120:.0f} {w + 10} {300 + t * 160:.0f}"/>')
    return body + "</g>"

save("slider-hero-dots.svg", 1440, 740, dotted_curves(1440, 740, 14, HERO_EDGE))


# ---------- Malla de puntos del fondo ----------
def dot_grid(w, h, step, r, fade_to_bottom=True):
    body = (f'<defs>{grad("f", "#fff", "#fff", True).replace("stop-color=\"#fff\"/></linearGradient>", "stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient>")}'
            f'<pattern id="p" width="{step}" height="{step}" patternUnits="userSpaceOnUse">'
            f'<circle cx="{step / 2}" cy="{step / 2}" r="{r}" fill="{MIST}"/></pattern>'
            f'<mask id="m"><rect width="{w}" height="{h}" fill="url(#f)"/></mask></defs>'
            f'<rect width="{w}" height="{h}" fill="url(#p)" mask="url(#m)" opacity="0.6"/>')
    return body

save("grid-dots-bg.svg", 1440, 1030, dot_grid(1440, 1030, 35.5, 4.6))


# ---------- Patrón de cruces junto a las imágenes ----------
def crosses(w, h, step, color):
    body = f'<g stroke="{color}" stroke-width="1.4" stroke-linecap="round">'
    cols = int(w // step)
    rows = int(h // step)
    for cx in range(cols):
        for cy in range(rows):
            # deja huecos en diagonal para que no se vea como rejilla rígida
            if (cx * 7 + cy * 3) % 5 == 0:
                continue
            x = cx * step + step / 2
            y = cy * step + step / 2
            body += f'<path d="M{x - 3.2:.1f} {y - 3.2:.1f}l6.4 6.4m-6.4 0l6.4-6.4"/>'
    return body + "</g>"

save("image-module-pattern.svg", 354, 383, crosses(354, 383, 18.8, MIST))
save("image-pattern-mobile.svg", 171, 210, crosses(171, 210, 18.8, MIST))


# ---------- Líneas diagonales detrás de las fotos 50/50 ----------
def slanted_lines(w, h, mirror):
    body = '<g stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity="0.9">'
    for i in range(7):
        x = 20 + i * 24
        y0 = 10 + i * 40
        x1, x2 = (x + 30, x) if not mirror else (w - x - 30, w - x)
        body += f'<path d="M{x1} {y0}L{x2} {y0 + 70}"/>'
    return body + "</g>"

save("50-pattern-left.svg", 183, 340, slanted_lines(183, 340, False))
save("50-pattern-right.svg", 183, 340, slanted_lines(183, 340, True))


# ---------- Olas del footer ----------
def footer_wave(w, h):
    s = w / 1440
    def p(x, y):
        return f"{x * s:.1f},{y:.1f}"
    body = (f'<defs>{grad("a", NAVY, FOREST, True)}{grad("b", GREEN, GREEN_SOFT, True)}{grad("c", FOREST, GREEN, True)}</defs>'
            f'<path d="M0 0H{w}V300C{w * 0.86:.0f} 360 {w * 0.66:.0f} 300 {w * 0.48:.0f} 230C{w * 0.3:.0f} 165 {w * 0.12:.0f} 160 0 215Z" fill="url(#a)"/>'
            f'<path d="M{w * 0.35:.0f} 120C{w * 0.6:.0f} 240 {w * 0.85:.0f} 330 {w} 310V140Z" fill="url(#b)" opacity="0.5"/>'
            f'<path d="M0 60C{w * 0.25:.0f} 110 {w * 0.6:.0f} 130 {w} 70V0H0Z" fill="url(#c)" opacity="0.45"/>'
            f'<g fill="none" stroke="#fff" stroke-width="1" opacity="0.3">')
    for i in range(10):
        y = 90 + i * 16
        body += (f'<path d="M0 {y + 40}C{w * 0.22:.0f} {y - 10 - i * 4} {w * 0.45:.0f} {y + 20} {w * 0.7:.0f} {y + 60 + i * 3}'
                 f'S{w * 0.95:.0f} {y + 50} {w} {y + 10}"/>')
    return body + "</g>"

save("footer-wave-desktop.svg", 1440, 416, footer_wave(1440, 416))
save("footer-wave-mobile.svg", 375, 160, footer_wave(375, 160))

print("SVGs generados en", os.path.abspath(OUT))


# ---------- Piezas usadas por páginas internas ----------
save("member-mask.svg", 460, 430,
     '<path d="M67 0H460V364Q460 430 393 430H0V66Q0 0 67 0Z"/>')
save("after-member.svg", 210, 195, crosses(210, 195, 18.8, MIST))
save("leadership-cta-background.svg", 354, 252, crosses(354, 252, 18.8, "#ffffff"))
save("before-twitter-share.svg", 140, 200, crosses(140, 200, 18.8, MIST))
save("twitter-share-bg.svg", 280, 400,
     f'<path d="M40 0H280V360Q280 400 240 400H0V40Q0 0 40 0Z" fill="{NAVY}"/>')
save("twitter-icon.svg", 25, 20,
     f'<path d="M3 2l7.6 9.6L3 18.5h1.7l6.6-5.9 4.7 5.9H22l-8-10 7-6.5h-1.7l-6.1 5.4L9 2Z" fill="{GREEN}"/>')
save("upload-file.svg", 17, 15,
     f'<path d="M8.5 11V1.5M4.5 5.5l4-4 4 4M1 10v4h15v-4" fill="none" stroke="{GREEN}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>')
save("waved-hero-mask-mobile.svg", 375, 435,
     '<path d="M0 0H375V435C300 415 110 410 0 414Z"/>')
save("mask-waved-hero-desktop.svg", 1921, 764,
     '<path d="M0 0H1921V690C1640 790 1300 760 960 712C560 655 220 676 0 690Z"/>')
save("rounded-mask-hero.svg", 1920, 969,
     '<path d="M0 0H1920V860Q1920 969 1811 969H0Z"/>')
save("progress.svg", 4, 4, f'<rect width="4" height="4" fill="{GREEN}"/>')
print("extras listos")


# ---------- Hero ondulado de páginas internas ----------
WAVED_EDGE = "M0 0H1440V505C1220 590 990 560 760 528C480 488 200 500 0 515Z"
WAVED_MOBILE_EDGE = "M0 0H375V435C300 415 110 410 0 414Z"
save("waves-waved-hero-desktop.svg", 1440, 572, hero_waves(1440, 572, WAVED_EDGE))
save("waves-waved-hero-mobile.svg", 375, 435, hero_waves(375, 435, WAVED_MOBILE_EDGE))
save("waved-dots-hero.svg", 1440, 572, dotted_curves(1440, 572, 12, WAVED_EDGE))


# ---------- Ondas de fondo (equipo, vacantes) ----------
def bg_waves(w, h):
    body = f'<g fill="none" stroke="{MIST}" stroke-width="1" opacity="0.8">'
    for i in range(14):
        y = h * 0.25 + i * (h * 0.035)
        body += (f'<path d="M0 {y:.0f}C{w * 0.2:.0f} {y - h * 0.18 + i * 6:.0f} {w * 0.45:.0f} {y + h * 0.2:.0f} '
                 f'{w * 0.7:.0f} {y + h * 0.05:.0f}S{w * 0.95:.0f} {y - h * 0.15:.0f} {w} {y - h * 0.1 + i * 4:.0f}"/>')
    return body + "</g>"

save("bg-wave-left.svg", 1440, 797, bg_waves(1440, 797))
save("bg-waves-mobile.svg", 375, 350, bg_waves(375, 350))


# ---------- Iconos de las soluciones BrtX™ ----------
os.makedirs(os.path.join(OUT, "icons"), exist_ok=True)
FRAME = f'<rect x="1.5" y="1.5" width="62" height="45" rx="5" fill="none" stroke="{GREEN}" stroke-width="3"/>'
STROKE = f'fill="none" stroke="{GREEN}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
icons = {
    "diseno": f'<g {STROKE}><path d="M18 14l6 6M24 14l-6 6"/><circle cx="21" cy="34" r="3.2"/><path d="M24 34c10 0 10-8 12-14s4-7 6-8"/><path d="M38 11l4.5 1-1 4.5"/></g>',
    "analitica": f'<g {STROKE}><path d="M14 12v24h36"/><path d="M11 15l3-3 3 3M47 33l3 3-3 3"/><circle cx="22" cy="28" r="2.2"/><circle cx="30" cy="23" r="2.2"/><circle cx="38" cy="25" r="2.2"/><path d="M24 27l4-3M32 24l4 1M40 23l8-9M44 13.5l4.3.3-.3 4.2"/></g>',
    "datos": f'<g {STROKE}><ellipse cx="26" cy="13" rx="9" ry="3.2"/><path d="M17 13v18c0 1.8 4 3.2 9 3.2M35 13v8"/><path d="M17 19c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2M17 25c0 1.8 4 3.2 9 3.2"/><circle cx="40" cy="31" r="4"/><path d="M40 23.5v3M40 35.5v3M32.5 31h3M44.5 31h3M34.7 25.7l2.1 2.1M43.2 34.2l2.1 2.1M34.7 36.3l2.1-2.1M43.2 27.8l2.1-2.1"/></g>',
    "omnicanal": f'<g {STROKE}><circle cx="32" cy="24" r="4"/><circle cx="16" cy="14" r="3"/><circle cx="48" cy="14" r="3"/><circle cx="16" cy="35" r="3"/><circle cx="48" cy="35" r="3"/><path d="M18.6 15.6l9.8 6M45.4 15.6l-9.8 6M18.6 33.4l9.8-6M45.4 33.4l-9.8-6"/></g>',
}
for k, g in icons.items():
    save(f"icons/{k}.svg", 65, 48, FRAME + g)
print("iconos listos")


# ---------- Iconos de base digital ----------
icons2 = {
    "marca": f'<g {STROKE}><path d="M32 36c-8-4-11-11-9-19 7 1 12 6 12 13"/><path d="M32 36c6-2 9-7 8-13-5 0-8 4-9 8"/><path d="M32 36v4"/><path d="M20 40h24"/></g>',
    "sitios": f'<g {STROKE}><rect x="13" y="10" width="38" height="26" rx="2.5"/><path d="M13 16h38"/><circle cx="17" cy="13" r=".6"/><circle cx="20.5" cy="13" r=".6"/><path d="M19 22h14M19 27h20M19 31h10"/><rect x="42" y="21" width="9" height="17" rx="2" fill="#fff"/><path d="M45.5 35h2"/></g>',
}
for k, g in icons2.items():
    save(f"icons/{k}.svg", 65, 48, FRAME + g)
print("iconos de base digital listos")
