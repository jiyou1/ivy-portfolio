// One-off: convert screenshot/mockup PNGs in public/ to WebP q82, resize any
// wider than 2400px, and move the originals to /originals (not served by Vite).
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, renameSync } from "fs";
import { join, dirname, relative, extname, basename } from "path";

const PUBLIC = "public";
const ORIGINALS = "originals";
const MAX_W = 2400;
const QUALITY = 82;

// Favicons/app icons/OG image have fixed refs (index.html, manifest) and
// compatibility needs; floaties are decorative transparent PNGs, not
// screenshots — all keep their PNGs.
const SKIP_FILES = new Set([
  "favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png",
  "android-chrome-192x192.png", "android-chrome-512x512.png", "og-image.png",
]);
const SKIP_DIRS = new Set(["floaties"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out);
    } else if (extname(name).toLowerCase() === ".png" && !SKIP_FILES.has(name)) {
      out.push(p);
    }
  }
  return out;
}

const files = walk(PUBLIC);
for (const src of files) {
  const rel = relative(PUBLIC, src);
  const webp = src.slice(0, -extname(src).length) + ".webp";
  const meta = await sharp(src).metadata();
  let pipe = sharp(src);
  if (meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W });
  await pipe.webp({ quality: QUALITY }).toFile(webp);

  const dest = join(ORIGINALS, rel);
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(src, dest);
  console.log(`${rel} -> ${basename(webp)}${meta.width > MAX_W ? ` (resized ${meta.width}->${MAX_W})` : ""}`);
}
console.log(`\n${files.length} images converted.`);
