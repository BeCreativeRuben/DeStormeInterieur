/**
 * - Writes public/og-image.png from template (social share card).
 * - Resizes public/brand-mark.png → app/icon.png & app/apple-icon.png (same asset as header Logo).
 * Does NOT overwrite brand-mark.png — place your real logo there.
 *
 * Run: node scripts/generate-brand-assets.mjs
 */

import { existsSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

mkdirSync(join(root, "public"), { recursive: true });
mkdirSync(join(root, "app"), { recursive: true });

/** Open Graph / social embed (not the logo file). */
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

async function syncFaviconsFromBrandMark() {
  const bm = join(root, "public", "brand-mark.png");
  if (!existsSync(bm)) {
    console.warn("generate-brand-assets: public/brand-mark.png missing — skip icon resize");
    return;
  }
  await sharp(bm).resize(32, 32, { fit: "cover" }).png().toFile(join(root, "app", "icon.png"));
  await sharp(bm).resize(180, 180, { fit: "cover" }).png().toFile(join(root, "app", "apple-icon.png"));
  console.log("Synced app/icon.png and app/apple-icon.png from public/brand-mark.png");
}

async function main() {
  await sharp(Buffer.from(ogImageSvg.trim())).png().toFile(join(root, "public", "og-image.png"));
  console.log("Wrote public/og-image.png");
  await syncFaviconsFromBrandMark();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
