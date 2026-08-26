from PIL import Image
from pathlib import Path

root = Path(r"c:\Users\acer\Desktop\garvAIWebsite")
public = root / "public"
app = root / "src" / "app"
src = root / "garvaiLogo.png"

img = Image.open(src).convert("RGBA")
# Source already has transparent canvas. Do NOT wipe dark pixels —
# they are the "AI LABS" lettering.
bbox = img.getbbox()
cropped = img.crop(bbox)
cw, ch = cropped.size
print("full wordmark", cw, ch, "bbox", bbox)
cropped.save(public / "garvai-logo.png", "PNG", optimize=True)

# Dark-ground variant: turn black lettering into light cream so it reads on footer
dark = cropped.copy()
px = dark.load()
for y in range(ch):
    for x in range(cw):
        r, g, b, a = px[x, y]
        if a > 128 and r < 45 and g < 45 and b < 45:
            # match --dark-text-ish cream
            px[x, y] = (245, 240, 235, a)
dark.save(public / "garvai-logo-dark.png", "PNG", optimize=True)
print("dark variant saved")

# Icon tile for favicon / transition (coral block only, before gap to GARV… wait, before AI)
# Coral ends ~574 in source coords; in cropped, left is bbox[0]
def opaque_coral(x):
    c = 0
    for y in range(ch):
        r, g, b, a = cropped.getpixel((x, y))
        if a > 128 and r > 180 and g < 160 and b < 140:
            c += 1
    return c

icon_end = 0
seen = False
for x in range(cw):
    c = opaque_coral(x)
    # also count solid coral tile area (high fill)
    fill = 0
    for y in range(ch):
        r, g, b, a = cropped.getpixel((x, y))
        if a > 128 and (r + g + b) > 60:
            fill += 1
    # Icon is nearly solid columns; GARV is sparse; AI is dark
    if fill > ch * 0.7 and opaque_coral(x) > 0:
        icon_end = x
        seen = True
    elif seen and fill < ch * 0.05:
        # gap after icon
        break

# Fallback: first gap after left solid block
if icon_end < 50:
    icon_end = 0
    seen = False
    for x in range(cw):
        fill = sum(
            1
            for y in range(ch)
            if (lambda p: p[3] > 128 and p[0] + p[1] + p[2] > 60)(cropped.getpixel((x, y)))
        )
        if fill > ch * 0.5:
            icon_end = x
            seen = True
        elif seen and fill == 0:
            break

icon = cropped.crop((0, 0, icon_end + 1, ch))
ib = icon.getbbox()
icon = icon.crop(ib)
iw, ih = icon.size
side = max(iw, ih)
square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
square.paste(icon, ((side - iw) // 2, (side - ih) // 2), icon)
icon = square
print("icon", icon.size)
icon.save(public / "garvai-mark.png", "PNG", optimize=True)

def save_png(im, path, size):
    im.resize((size, size), Image.Resampling.LANCZOS).save(path, "PNG", optimize=True)

for name in ("icon.png", "apple-icon.png", "favicon.ico"):
    p = app / name
    if p.exists():
        p.unlink()

save_png(icon, app / "icon.png", 192)
save_png(icon, app / "apple-icon.png", 180)
save_png(icon, public / "apple-icon.png", 180)
save_png(icon, public / "favicon-16.png", 16)
save_png(icon, public / "favicon-32.png", 32)
save_png(icon, public / "favicon-48.png", 48)
save_png(icon, public / "icon-192.png", 192)
save_png(icon, public / "icon-512.png", 512)

sizes_ico = [16, 32, 48]
ico_imgs = [icon.resize((s, s), Image.Resampling.LANCZOS) for s in sizes_ico]
for dest in (app / "favicon.ico", public / "favicon.ico"):
    ico_imgs[0].save(
        dest,
        format="ICO",
        sizes=[(s, s) for s in sizes_ico],
        append_images=ico_imgs[1:],
    )

print("done aspect", round(cw / ch, 4))
