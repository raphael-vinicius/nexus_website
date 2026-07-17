from pathlib import Path
from PIL import Image

ROOT = Path("public/apple/iphones")


def alpha_bbox(im):
    return im.getchannel("A").getbbox()


def front_left_x(im, bbox):
    x0, y0, x1, y1 = bbox
    width = x1 - x0
    height = y1 - y0
    pixels = im.load()

    best = None
    best_count = 0
    start = x0 + int(width * 0.38)
    end = x1 - int(width * 0.03)
    threshold = max(20, int(height * 0.16))

    for x in range(start, end):
        count = 0
        for y in range(y0, y1):
            r, g, b, a = pixels[x, y]
            if a > 40 and (r + g + b) < 95:
                count += 1
        if count > best_count:
            best = x
            best_count = count
        if count >= threshold:
            return x

    if best is not None and best_count > 10:
        return best
    return x0 + int(width * 0.50)


def isolate(path):
    im = Image.open(path).convert("RGBA")
    bbox = alpha_bbox(im)
    if not bbox:
        return None

    x0, y0, x1, y1 = bbox
    crop_left = max(0, front_left_x(im, bbox) - 12)
    crop = im.crop((crop_left, 0, im.width, im.height))
    cb = alpha_bbox(crop)
    if not cb:
        return None

    # Trim to the isolated front device, then add a small transparent breathing room.
    crop = crop.crop(cb)
    pad_x = max(24, int(crop.width * 0.035))
    pad_y = max(24, int(crop.height * 0.025))
    out = Image.new("RGBA", (crop.width + pad_x * 2, crop.height + pad_y * 2), (0, 0, 0, 0))
    out.alpha_composite(crop, (pad_x, pad_y))
    out.save(path)

    return {
        "path": str(path),
        "source_size": im.size,
        "output_size": out.size,
        "device_bbox": alpha_bbox(out),
    }


def main():
    results = []
    for path in ROOT.glob("iphone-*/*/front.png"):
        result = isolate(path)
        if result:
            results.append(result)
            print(f"{path}: {result['source_size']} -> {result['output_size']}")
        else:
            print(f"MISS {path}")


if __name__ == "__main__":
    main()
