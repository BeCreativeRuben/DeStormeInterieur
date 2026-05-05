/**
 * Generates PNG brand assets from inline SVG (no external binaries).
 * Run: node scripts/generate-brand-assets.mjs
 */

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

mkdirSync(join(root, "public"), { recursive: true });
mkdirSync(join(root, "app"), { recursive: true });

const brandMarkSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="c"><circle cx="256" cy="256" r="256"/></clipPath>
  </defs>
  <circle cx="256" cy="256" r="252" fill="#0a0a0a"/>
  <circle cx="256" cy="256" r="228" fill="none" stroke="#e1f033" stroke-width="14"/>
  <text x="256" y="345" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="260" fill="#e1f033">D</text>
</svg>`;

/** Open Graph + social embed */
const ogImageSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect fill="#f7f7f7" width="1200" height="630"/>
  <rect fill="#e1f033" x="0" y="0" width="10" height="630"/>
  <circle cx="200" cy="315" r="118" fill="#0a0a0a"/>
  <circle cx="200" cy="315" r="104" fill="none" stroke="#e1f033" stroke-width="12"/>
  <text x="200" y="355" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="148" fill="#e1f033">D</text>
  <text x="360" y="268" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" letter-spacing="0.28em" fill="#0a0a0a">DESTORME</text>
  <text x="360" y="318" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="300" letter-spacing="0.4em" fill="#5c5c5c">DESIGN</text>
  <text x="360" y="388" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#5c5c5c">Interior design studio · België</text>
</svg>`;

async function writePng(fromSvg, outPath, size) {
  let img = sharp(Buffer.from(fromSvg.trim()));
  if (size) img = img.resize(size, size);
  await img.png().toFile(outPath);
}

async function writeOg(fromSvg, outPath) {
  await sharp(Buffer.from(fromSvg.trim())).png().toFile(outPath);
}

async function main() {
  await writePng(brandMarkSvg, join(root, "public", "brand-mark.png"), 512);
  await writePng(brandMarkSvg, join(root, "app", "icon.png"), 32);
  await writePng(brandMarkSvg, join(root, "app", "apple-icon.png"), 180);
  await writeOg(ogImageSvg, join(root, "public", "og-image.png"));
  console.log("Wrote public/brand-mark.png, public/og-image.png, app/icon.png, app/apple-icon.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
